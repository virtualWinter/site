'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ResetPasswordPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setError(null)

        if (password !== confirmPassword) {
            setError("Passwords don't match")
            setStatus('idle')
            return
        }

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            })

            if (response.ok) {
                setStatus('success')
            } else {
                const data = await response.json()
                setError(data.error || 'An error occurred while resetting your password')
                setStatus('error')
            }
        } catch (error) {
            setError('An error occurred. Please try again later.')
            setStatus('error')
        }
    }

    if (!token) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Invalid Reset Link</CardTitle>
                        <CardDescription>This password reset link is invalid or has expired.</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-center">
                        <Button variant="link" onClick={() => router.push('/forgot-password')}>Request a new reset link</Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
                    <CardDescription>Enter your new password</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">New Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        {error && (
                            <Alert variant="destructive" className="mt-4">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        {status === 'success' && (
                            <Alert className="mt-4">
                                <AlertDescription>Your password has been reset successfully.</AlertDescription>
                            </Alert>
                        )}
                        <Button type="submit" className="w-full mt-4" disabled={status === 'loading'}>
                            {status === 'loading' ? 'Resetting...' : 'Reset Password'}
                        </Button>
                    </form>
                </CardContent>
                {status === 'success' && (
                    <CardFooter className="flex justify-center">
                        <Button variant="link" onClick={() => router.push('/login')}>Back to Login</Button>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}
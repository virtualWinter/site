'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ResendVerificationEmail } from '@/components/email/resend-email-verification-button'

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [showResendVerification, setShowResendVerification] = useState(false)

    const searchParams = useSearchParams()
    const justRegistered = searchParams.get('registered') === 'true'

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setShowResendVerification(false)

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            })

            if (result?.error) {
                setError(result.error)
                if (result.error === "Email not verified. Please check your inbox for the verification link.") {
                    setShowResendVerification(true)
                }
            } else {
                router.push('/dashboard')
            }
        } catch (error) {
            setError('An error occurred. Please try again.')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Login</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                    {justRegistered && (
                        <Alert className="mt-4">
                            <AlertDescription>Registration successful! Please check your email to verify your account before logging in.</AlertDescription>
                        </Alert>
                    )}
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="/forgot-password" className="text-sm text-primary underline hover:text-primary/80">
                                        Forgot password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        {error && (
                            <Alert variant="destructive" className="mt-4">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <Button type="submit" className="w-full mt-4">Login</Button>
                    </form>
                    {showResendVerification && (
                        <div className="mt-4">
                            <ResendVerificationEmail email={email} />
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-muted-foreground">
                        Don't have an account?{' '}
                        <Link href="/register" className="text-primary underline hover:text-primary/80">
                            Register
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
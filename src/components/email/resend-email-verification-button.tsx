'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function ResendVerificationEmail({ email }: { email: string }) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleResend = async () => {
        setStatus('loading')
        try {
            const response = await fetch('/api/auth/resend-verification', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            if (response.ok) {
                setStatus('success')
            } else {
                setStatus('error')
            }
        } catch (error) {
            setStatus('error')
        }
    }

    return (
        <div>
            <Button onClick={handleResend} disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending...' : 'Resend Verification Email'}
            </Button>
            {status === 'success' && (
                <Alert className="mt-4">
                    <AlertDescription>Verification email sent successfully. Please check your inbox.</AlertDescription>
                </Alert>
            )}
            {status === 'error' && (
                <Alert variant="destructive" className="mt-4">
                    <AlertDescription>Failed to send verification email. Please try again later.</AlertDescription>
                </Alert>
            )}
        </div>
    )
}
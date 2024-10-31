import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendPasswordResetEmail } from '@/lib/email'
import crypto from 'crypto'

export async function POST(req: Request) {
    try {
        const { email } = await req.json()

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            // We don't want to reveal whether a user exists or not
            return NextResponse.json({ message: 'If a user with that email exists, we have sent a password reset link.' }, { status: 200 })
        }

        const resetToken = crypto.randomBytes(32).toString('hex')
        const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour from now

        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken,
                resetTokenExpiry,
            },
        })

        await sendPasswordResetEmail(user.email, resetToken)

        return NextResponse.json({ message: 'If a user with that email exists, we have sent a password reset link.' }, { status: 200 })
    } catch (error) {
        console.error('Forgot password error:', error)
        return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 })
    }
}
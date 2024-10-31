import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendVerificationEmail } from '@/lib/email'
import crypto from 'crypto'

export async function POST(req: Request) {
    try {
        const { email } = await req.json()

        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 })
        }

        if (user.emailVerified) {
            return NextResponse.json({ error: 'Email already verified' }, { status: 400 })
        }

        const verificationToken = crypto.randomBytes(32).toString('hex')

        await prisma.user.update({
            where: { id: user.id },
            data: { verificationToken },
        })

        await sendVerificationEmail(user.email, verificationToken)

        return NextResponse.json({ message: 'Verification email sent successfully' }, { status: 200 })
    } catch (error) {
        console.error('Resend verification error:', error)
        return NextResponse.json({ error: 'An error occurred while resending the verification email' }, { status: 500 })
    }
}
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcrypt'

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json()

        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: {
                    gt: new Date(),
                },
            },
        })

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired reset token' }, { status: 400 })
        }

        const hashedPassword = await hash(password, 10)

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        })

        return NextResponse.json({ message: 'Password reset successfully' }, { status: 200 })
    } catch (error) {
        console.error('Reset password error:', error)
        return NextResponse.json({ error: 'An error occurred while resetting your password' }, { status: 500 })
    }
}
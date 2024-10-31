import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')

    if (!token) {
        return NextResponse.json({ error: 'Missing token' }, { status: 400 })
    }

    try {
        const user = await prisma.user.findUnique({
            where: { verificationToken: token },
        })

        if (!user) {
            return NextResponse.json({ error: 'Invalid token' }, { status: 400 })
        }

        await prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: new Date(),
                verificationToken: null,
            },
        })

        return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 })
    } catch (error) {
        console.error('Verification error:', error)
        return NextResponse.json({ error: 'An error occurred during verification' }, { status: 500 })
    }
}
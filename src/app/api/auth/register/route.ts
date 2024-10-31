import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import { prisma } from '@/lib/prisma'
import { sendVerificationEmail } from '@/lib/email'
import crypto from 'crypto'

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json()
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }

        const hashedPassword = await hash(password, 10)
        const verificationToken = crypto.randomBytes(32).toString('hex')

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                verificationToken,
            },
        })

        await sendVerificationEmail(user.email, verificationToken)

        return NextResponse.json({ message: 'User created successfully. Please check your email to verify your account.' }, { status: 201 })
    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json({ error: 'An error occurred during registration' }, { status: 500 })
    }
}
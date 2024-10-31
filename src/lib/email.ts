import nodemailer from 'nodemailer'
import { renderVerificationEmail } from '@/components/email/verification-email'
import { renderPasswordResetEmail } from '@/components/email/password-reset-email'

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
})

export async function sendVerificationEmail(email: string, token: string) {
    const verificationLink = `${process.env.NEXTAUTH_URL}/api/auth/email-verify?token=${token}`
    const htmlContent = renderVerificationEmail(verificationLink)

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Verify your email',
        html: htmlContent,
    })
}

export async function sendPasswordResetEmail(email: string, token: string) {
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`
    const htmlContent = renderPasswordResetEmail(resetLink)

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Reset your password',
        html: htmlContent,
    })
}
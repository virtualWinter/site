import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
})

const createEmailTemplate = (title: string, message: string, buttonText: string, buttonLink: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .container {
      background-color: #f7f7f7;
      border-radius: 5px;
      padding: 20px;
    }
    h1 {
      color: #333;
      text-align: center;
    }
    .button {
      display: inline-block;
      background-color: #007bff;
      color: #ffffff;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      margin-top: 20px;
    }
    .footer {
      margin-top: 20px;
      text-align: center;
      font-size: 0.8em;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>${title}</h1>
    <p>${message}</p>
    <div style="text-align: center;">
      <a href="${buttonLink}" class="button">${buttonText}</a>
    </div>
    <div class="footer">
      <p>If you didn't request this email, you can safely ignore it.</p>
    </div>
  </div>
</body>
</html>
`

export async function sendVerificationEmail(email: string, token: string) {
    const verificationLink = `${process.env.NEXTAUTH_URL}/api/auth/email-verify?token=${token}`
    const htmlContent = createEmailTemplate(
        'Verify Your Email',
        'Thank you for registering. Please click the button below to verify your email address:',
        'Verify Email',
        verificationLink
    )

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Verify your email',
        html: htmlContent,
    })
}

export async function sendPasswordResetEmail(email: string, token: string) {
    const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`
    const htmlContent = createEmailTemplate(
        'Reset Your Password',
        'You have requested to reset your password. Click the button below to set a new password:',
        'Reset Password',
        resetLink
    )

    await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Reset your password',
        html: htmlContent,
    })
}
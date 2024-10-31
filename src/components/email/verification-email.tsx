import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

interface VerificationEmailProps {
    verificationLink: string
}

const VerificationEmail: React.FC<VerificationEmailProps> = ({ verificationLink }) => {
    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#f7f7f7',
            borderRadius: '5px',
        }}>
            <h1 style={{
                color: '#333',
                textAlign: 'center',
                marginBottom: '20px',
            }}>
                Verify Your Email
            </h1>
            <p style={{
                color: '#666',
                fontSize: '16px',
                lineHeight: '1.5',
                marginBottom: '20px',
            }}>
                Thank you for registering! Please click the button below to verify your email address:
            </p>
            <div style={{
                textAlign: 'center',
                marginBottom: '20px',
            }}>
                <a href={verificationLink}
                   style={{
                       backgroundColor: '#007bff',
                       color: '#ffffff',
                       padding: '10px 20px',
                       borderRadius: '5px',
                       textDecoration: 'none',
                       fontWeight: 'bold',
                       display: 'inline-block',
                   }}>
                    Verify Email
                </a>
            </div>
            <p style={{
                color: '#999',
                fontSize: '14px',
                textAlign: 'center',
            }}>
                If you didn't request this email, you can safely ignore it.
            </p>
        </div>
    )
}

export const renderVerificationEmail = (verificationLink: string): string => {
    return renderToStaticMarkup(<VerificationEmail verificationLink={verificationLink} />)
}
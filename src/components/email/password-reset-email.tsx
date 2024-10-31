import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

interface PasswordResetEmailProps {
  resetLink: string
}

const PasswordResetEmail: React.FC<PasswordResetEmailProps> = ({ resetLink }) => {
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
        Reset Your Password
      </h1>
      <p style={{
        color: '#666',
        fontSize: '16px',
        lineHeight: '1.5',
        marginBottom: '20px',
      }}>
        You have requested to reset your password. Click the button below to set a new password:
      </p>
      <div style={{
        textAlign: 'center',
        marginBottom: '20px',
      }}>
        <a href={resetLink}
           style={{
             backgroundColor: '#007bff',
             color: '#ffffff',
             padding: '10px 20px',
             borderRadius: '5px',
             textDecoration: 'none',
             fontWeight: 'bold',
             display: 'inline-block',
           }}>
          Reset Password
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

export const renderPasswordResetEmail = (resetLink: string): string => {
  return renderToStaticMarkup(<PasswordResetEmail resetLink={resetLink} />)
}
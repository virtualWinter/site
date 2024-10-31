import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const publicRoutes = ['/', '/docs', '/login', '/register', '/forgot-password', '/reset-password']

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })

    const isPublicRoute = publicRoutes.some(route => request.nextUrl.pathname.startsWith(route))

    if (!token && !isPublicRoute) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('callbackUrl', request.url)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
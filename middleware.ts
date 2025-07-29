import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Check if the user is accessing the root path
    if (request.nextUrl.pathname === '/') {
        // Redirect to /home
        return NextResponse.redirect(new URL('/home', request.url))
    }
}

export const config = {
    matcher: '/'
}
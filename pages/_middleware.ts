import {getToken} from 'next-auth/jwt'
import { NextResponse } from 'next/server'

// Middleware for nextjs
export async function middleware(req /*, next */) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  // Get the url that is calling the application
  const {pathname} = req.nextUrl

  // if the user has already a token, redirect to the main page
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // Allow the request if:
  // 1 - the user is trying to reach an authentication route
  // 2 - the token exists
  if(pathname.includes('/api/auth') || token){
    // Continue on
    return NextResponse.next() 
  }

  if (!token && pathname !== '/login'){
    return NextResponse.redirect(new URL('/login', req.url))
  }
}
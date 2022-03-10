import {getToken} from 'next-auth/jwt'

// Middleware for nextjs
export async function middleware(req /*, next */) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  // Get the url that is calling the application
  const {pathname} = req.nextUrl

  // Allow the request if:
  // 1 - the user is trying to reach an authentication route
  // 2 - the token exists
  if(pathname.includes('/api/auth') || token){

  }
}
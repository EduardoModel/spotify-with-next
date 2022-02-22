import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import { LOGIN_URL } from '../../../lib/spotify'

async function refreshAccessToken(token) {
  try {
    
  } catch (error) {
    console.error(error)
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      // Will redirect the user to the spotify login area
      authorization: LOGIN_URL
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    // Define the page to do the login
    signIn: '/login'
  },
  callbacks: {
    // Nextauth token rotation
    async jwt({token, account, user}) {
      // Initial sign in
      if(account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : 0, // milisecs
        }
      }
      // If the previous token hasn't expiered yet, return it
      if(Date.now() < token.accessTokenExpires){
        return token
      }

      // If accessToken expiered, use the refreshToken to get a new one
      return await refreshAccessToken(token)
    }
  }
})

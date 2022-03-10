import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify'

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken)
    spotifyApi.setRefreshToken(token.refreshToken)

    const {
      body: refreshedToken
    } = await spotifyApi.refreshAccessToken()

    console.log(refreshedToken)

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000, // it returns 3600 and the * 1000 it's to transform into milisecs
      // If there is a new refresh token, replace it otherwise use the old one
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken
    }

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
    // Define the page responsible for the login
    signIn: '/login'
  },
  callbacks: {
    // Nextauth token rotation (auth itself)
    async jwt({token, account, user}) {
      // Initial sign in (no refresh token available)
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
    },
    // The actual creation of the session for the user
    async session({session, token}) {
      // Session.user is the data available to the user and he can see it
      // The accessToken itself is http secure, i.e. no js code on the frontend can access it
      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.username = token.username

      return session
    }
  }
})

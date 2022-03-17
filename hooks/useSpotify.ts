import { signIn, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'
import spotifyApi from '../lib/spotify'

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET
})

function useSpotify() {
  const {data: session, status} = useSession()

  useEffect(() => {
    if(session) {
      // If the refresh token couldn't be used to get another one
      if(session.error === 'RefreshAccessTokenError'){
        // Send the user to the login area
        signIn()
      }

      spotifyApi.setAccessToken(session.user.accessToken)
    }
  }, [session])
  
  return spotifyApi
}

export default useSpotify
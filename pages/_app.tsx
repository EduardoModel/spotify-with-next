import '../styles/globals.css'
import type { AppProps } from 'next/app'
// Allows to persist the login state
import { SessionProvider  } from 'next-auth/react'

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
  <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
  )
}

export default MyApp

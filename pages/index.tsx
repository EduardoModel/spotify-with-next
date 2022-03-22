import type { NextPage } from 'next'
import Sidebar from '../components/Sidebar'
import Center from '../components/Center'
import { getSession } from 'next-auth/react'

const Home: NextPage = () => {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <main className='flex'>
        <Sidebar />
        <Center />
      </main>
    </div>
  )
}

export default Home

// Fetch the access token already on the server side
export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session
    }
  }
}
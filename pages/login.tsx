import {getProviders, signIn} from 'next-auth/react'

function Login({providers}) {
  // It will use sever side rendering to gather all the providers available for the login
  // That means the page will be rendered at every request
  return (
    <div className="bg-[#000] flex flex-col items-center justify-center min-h-screen w-full">
      <img
        className="mb-5 w-52"
        src="https://links.papareact.com/9xl"
        alt="Spotify logo"
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, {callbackUrl: "/ "})}
          >Login with {provider.name}</button>
        </div>
      ))}
    </div>
  )
}

export default Login

// This function will run every time before the page is delivered to the user
// A better aproach here would be an incremental static regeneration (with getStaticProps) to avoid the server overload
export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    // The props will be available inside the props of the main page component
    props: {
      providers
    }
  }
}
import { ChevronDownIcon } from "@heroicons/react/outline"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from "recoil"
import { playlistIdState, playlistState } from "../atoms/playlistAtom"
import useSpotify from "../hooks/useSpotify"
import Songs from "./Songs"

const colors= [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500'
]

function Center() {
  const { data: session } = useSession()
  const [color, setColor] = useState(null)
  // To avoid undesired changes on this component, it is possible to get only the read-only value of the atom
  const playlistId = useRecoilValue(playlistIdState)
  const spotifyApi = useSpotify()
  const [playlist, setPlaylist] = useRecoilState(playlistState) 

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    const getPlaylist = async () => {
      try {
        const { body: playlist} = await spotifyApi.getPlaylist(playlistId)
        setPlaylist(playlist)
      }
      catch(e) {
        console.log('There was an error during the playlist fetching',)
      }
    }
    getPlaylist()
  }, [spotifyApi, playlistId])

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-black p-1 pr-2 opacity-90 hover:opacity-60">
          <img
            className="h-10 w-10 rounded-full"
            src={session?.user?.image}
            alt="Profile picture"
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} p-8 h-80 text-white`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images?.[0]?.url}
          alt=""
        />
        <div>
          <p>Playlist</p>
          {/* Use of brakepoints with tailwind */}
          <h1 className="text-2xl md:text-3xl ml:text-5xl font-bold">{playlist?.name}</h1>
        </div>
      </section>
      <div className="">
        <Songs />
      </div>
    </div>
  )
}

export default Center
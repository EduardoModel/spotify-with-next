import { ChevronDownIcon } from "@heroicons/react/outline"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import { shuffle } from 'lodash'
import { useRecoilState, useRecoilValue } from "recoil"
import { playlistIdState, playlistState } from "../atoms/playlistAtom"
import spotifyApi from "../lib/spotify"

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

  const [playlist, setPlaylist] = useRecoilState(playlistState) 

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {

  }, [spotifyApi])

  return (
    <div className="flex-grow text-white">
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
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} padding-8 h-80 text-white`}
      >
        {/* <img src="" alt="" /> */}
        <h1>hellou</h1>
      </section>
    </div>
  )
}

export default Center
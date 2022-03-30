import React from "react"
import { useRecoilState } from "recoil"
import useSpotify from "../hooks/useSpotify"
import { millisToMinutesAndSeconds } from "../lib/time"
import {currentTrackIdState, isPlayingState} from "../atoms/songAtom"

function Song({order, track}) {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

  const { track: trackContent } = track

  const playSong = () => {
    setCurrentTrackId(trackContent.id)
    setIsPlaying(true)
    spotifyApi.play({
      // To identify which song need to be played
      // URI stands for uniform resource identifier
      uris: trackContent.uri,
    })
  }

  return (
    <div className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer" onClick={() => playSong()}>
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={trackContent?.album?.images?.[0].url}
          alt=""
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{trackContent.name}</p>
          <p className="w-40">{trackContent.artists[0].name}</p>
        </div>
      </div> 
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{trackContent.album.name}</p>
        <p>{millisToMinutesAndSeconds(trackContent.duration_ms)}</p>
      </div>
    </div>
  )
}

export default Song
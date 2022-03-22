import React from "react"
import useSpotify from "../hooks/useSpotify"

function Song(order, track) {
  const spotifyApi = useSpotify()
  const { track: trackContent } = track
  console.log(trackContent)
  console.log(track)
  return (
    <div>
      <p>{order + 1}</p>
      <img className="h-10 w-10" src={trackContent?.album?.images?.[0].url} alt="" />
    </div>
  )
}

export default Song
import { atom } from "recoil";

// Selected track id that is current playing
export const currentTrackIdState = atom({
  key: 'currentTrackIdState',
  default: null
})

export const isPlayingState = atom({
  key: "isPlayingState",
  default: false
})
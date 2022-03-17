import {atom} from 'recoil'
/*
  The way on recoil works is with atoms.
  They are like a slice from the redux state.
  Instead to have a massive global state, like redux, it is available only sections(atom) of it.
  All these atoms should be contextualized and unique.
*/

export const playlistState = atom({
  key: 'playlistState',
  default: null
})

export const playlistIdState = atom({
  // This id should be unique!
  key: 'playlistIdState',
  default: '55kvLvfzJIyyuOYt2k2AaY',
})
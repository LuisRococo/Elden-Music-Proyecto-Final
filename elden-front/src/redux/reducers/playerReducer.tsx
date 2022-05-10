import { createSlice } from "@reduxjs/toolkit";

const oherInfo = localStorage.getItem("player");
const initialState = oherInfo
  ? {
      song: null,
      other: JSON.parse(oherInfo),
    }
  : {
      song: null,
      other: { expanded: false },
    };

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    player: initialState,
  },
  reducers: {
    expandPlayer: (state) => {
      state.player.other.expanded = true;
      persistOtherInfo(state.player.other);
    },
    reducePlayer: (state) => {
      state.player.other.expanded = false;
      persistOtherInfo(state.player.other);
    },
    setSong: (state, action) => {
      const { song, singer, songName, idSong, idImage } = action.payload;
      state.player.song = {
        file: song,
        singer: singer,
        songName: songName,
        idSong: idSong,
        idImage: idImage,
      };
    },
    removeSong: (state) => {
      state.player.song = null;
    },
  },
});

function persistOtherInfo(info) {
  localStorage.setItem("player", JSON.stringify(info));
}

// Action creators are generated for each case reducer function
export const { expandPlayer, reducePlayer, setSong } = playerSlice.actions;

export default playerSlice.reducer;

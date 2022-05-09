import { createSlice } from "@reduxjs/toolkit";

const oherInfo = localStorage.getItem("otherInfo");
const initialState = oherInfo
  ? { song: null, other: JSON.parse(oherInfo) }
  : { song: null, other: { expanded: false } };

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    shoppingCar: initialState,
  },
  reducers: {
    expandPlayer: (state) => {
      state.shoppingCar.other.expanded = true;
      persistOtherInfo(state.shoppingCar.other);
    },
    reducePlayer: (state) => {
      state.shoppingCar.other.expanded = false;
      persistOtherInfo(state.shoppingCar.other);
    },
    setSong: (state, action) => {
      state.shoppingCar.song = action.payload;
    },
  },
});

function persistOtherInfo(info) {
  localStorage.setItem("player", info);
}

// Action creators are generated for each case reducer function
export const { expandPlayer, reducePlayer, setSong } = playerSlice.actions;

export default playerSlice.reducer;

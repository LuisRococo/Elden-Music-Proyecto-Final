import { createSlice } from "@reduxjs/toolkit";

export const playerSlice = createSlice({
  name: "player",
  initialState: {
    player: null
  },
  reducers: {
    increment: (state, action) => {
      state.player = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { increment } = playerSlice.actions;

export default playerSlice.reducer;

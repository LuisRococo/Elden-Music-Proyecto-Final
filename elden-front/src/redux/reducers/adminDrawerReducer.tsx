import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const drawerSlice = createSlice({
  name: "drawer",
  initialState: {
    open: false,
  },
  reducers: {
    show: (state) => {
      state.open = true;
    },
    hide: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { show, hide } = drawerSlice.actions;

export default drawerSlice.reducer;

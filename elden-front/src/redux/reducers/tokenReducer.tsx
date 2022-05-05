import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: null,
  },
  reducers: {
    addToken: (state, action: PayloadAction<String>) => {
      state.token = action.payload;
    },
    deleteToken: (state) => {
      state.token = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToken, deleteToken } = tokenSlice.actions;

export default tokenSlice.reducer;

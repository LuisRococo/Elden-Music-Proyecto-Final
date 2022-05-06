import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const sessionToken = localStorage.getItem("auth");
const initialState = sessionToken ? JSON.parse(sessionToken) : null;

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: initialState,
  },
  reducers: {
    addToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
      localStorage.setItem("auth", JSON.stringify(action.payload));
    },
    deleteToken: (state) => {
      state.token = null;
      localStorage.removeItem("auth");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToken, deleteToken } = tokenSlice.actions;

export default tokenSlice.reducer;

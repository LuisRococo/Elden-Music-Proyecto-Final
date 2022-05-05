import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const sessionToken = sessionStorage.getItem("auth");
const initialState = sessionToken ? sessionToken : null;

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: initialState,
  },
  reducers: {
    addToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
      sessionStorage.setItem("auth", JSON.stringify(action.payload));
    },
    deleteToken: (state) => {
      state.token = null;
      sessionStorage.removeItem("auth");
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToken, deleteToken } = tokenSlice.actions;

export default tokenSlice.reducer;

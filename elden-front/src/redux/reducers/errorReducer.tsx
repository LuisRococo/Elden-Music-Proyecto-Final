import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
  name: "error",
  initialState: {
    error: null,
  },
  reducers: {
    showError: (state, action: PayloadAction<String>) => {
      const message = action.payload;
      state.error = { severity: "error", message };
    },
    showWarning: (state, action: PayloadAction<String>) => {
      const message = action.payload;
      state.error = { severity: "warning", message };
    },
    showSuccess: (state, action: PayloadAction<String>) => {
      const message = action.payload;
      state.error = { severity: "success", message };
    },
    hideError: (state) => {
      state.error = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showError, showSuccess, showWarning, hideError } =
  errorSlice.actions;

export default errorSlice.reducer;

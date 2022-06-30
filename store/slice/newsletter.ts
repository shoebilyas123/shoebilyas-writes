import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSeen: false,
};

export const newsletterSlice = createSlice({
  name: "newsletter",
  initialState,
  reducers: {
    setSeen: (state) => {
      state.isSeen = true;
    },
  },
});

export const { setSeen } = newsletterSlice.actions;

export default newsletterSlice.reducer;

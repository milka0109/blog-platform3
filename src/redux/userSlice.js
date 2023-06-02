import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { username: null, email: null, image: null, errorMessages: [] },
  reducers: {
    setUserData: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.image = action.payload.image;
    },
    clearUserData: (state) => {
      state.username = null;
      state.email = null;
      state.image = null;
    },
    setErrorMessages: (state, action) => {
      state.errorMessages = action.payload;
    },
    clearErrorMessages: (state) => {
      state.errorMessages = [];
    },
  },
});

export const { setUserData, clearUserData, setErrorMessages, clearErrorMessages } = userSlice.actions;
export const userReducer = userSlice.reducer;

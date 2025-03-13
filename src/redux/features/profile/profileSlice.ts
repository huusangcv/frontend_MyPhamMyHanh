import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  username: "",
  address: "",
  phone: "",
  image: "",
  email: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (_state, action) => action.payload,
  },
});

// Action creators are generated for each case reducer function
export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;

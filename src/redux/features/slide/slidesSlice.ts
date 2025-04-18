import { createSlice } from '@reduxjs/toolkit';
const initialState = [
  {
    _id: '',
    order: 0,
    title: '',
    description: '',
    image: '',
    link: '',
    backGroundLinerGradient: '',
    colorHover: '',
  },
];

export const slideSlice = createSlice({
  name: 'slide',
  initialState,
  reducers: {
    setSlide: (_state, action) => action.payload,
  },
});

// Action creators are generated for each case reducer function
export const { setSlide } = slideSlice.actions;

export default slideSlice.reducer;

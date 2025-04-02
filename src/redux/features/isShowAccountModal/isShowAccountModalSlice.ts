import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

export const isShowAccountModalSlice = createSlice({
  name: 'modalAccount',
  initialState,
  reducers: {
    setShowAccountModal: (_state, action: { payload: boolean }): boolean => action.payload,
  },
});

// Action creators are generated for each case reducer function
export const { setShowAccountModal } = isShowAccountModalSlice.actions;

export default isShowAccountModalSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  phone: '',
  email: '',
  currentAddress: '',
  address: '',
  shipping: 0,
  personGet: '',
  note: '',
  leadtimeOrder: {
    from_estimate_date: '',
    to_estimate_date: '',
  },
};

export const infoShippingSlice = createSlice({
  name: 'infoShipping',
  initialState,
  reducers: {
    setInfoShipping: (_state, action) => action.payload,
  },
});

// Action creators are generated for each case reducer function
export const { setInfoShipping } = infoShippingSlice.actions;

export default infoShippingSlice.reducer;

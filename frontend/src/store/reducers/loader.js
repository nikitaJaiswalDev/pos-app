// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  loader: false
};

// ==============================|| SLICE - MENU ||============================== //

const loader = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    toggleLoader(state, action) {
      state.loader = action.payload.loader;
    },
  }
});

export default loader.reducer;
export const { toggleLoader } = loader.actions;

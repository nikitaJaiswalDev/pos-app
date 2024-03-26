// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  toast_open: false,
  title: ''
};

// ==============================|| SLICE - MENU ||============================== //

const toast = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    openToast(state, action) {
        console.log({ action });
      state.toast_open = action.payload.toast_open;
      state.title = action.payload.title;
    },
  }
});

export default toast.reducer;
export const { openToast } = toast.actions;

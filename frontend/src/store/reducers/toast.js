// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  toast_open: false,
  title: '',
  type: 'success'
};

// ==============================|| SLICE - MENU ||============================== //

const toast = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    openToast(state, action) {
      state.toast_open = action.payload.toast_open;
      state.title = action.payload.title;
      state.type = action.payload.type;
    },
  }
});

export default toast.reducer;
export const { openToast } = toast.actions;

// roleSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllRolesList } from 'api/index';

// Async thunk for fetching all roles list
export const fetchAllRolesList = createAsyncThunk('roles/fetchAllRolesList', async () => {
      const response = await getAllRolesList();
      return response;
});

// Role slice
const roleSlice = createSlice({
  name: 'roles',
  initialState: {
    allRolesList: [],
    isAllRolesPending: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRolesList.pending, (state) => {
        state.isAllRolesPending = true;
      })
      .addCase(fetchAllRolesList.fulfilled, (state, action) => {
          state.allRolesList = action.payload;
          state.isAllRolesPending = false;
      })
      .addCase(fetchAllRolesList.rejected, (state) => {
        state.isAllRolesPending = false;
        // Handle error if needed
      });
  },
});

export const selectAllRolesList = (state) => state;

export default roleSlice.reducer;

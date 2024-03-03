// employeeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllEmployeesList } from 'api/index';

// Async thunk for fetching all roles list
export const fetchAllEmployeesList = createAsyncThunk('roles/fetchAllEmployeesList', async () => {
  const response = await getAllEmployeesList();
  return response;
});

// Role slice
const employeeSlice = createSlice({
  name: 'roles',
  initialState: {
    allEmployeesList: [],
    isAllEmployeePending: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEmployeesList.pending, (state) => {
        state.isAllEmployeePending = true;
      })
      .addCase(fetchAllEmployeesList.fulfilled, (state, action) => {
          state.allEmployeesList = action.payload.data;
          state.isAllEmployeePending = false;
      })
      .addCase(fetchAllEmployeesList.rejected, (state) => {
        state.isAllEmployeePending = false;
        // Handle error if needed
      });
  },
});

export const selectAllEmployeeList = (state) => state;

export default employeeSlice.reducer;

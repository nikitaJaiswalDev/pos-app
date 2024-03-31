// employeeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllBrand, getAllCategories, getAllCustomers, getAllEmployeesList, getAllProducts, getAllRolesList, getAllRolesNames, getAllSuppliers, getAllUnits } from 'api/index';

// Async thunk for fetching all roles list
export const fetchAllEmployeesList = createAsyncThunk('roles/fetchAllEmployeesList', async () => {
  const response = await getAllEmployeesList();
  return response;
});

export const fetchAllUnits = createAsyncThunk('fetchAllUnits', async () => {
  const response = await getAllUnits();
  return response;
});
export const fetchAllBrand = createAsyncThunk('fetchAllBrand', async () => {
  const response = await getAllBrand();
  return response;
});
export const fetchAllCategories = createAsyncThunk('fetchAllCategories', async () => {
  const response = await getAllCategories();
  return response;
});
export const fetchAllSuppliers = createAsyncThunk('fetchAllSuppliers', async () => {
  const response = await getAllSuppliers();
  return response;
});
export const fetchAllRolesList = createAsyncThunk('fetchAllRolesList', async () => {
  const response = await getAllRolesList();
  return response;
});
export const fetchAllProductList = createAsyncThunk('fetchAllProductList', async (filter) => {
  const response = await getAllProducts(filter);
  return response;
});
export const fetchAllCustomer = createAsyncThunk('fetchAllCustomer', async () => {
  const response = await getAllCustomers();
  return response;
});

// Role slice
const employeeSlice = createSlice({
  name: 'roles',
  initialState: {
    allEmployeesList: [],
    isAllEmployeePending: false,
    isUnitPending: false,
    allUnits: [],
    isBrandPending: false,
    allBrands: [],
    isCategoryPending: false,
    allCategories: [],
    isSupplierPending: false,
    allSuppliers: [],
    allRolesList: [],
    isAllRolesPending: false,
    allProductList: [],
    isAllProductPending: false,
    allCustomerList: [],
    isAllCustomerPending: false,
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
      })
      .addCase(fetchAllUnits.pending, (state) => {
        state.isUnitPending = true;
      })
      .addCase(fetchAllUnits.fulfilled, (state, action) => {
          state.allUnits = action.payload.data;
          state.isUnitPending = false;
      })
      .addCase(fetchAllUnits.rejected, (state) => {
        state.isUnitPending = false;
        // Handle error if needed
      })
      .addCase(fetchAllBrand.pending, (state) => {
        state.isBrandPending = true;
      })
      .addCase(fetchAllBrand.fulfilled, (state, action) => {
          state.allBrands = action.payload.data;
          state.isBrandPending = false;
      })
      .addCase(fetchAllBrand.rejected, (state) => {
        state.isBrandPending = false;
        // Handle error if needed
      })
      .addCase(fetchAllCategories.pending, (state) => {
        state.isCategoryPending = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
          state.allCategories = action.payload.data;
          state.isCategoryPending = false;
      })
      .addCase(fetchAllCategories.rejected, (state) => {
        state.isCategoryPending = false;
        // Handle error if needed
      })
      .addCase(fetchAllSuppliers.pending, (state) => {
        state.isSupplierPending = true;
      })
      .addCase(fetchAllSuppliers.fulfilled, (state, action) => {
          state.allSuppliers = action.payload.data;
          state.isSupplierPending = false;
      })
      .addCase(fetchAllSuppliers.rejected, (state) => {
        state.isSupplierPending = false;
        // Handle error if needed
      })
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
      })
      .addCase(fetchAllProductList.pending, (state) => {
        state.isAllProductPending = true;
      })
      .addCase(fetchAllProductList.fulfilled, (state, action) => {
          state.allProductList = action.payload.data;
          state.isAllProductPending = false;
      })
      .addCase(fetchAllProductList.rejected, (state) => {
        state.isAllProductPending = false;
        // Handle error if needed
      })
      .addCase(fetchAllCustomer.pending, (state) => {
        state.isAllCustomerPending = true;
      })
      .addCase(fetchAllCustomer.fulfilled, (state, action) => {
          state.allCustomerList = action.payload.data;
          state.isAllCustomerPending = false;
      })
      .addCase(fetchAllCustomer.rejected, (state) => {
        state.isAllCustomerPending = false;
        // Handle error if needed
      });
  },
});

export const selectAllEmployeeList = (state) => state;

export default employeeSlice.reducer;

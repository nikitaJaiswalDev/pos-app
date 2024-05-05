// employeeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllBrand, getAllCategories, getAllCustomers, getAllEmployeesList, getAllProducts, getAllRolesList, getAllRolesNames, getShop, getAllSuppliers, getAllUnits, getAllOrders, getShopLogo } from 'api/index';

// Async thunk for fetching all roles list
export const fetchAllEmployeesList = createAsyncThunk('roles/fetchAllEmployeesList', async ( _ ) => {
  const response = await getAllEmployeesList({ limit: _.limit, skip: _.skip });
  return response;
});

export const fetchAllUnits = createAsyncThunk('fetchAllUnits', async ( _ ) => {
  const response = await getAllUnits({ limit: _.limit, skip: _.skip });
  return response;
});
export const fetchAllBrand = createAsyncThunk('fetchAllBrand', async ( _ ) => {
  const response = await getAllBrand({ limit: _.limit, skip: _.skip });
  return response;
});
export const fetchAllCategories = createAsyncThunk('fetchAllCategories', async ( _ ) => {
  const response = await getAllCategories({ limit: _.limit, skip: _.skip});
  return response;
});
export const fetchAllSuppliers = createAsyncThunk('fetchAllSuppliers', async ( _ ) => {
  const response = await getAllSuppliers({ limit: _.limit, skip: _.skip});
  return response;
});
export const fetchAllRolesList = createAsyncThunk('fetchAllRolesList', async () => {
  const response = await getAllRolesList();
  return response;
});
export const fetchAllProductList = createAsyncThunk('fetchAllProductList', async ( _ ) => {
  const response = await getAllProducts({ limit: _.limit, skip: _.skip, filter: _.filter});
  return response;
});
export const fetchAllCustomer = createAsyncThunk('fetchAllCustomer', async ( _ ) => {
  const response = await getAllCustomers({ limit: _.limit, skip: _.skip});
  return response;
});
export const fetchShop = createAsyncThunk('fetchShop', async () => {
  const response = await getShop();
  return response;
});
export const fetchShopLogo = createAsyncThunk('fetchShopLogo', async () => {
  const response = await getShopLogo();
  return response;
});
export const fetchAllOrders = createAsyncThunk('fetchAllOrders', async ( _ ) => {
  const response = await getAllOrders({ limit: _.limit, skip: _.skip});
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
    shop: [],
    shopLogo: null,
    isShopPending: false,
    isShopLogoPending: false,
    orders: [],
    isOrderPending: false,
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
      })
      .addCase(fetchShop.pending, (state) => {
        state.isShopPending = true;
      })
      .addCase(fetchShop.fulfilled, (state, action) => {
          state.shop = action.payload.data;
          state.isShopPending = false;
      })
      .addCase(fetchShop.rejected, (state) => {
        state.isShopPending = false;
        // Handle error if needed
      })
      .addCase(fetchShopLogo.pending, (state) => {
        state.isShopLogoPending = true;
      })
      .addCase(fetchShopLogo.fulfilled, (state, action) => {
          state.shopLogo = action.payload.data;
          state.isShopLogoPending = false;
      })
      .addCase(fetchShopLogo.rejected, (state) => {
        state.isShopLogoPending = false;
        // Handle error if needed
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.isOrderPending = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
          state.orders = action.payload.data;
          state.isOrderPending = false;
      })
      .addCase(fetchAllOrders.rejected, (state) => {
        state.isOrderPending = false;
        // Handle error if needed
      });
  },
});

export const selectAllEmployeeList = (state) => state;

export default employeeSlice.reducer;

// types
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteBrand, deleteCategory, deleteCustomert, deleteEmployee, deleteProduct, deleteRole, deleteSupplier, deleteUnit } from 'api/index';
import { openToast } from './toast';
import { fetchAllBrand, fetchAllCategories, fetchAllCustomer, fetchAllEmployeesList, fetchAllProductList, fetchAllRolesList, fetchAllSuppliers, fetchAllUnits } from './employees';
import { toggleLoader } from './loader';
import { addCartItem } from './cartItems';


export const deleteEmployeeData = createAsyncThunk('deleteEmployeeData', async (id, { rejectWithValue }) => {
    try {
      const response = await deleteEmployee(id);
      if (response.status === 200) {
        return {message: response.data, status: true}
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteRoleData = createAsyncThunk('deleteRoleData', async (id, { rejectWithValue }) => {
  try {
    const response = await deleteRole(id);
    if (response.status === 200) {
      return {message: response.data, status: true}
    } else {
      return rejectWithValue(response.data.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
}
);
export const deleteUnitData = createAsyncThunk('deleteUnitData', async (id, { rejectWithValue }) => {
  try {
    const response = await deleteUnit(id);
    if (response.status === 200) {
      return {message: response.data, status: true}
    } else {
      return rejectWithValue(response.data.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
}
);
export const deleteBrandData = createAsyncThunk('deleteBrandData', async (id, { rejectWithValue }) => {
  try {
    const response = await deleteBrand(id);
    if (response.status === 200) {
      return {message: response.data, status: true}
    } else {
      return rejectWithValue(response.data.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
}
);
export const deleteCategoryData = createAsyncThunk('deleteCategoryData', async (id, { rejectWithValue }) => {
  try {
    const response = await deleteCategory(id);
    if (response.status === 200) {
      return {message: response.data, status: true}
    } else {
      return rejectWithValue(response.data.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
}
);
export const deleteSupplierData = createAsyncThunk('deleteSupplierData', async (id, { rejectWithValue }) => {
  try {
    const response = await deleteSupplier(id);
    if (response.status === 200) {
      return {message: response.data, status: true}
    } else {
      return rejectWithValue(response.data.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
}
);
export const deleteProductData = createAsyncThunk('deleteProductData', async (id, { rejectWithValue }) => {
  try {
    const response = await deleteProduct(id);
    if (response.status === 200) {
      return {message: response.data, status: true}
    } else {
      return rejectWithValue(response.data.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
}
);
export const deleteCustomerData = createAsyncThunk('deleteCustomerData', async (id, { rejectWithValue }) => {
  try {
    const response = await deleteCustomert(id);
    if (response.status === 200) {
      return {message: response.data, status: true}
    } else {
      return rejectWithValue(response.data.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
}
);

export const handleDelete = createAsyncThunk('handleDelete', async ({id, delete_type}, { dispatch, rejectWithValue }) => {
  try {
    dispatch(toggleLoader({loader: true}))
    switch(delete_type) {
      case 'employee':
        const emp_res = await  dispatch(deleteEmployeeData(id));
        dispatch(openToast({ toast_open: true, title:  emp_res?.payload?.message?.message, type:"success"}))
        dispatch(fetchAllEmployeesList())
        dispatch(toggleLoader({loader: false}))
        break;
      case 'rolelist':
        const rolelist_res = await  dispatch(deleteRoleData(id));
        dispatch(openToast({ toast_open: true, title:  rolelist_res?.payload?.message?.message, type:"success"}))
        dispatch(fetchAllRolesList())
        dispatch(toggleLoader({loader: false}))
        break;
      case 'unit':
        const unit_res = await  dispatch(deleteUnitData(id));
        dispatch(openToast({ toast_open: true, title:  unit_res?.payload?.message?.message, type:"success"}))
        dispatch(fetchAllUnits())
        dispatch(toggleLoader({loader: false}))
        break;
      case 'brand':
        const brand_res = await  dispatch(deleteBrandData(id));
        dispatch(openToast({ toast_open: true, title:  brand_res?.payload?.message?.message, type:"success"}))
        dispatch(fetchAllBrand())
        dispatch(toggleLoader({loader: false}))
        break;
      case 'category':
        const category_res = await  dispatch(deleteCategoryData(id));
        dispatch(openToast({ toast_open: true, title:  category_res?.payload?.message?.message, type:"success"}))
        dispatch(fetchAllCategories())
        dispatch(toggleLoader({loader: false}))
        break;
      case 'supplier':
          const supplier_res = await  dispatch(deleteSupplierData(id));
          dispatch(openToast({ toast_open: true, title:  supplier_res?.payload?.message?.message, type:"success"}))
          dispatch(fetchAllSuppliers())
          dispatch(toggleLoader({loader: false}))
          break;
      case 'product':
          const product_res = await  dispatch(deleteProductData(id));
          dispatch(openToast({ toast_open: true, title:  product_res?.payload?.message?.message, type:"success"}))
          dispatch(fetchAllProductList())
          dispatch(toggleLoader({loader: false}))
          break;
      case 'customer':
          const customer_res = await  dispatch(deleteCustomerData(id));
          dispatch(openToast({ toast_open: true, title:  customer_res?.payload?.message?.message, type:"success"}))
          dispatch(fetchAllCustomer())
          dispatch(toggleLoader({loader: false}))
          break;
      default:
        throw new Error('Invalid delete type');
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// initial state
const initialState = {
  warning_open: false,
  content: '',
  id: null,
  delete_type: null
};

// ==============================|| SLICE - MENU ||============================== //

const warning = createSlice({
  name: 'warning',
  initialState,
  reducers: {
    openWarning(state, action) {
      state.warning_open = action.payload.warning_open;
      state.content = action.payload.content;
      state.id = action.payload.id;
      state.delete_type = action.payload.delete_type;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(handleDelete.fulfilled, (state, action) => {
      state.warning_open = false;
      state.content = null;
      state.id = null;
      state.delete_type = null;
    })
    .addCase(handleDelete.rejected, (state, action) => {
      // Handle errors
    });
  }
});

export default warning.reducer;
export const { openWarning, handleYes } = warning.actions;

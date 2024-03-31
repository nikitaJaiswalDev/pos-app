import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRolePermissions, verifyUser } from 'api/index';

export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await verifyUser(token);
      if (response.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getMenus = createAsyncThunk('menus/getMenus', 
async (_, { getState, rejectWithValue }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await fetchRolePermissions(token);
    if (response.status === 200) {
      return response;
    } else {
      return rejectWithValue(response.data.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    token: null,
    user: null,
    isLoading: false,
    error: null,
    menus: [],
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLoading = false;
      state.error = null;
      state.menus = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getMenus.fulfilled, (state, action) => {
        state.menus = action.payload.data[0].roles
      })
      .addCase(getMenus.rejected, (state, action) => {
        state.menus = action.payload;
      });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;

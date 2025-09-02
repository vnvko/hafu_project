import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunk để fetch all products
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.getAllProducts(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (categorySlug, { rejectWithValue }) => {
    try {
      const response = await api.getProductsByCategory(categorySlug);
      return { categorySlug, products: response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk để fetch product detail
export const fetchProductDetail = createAsyncThunk(
  'products/fetchProductDetail',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await api.getProductBySlug(slug);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: {
      data: [],
      pagination: null,
      loading: false,
      error: null,
    },
    productsByCategory: {},
    productDetail: {
      data: null,
      loading: false,
      error: null,
    },
  },
  reducers: {
    clearProducts: (state) => {
      state.allProducts = {
        data: [],
        pagination: null,
        loading: false,
        error: null,
      };
    },
    clearProductDetail: (state) => {
      state.productDetail = {
        data: null,
        loading: false,
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.allProducts.loading = true;
        state.allProducts.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.allProducts.loading = false;
        state.allProducts.data = action.payload.data;
        state.allProducts.pagination = action.payload.pagination;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.allProducts.loading = false;
        state.allProducts.error = action.payload;
      })
      
      // Fetch products by category
      .addCase(fetchProductsByCategory.pending, (state, action) => {
        const categorySlug = action.meta.arg;
        if (!state.productsByCategory[categorySlug]) {
          state.productsByCategory[categorySlug] = {
            data: [],
            loading: false,
            error: null,
          };
        }
        state.productsByCategory[categorySlug].loading = true;
        state.productsByCategory[categorySlug].error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        const { categorySlug, products } = action.payload;
        if (!state.productsByCategory[categorySlug]) {
          state.productsByCategory[categorySlug] = {
            data: [],
            loading: false,
            error: null,
          };
        }
        state.productsByCategory[categorySlug].loading = false;
        state.productsByCategory[categorySlug].data = products;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        const categorySlug = action.meta.arg;
        if (!state.productsByCategory[categorySlug]) {
          state.productsByCategory[categorySlug] = {
            data: [],
            loading: false,
            error: null,
          };
        }
        state.productsByCategory[categorySlug].loading = false;
        state.productsByCategory[categorySlug].error = action.payload;
      })
      
      // Fetch product detail
      .addCase(fetchProductDetail.pending, (state) => {
        state.productDetail.loading = true;
        state.productDetail.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.productDetail.loading = false;
        state.productDetail.data = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.productDetail.loading = false;
        state.productDetail.error = action.payload;
      });
  },
});

export const { clearProducts, clearProductDetail } = productSlice.actions;
export default productSlice.reducer;

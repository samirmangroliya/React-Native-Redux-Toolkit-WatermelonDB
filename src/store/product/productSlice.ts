import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
 
import { syncProducts } from '../../database/productSync';
import {
  getProducts,
  mapDatabaseProduct,
} from '../../database/productRepository';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  thumbnail: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  isOffline: boolean;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  isOffline: false,
};

/**
 * Online:
 * API → WatermelonDB → Redux
 *
 * Offline:
 * WatermelonDB → Redux
 */
export const syncAndLoadProducts = createAsyncThunk(
  'products/syncAndLoadProducts',
  async (_, { rejectWithValue }) => {
    let syncError: string | null = null;

    try {
      // 1. Try to get fresh data from API
      await syncProducts();
    } catch (error) {
      syncError =
        error instanceof Error
          ? error.message
          : 'Failed to sync products';
    }

    try {
      // 2. Always load from WatermelonDB
      const products = await getProducts();

      return {
        products: products.map(mapDatabaseProduct),
        syncError,
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : 'Failed to load products from database',
      );
    }
  },
);

const productSlice = createSlice({
  name: 'products',

  initialState,

  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },

    clearProducts: state => {
      state.products = [];
    },
  },

  extraReducers: builder => {
    builder
      .addCase(syncAndLoadProducts.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(syncAndLoadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.isOffline = action.payload.syncError !== null;
        state.error = null;
      })

      .addCase(syncAndLoadProducts.rejected, (state, action) => {
        state.loading = false;
        state.isOffline = false;
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Failed to load products from database';
      })
  },
});

export const {
  setProducts,
  clearProducts,
} = productSlice.actions;

export default productSlice.reducer;
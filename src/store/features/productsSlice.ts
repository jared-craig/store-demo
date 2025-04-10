import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '@/types/product';

interface ProductsState {
  products: Product[];
  product: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  product: null,
  status: 'idle',
  error: null,
};

export const fetchAllProducts = createAsyncThunk('products/fetchAll', async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  return response.json();
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id: number) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  return response.json();
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch product';
      });
  },
});

export default productsSlice.reducer;

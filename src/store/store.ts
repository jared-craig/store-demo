import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './features/productsSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import cartReducer from './features/cartSlice';
export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

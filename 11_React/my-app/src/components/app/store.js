import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';

export const reduxStore = configureStore({
  reducer: {
    user: userReducer
  },
});
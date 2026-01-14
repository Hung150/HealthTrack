import { configureStore } from '@reduxjs/toolkit';
import healthReducer from './healthSlice';

export const store = configureStore({
  reducer: {
    health: healthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Re-export everything from healthSlice
export { default as healthSlice } from './healthSlice';
export * from './healthSlice';

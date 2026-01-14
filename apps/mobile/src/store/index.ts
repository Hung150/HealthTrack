import { configureStore } from '@reduxjs/toolkit';
import { healthSlice } from '@healthtrack/shared';

export const store = configureStore({
  reducer: {
    health: healthSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

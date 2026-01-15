import { configureStore } from '@reduxjs/toolkit';
import healthReducer, { HealthState } from './healthSlice';
import { loadHealthState, saveHealthState } from './persist';

// Load persisted state
const persistedState = await loadHealthState();

export const store = configureStore({
  reducer: {
    health: healthReducer,
  },
  preloadedState: persistedState ? { health: persistedState } : undefined,
});

// Subscribe to store changes
store.subscribe(() => {
  const state = store.getState();
  saveHealthState(state.health);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

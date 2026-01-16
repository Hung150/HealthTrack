import { configureStore } from '@reduxjs/toolkit';
import healthReducer from './healthSlice';
import { saveHealthState, loadHealthState } from './persist';

// Tạo store với async initialization
const initializeStore = async () => {
  // Load saved state từ AsyncStorage
  const savedState = await loadHealthState();
  
  // Tạo store với preloadedState nếu có
  const store = configureStore({
    reducer: {
      health: healthReducer,
    },
    preloadedState: savedState ? { health: savedState } : undefined,
  });

  // Subscribe to store changes - lưu mỗi khi state thay đổi
  store.subscribe(() => {
    const state = store.getState();
    saveHealthState(state.health);
  });

  return store;
};

// Tạo store promise
export const storePromise = initializeStore();

// Export store để components có thể import
// Components sẽ dùng: (await storePromise).getState()

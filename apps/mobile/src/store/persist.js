import AsyncStorage from '@react-native-async-storage/async-storage';

// Lưu state
export const saveHealthState = async (state) => {
  try {
    const jsonValue = JSON.stringify({
      ...state,
      // Đảm bảo history luôn là array
      history: state.history || [],
    });
    await AsyncStorage.setItem('@health_state', jsonValue);
  } catch (e) {
    console.error('Failed to save state:', e);
  }
};

// Load state
export const loadHealthState = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@health_state');
    if (jsonValue != null) {
      const parsed = JSON.parse(jsonValue);
      // Đảm bảo history tồn tại
      return {
        ...parsed,
        history: parsed.history || [],
      };
    }
  } catch (e) {
    console.error('Failed to load state:', e);
  }
  return null;
};

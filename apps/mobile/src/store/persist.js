import AsyncStorage from '@react-native-async-storage/async-storage';

const HEALTH_STORAGE_KEY = '@HealthTrack:healthState';

// Save state to AsyncStorage
export const saveHealthState = async (state) => {
  try {
    const jsonValue = JSON.stringify(state);
    await AsyncStorage.setItem(HEALTH_STORAGE_KEY, jsonValue);
    console.log('✅ Health state saved to AsyncStorage');
  } catch (error) {
    console.error('❌ Failed to save health state:', error);
  }
};

// Load state from AsyncStorage
export const loadHealthState = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(HEALTH_STORAGE_KEY);
    if (jsonValue !== null) {
      console.log('✅ Health state loaded from AsyncStorage');
      return JSON.parse(jsonValue);
    }
    console.log('ℹ️ No saved health state found');
    return null;
  } catch (error) {
    console.error('❌ Failed to load health state:', error);
    return null;
  }
};

// Clear saved state (for testing)
export const clearHealthState = async () => {
  try {
    await AsyncStorage.removeItem(HEALTH_STORAGE_KEY);
    console.log('🗑️ Health state cleared from AsyncStorage');
  } catch (error) {
    console.error('❌ Failed to clear health state:', error);
  }
};

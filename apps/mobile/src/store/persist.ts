import AsyncStorage from '@react-native-async-storage/async-storage';

const HEALTH_STORAGE_KEY = '@HealthTrack:healthState';

// Load state từ AsyncStorage
export const loadHealthState = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(HEALTH_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Failed to load state', e);
    return null;
  }
};

// Save state to AsyncStorage
export const saveHealthState = async (state: any) => {
  try {
    const jsonValue = JSON.stringify(state);
    await AsyncStorage.setItem(HEALTH_STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Failed to save state', e);
  }
};

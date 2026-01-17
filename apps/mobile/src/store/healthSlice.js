import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';

const initialState = {
  waterIntake: 0,
  caloriesBurned: 0,
  exerciseMinutes: 0,
  sleepHours: 0,
  dailyGoals: {
    water: 2000,
    calories: 2000,
    exercise: 30,
    sleep: 8,
  },
  history: [], // ← THÊM HISTORY ARRAY
};

const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {
    updateWaterIntake: (state, action) => {
      state.waterIntake = action.payload;
      addDailyRecord(state); // ← Lưu vào history
    },
    updateCaloriesBurned: (state, action) => {
      state.caloriesBurned = action.payload;
      addDailyRecord(state);
    },
    updateExerciseMinutes: (state, action) => {
      state.exerciseMinutes = action.payload;
      addDailyRecord(state);
    },
    updateSleepHours: (state, action) => {
      state.sleepHours = action.payload;
      addDailyRecord(state);
    },
    updateDailyGoals: (state, action) => {
      state.dailyGoals = {
        ...state.dailyGoals,
        ...action.payload,
      };
    },
    resetDailyGoals: (state) => {
      state.dailyGoals = initialState.dailyGoals;
    },
    // THÊM ACTION MỚI: Reset daily metrics và lưu vào history
    resetDailyMetrics: (state) => {
      // Lưu ngày hôm nay vào history trước khi reset
      addDailyRecord(state);
      
      // Reset metrics về 0
      state.waterIntake = 0;
      state.caloriesBurned = 0;
      state.exerciseMinutes = 0;
      state.sleepHours = 0;
    },
    // THÊM: Manual add history record
    addHistoryRecord: (state, action) => {
      state.history.unshift(action.payload);
      // Giữ tối đa 365 ngày
      if (state.history.length > 365) {
        state.history.pop();
      }
    },
  },
});

// Helper function để thêm daily record
const addDailyRecord = (state) => {
  const today = dayjs().format('YYYY-MM-DD');
  const existingIndex = state.history.findIndex(record => record.date === today);
  
  if (existingIndex >= 0) {
    // Update existing record
    state.history[existingIndex] = {
      date: today,
      water: state.waterIntake,
      exercise: state.exerciseMinutes,
      calories: state.caloriesBurned,
      sleep: state.sleepHours,
      goals: { ...state.dailyGoals },
      timestamp: Date.now(),
    };
  } else {
    // Add new record
    state.history.unshift({
      date: today,
      water: state.waterIntake,
      exercise: state.exerciseMinutes,
      calories: state.caloriesBurned,
      sleep: state.sleepHours,
      goals: { ...state.dailyGoals },
      timestamp: Date.now(),
    });
  }
  
  // Giữ tối đa 365 ngày
  if (state.history.length > 365) {
    state.history.pop();
  }
};

export const {
  updateWaterIntake,
  updateCaloriesBurned,
  updateExerciseMinutes,
  updateSleepHours,
  updateDailyGoals,
  resetDailyGoals,
  resetDailyMetrics, // ← THÊM VÀO EXPORT
  addHistoryRecord,
} = healthSlice.actions;

export default healthSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

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
};

const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {
    updateWaterIntake: (state, action) => {
      state.waterIntake = action.payload;
    },
    updateCaloriesBurned: (state, action) => {
      state.caloriesBurned = action.payload;
    },
    updateExerciseMinutes: (state, action) => {
      state.exerciseMinutes = action.payload;
    },
    updateSleepHours: (state, action) => {
      state.sleepHours = action.payload;
    },
    // THÊM ACTION MỚI
    updateDailyGoals: (state, action) => {
      state.dailyGoals = {
        ...state.dailyGoals,
        ...action.payload,
      };
    },
    // Thêm action reset daily goals
    resetDailyGoals: (state) => {
      state.dailyGoals = initialState.dailyGoals;
    },
  },
});

export const {
  updateWaterIntake,
  updateCaloriesBurned,
  updateExerciseMinutes,
  updateSleepHours,
  updateDailyGoals,    
  resetDailyGoals,
} = healthSlice.actions;

export default healthSlice.reducer;

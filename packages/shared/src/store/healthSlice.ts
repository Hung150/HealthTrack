import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HealthState, DailyGoal, UserProfile } from '../types';

const initialState: HealthState = {
  metrics: [],
  dailyGoals: {
    water: 2000,
    calories: 2000,
    exercise: 30,
    sleep: 8,
  },
  userProfile: null,
  isLoading: false,
  selectedDate: new Date().toISOString().split('T')[0],
  waterIntake: 0,
  caloriesBurned: 0,
  exerciseMinutes: 0,
  sleepHours: 0,
};

export const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {
    updateWaterIntake: (state, action: PayloadAction<number>) => {
      state.waterIntake = action.payload;
    },
    updateCaloriesBurned: (state, action: PayloadAction<number>) => {
      state.caloriesBurned = action.payload;
    },
    updateExerciseMinutes: (state, action: PayloadAction<number>) => {
      state.exerciseMinutes = action.payload;
    },
    updateSleepHours: (state, action: PayloadAction<number>) => {
      state.sleepHours = action.payload;
    },
    updateDailyGoals: (state, action: PayloadAction<Partial<DailyGoal>>) => {
      state.dailyGoals = { ...state.dailyGoals, ...action.payload };
    },
    resetDailyMetrics: (state) => {
      state.waterIntake = 0;
      state.caloriesBurned = 0;
      state.exerciseMinutes = 0;
      state.sleepHours = 0;
    },
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
    },
  },
});

export const {
  updateWaterIntake,
  updateCaloriesBurned,
  updateExerciseMinutes,
  updateSleepHours,
  updateDailyGoals,
  resetDailyMetrics,
  setUserProfile,
} = healthSlice.actions;

export default healthSlice.reducer;

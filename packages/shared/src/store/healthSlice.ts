import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HealthState, HealthMetric, DailyGoal, UserProfile } from '../types';

const initialState: HealthState = {
  metrics: [],
  dailyGoals: {
    water: 2000,    // 2L water
    calories: 2000, // 2000 kcal
    exercise: 30,   // 30 minutes
    sleep: 8,       // 8 hours
  },
  userProfile: null,
  isLoading: false,
  selectedDate: new Date().toISOString().split('T')[0],
  waterIntake: 0,
  caloriesBurned: 0,
  exerciseMinutes: 0,
  sleepHours: 0,
};

const healthSlice = createSlice({
  name: 'health',
  initialState,
  reducers: {
    addMetric: (state, action: PayloadAction<Omit<HealthMetric, 'id' | 'createdAt'>>) => {
      const newMetric: HealthMetric = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date(),
      };
      state.metrics.push(newMetric);
    },
    
    updateDailyGoals: (state, action: PayloadAction<Partial<DailyGoal>>) => {
      state.dailyGoals = { ...state.dailyGoals, ...action.payload };
    },
    
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    
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
    
    resetDailyMetrics: (state) => {
      state.waterIntake = 0;
      state.caloriesBurned = 0;
      state.exerciseMinutes = 0;
      state.sleepHours = 0;
    },
  },
});

export const {
  addMetric,
  updateDailyGoals,
  setUserProfile,
  setLoading,
  updateWaterIntake,
  updateCaloriesBurned,
  updateExerciseMinutes,
  updateSleepHours,
  resetDailyMetrics,
} = healthSlice.actions;

export default healthSlice.reducer;

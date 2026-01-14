import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define state interface
export interface HealthState {
  waterIntake: number;
  caloriesBurned: number;
  exerciseMinutes: number;
  sleepHours: number;
  dailyGoals: {
    water: number;
    calories: number;
    exercise: number;
    sleep: number;
  };
}

const initialState: HealthState = {
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
    updateDailyGoals: (state, action: PayloadAction<Partial<HealthState['dailyGoals']>>) => {
      state.dailyGoals = { ...state.dailyGoals, ...action.payload };
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
  updateWaterIntake,
  updateCaloriesBurned,
  updateExerciseMinutes,
  updateSleepHours,
  updateDailyGoals,
  resetDailyMetrics,
} = healthSlice.actions;

export default healthSlice.reducer;

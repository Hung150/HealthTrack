import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { 
  updateWaterIntake, 
  updateCaloriesBurned, 
  updateExerciseMinutes, 
  updateSleepHours 
} from '../store/healthSlice';

export const useHealth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const healthState = useSelector((state: RootState) => state.health);

  return {
    // State
    waterIntake: healthState.waterIntake,
    caloriesBurned: healthState.caloriesBurned,
    exerciseMinutes: healthState.exerciseMinutes,
    sleepHours: healthState.sleepHours,
    dailyGoals: healthState.dailyGoals,
    
    // Actions
    updateWaterIntake: (amount: number) => 
      dispatch(updateWaterIntake(amount)),
    
    updateCaloriesBurned: (calories: number) => 
      dispatch(updateCaloriesBurned(calories)),
    
    updateExerciseMinutes: (minutes: number) => 
      dispatch(updateExerciseMinutes(minutes)),
    
    updateSleepHours: (hours: number) => 
      dispatch(updateSleepHours(hours)),
  };
};

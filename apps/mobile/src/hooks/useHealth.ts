import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { 
  updateWaterIntake, 
  updateCaloriesBurned, 
  updateExerciseMinutes, 
  updateSleepHours,
  updateDailyGoals,
  resetDailyMetrics
} from '../store/healthSlice';

export const useHealth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const healthState = useSelector((state: RootState) => state.health);

  return {
    // State
    ...healthState,
    
    // Actions
    updateWaterIntake: (amount: number) => 
      dispatch(updateWaterIntake(amount)),
    
    updateCaloriesBurned: (calories: number) => 
      dispatch(updateCaloriesBurned(calories)),
    
    updateExerciseMinutes: (minutes: number) => 
      dispatch(updateExerciseMinutes(minutes)),
    
    updateSleepHours: (hours: number) => 
      dispatch(updateSleepHours(hours)),
    
    updateDailyGoals: (goals: any) => 
      dispatch(updateDailyGoals(goals)),
    
    resetDailyMetrics: () => 
      dispatch(resetDailyMetrics()),
  };
};

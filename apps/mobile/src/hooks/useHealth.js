import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { 
  updateWaterIntake, 
  updateCaloriesBurned, 
  updateExerciseMinutes, 
  updateSleepHours
} from '../store/healthSlice';

export const useHealth = () => {
  const dispatch = useDispatch();
  const healthState = useSelector((state) => state.health);

  return {
    // State
    waterIntake: healthState.waterIntake,
    caloriesBurned: healthState.caloriesBurned,
    exerciseMinutes: healthState.exerciseMinutes,
    sleepHours: healthState.sleepHours,
    dailyGoals: healthState.dailyGoals,
    
    // Actions
    updateWaterIntake: (amount) => 
      dispatch(updateWaterIntake(amount)),
    
    updateCaloriesBurned: (calories) => 
      dispatch(updateCaloriesBurned(calories)),
    
    updateExerciseMinutes: (minutes) => 
      dispatch(updateExerciseMinutes(minutes)),
    
    updateSleepHours: (hours) => 
      dispatch(updateSleepHours(hours)),
  };
};

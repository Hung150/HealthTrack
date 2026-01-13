// Simple hooks without react-redux for now
export const useAppDispatch = () => (action: any) => {
  console.log('Dispatching:', action);
  return action;
};

export const useAppSelector = (selector: (state: any) => any) => {
  // Mock selector for now
  return selector({
    health: {
      metrics: [],
      dailyGoals: { water: 2000, calories: 2000, exercise: 30, sleep: 8 },
      userProfile: null,
      isLoading: false,
      selectedDate: new Date().toISOString().split('T')[0],
      waterIntake: 0,
      caloriesBurned: 0,
      exerciseMinutes: 0,
      sleepHours: 0,
    },
  });
};

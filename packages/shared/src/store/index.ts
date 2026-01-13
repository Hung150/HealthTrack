import { HealthState } from '../types';

// Simple store configuration
export const store = {
  getState: () => ({
    health: {
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
    } as HealthState,
  }),
  dispatch: (action: any) => {
    console.log('Dispatching:', action);
    return action;
  },
  subscribe: (listener: () => void) => {
    console.log('Listener subscribed');
    return () => console.log('Listener unsubscribed');
  },
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

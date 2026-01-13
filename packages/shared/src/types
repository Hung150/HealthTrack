// Health tracking types
export interface HealthMetric {
  id: string;
  userId: string;
  type: 'water' | 'calories' | 'exercise' | 'sleep' | 'weight';
  value: number;
  unit: string;
  date: string; // ISO string
  notes?: string;
  createdAt: Date;
}

export interface DailyGoal {
  water: number;        // ml
  calories: number;     // kcal
  exercise: number;     // minutes
  sleep: number;        // hours
  weight?: number;      // kg
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  weight: number;       // kg
  height: number;       // cm
  dailyGoals: DailyGoal;
}

export interface HealthState {
  metrics: HealthMetric[];
  dailyGoals: DailyGoal;
  userProfile: UserProfile | null;
  isLoading: boolean;
  selectedDate: string;
  waterIntake: number;
  caloriesBurned: number;
  exerciseMinutes: number;
  sleepHours: number;
}

// App state types
export interface AppState {
  health: HealthState;
}

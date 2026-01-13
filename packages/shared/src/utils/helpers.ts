export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const calculateProgress = (current: number, goal: number): number => {
  if (goal === 0) return 0;
  return Math.min(Math.round((current / goal) * 100), 100);
};

export const getTodayMetrics = (metrics: any[], date: string) => {
  return metrics.filter(metric => metric.date === date);
};

export const generateHealthTips = (metrics: any): string[] => {
  const tips: string[] = [];
  
  if (metrics.waterIntake < 1500) {
    tips.push('💧 Try to drink more water today! Aim for at least 1.5L.');
  }
  
  if (metrics.exerciseMinutes < 20) {
    tips.push('🏃‍♂️ A short walk can boost your energy and mood!');
  }
  
  if (metrics.sleepHours < 7) {
    tips.push('😴 Getting enough sleep is crucial for health. Try for 7-8 hours.');
  }
  
  return tips;
};

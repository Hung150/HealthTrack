import React from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Text, 
  TouchableOpacity 
} from 'react-native';
import { useHealth } from '../hooks/useHealth';
import { resetDailyMetrics } from '../store/healthSlice';

const calculateProgress = (current, goal) => {
  if (goal === 0) return 0;
  return Math.min(Math.round((current / goal) * 100), 100);
};

const DashboardScreen = () => {
  const {
    waterIntake,
    caloriesBurned,
    exerciseMinutes,
    sleepHours,
    dailyGoals,
    updateWaterIntake,
    updateCaloriesBurned,
    updateExerciseMinutes,
    updateSleepHours,
  } = useHealth();

  const waterProgress = calculateProgress(waterIntake, dailyGoals.water);
  const caloriesProgress = calculateProgress(caloriesBurned, dailyGoals.calories);
  const exerciseProgress = calculateProgress(exerciseMinutes, dailyGoals.exercise);
  const sleepProgress = calculateProgress(sleepHours, dailyGoals.sleep);

  const handleResetAll = () => {
    dispatch(resetDailyMetrics());
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return '#4CAF50'; // Green
    if (progress >= 75) return '#FF9800';  // Orange
    return '#1e90ff'; // Blue
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>HealthTrack Dashboard</Text>
      
      {/* Water Card */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>💧</Text>
            <Text style={styles.cardTitle}>Water Intake</Text>
          </View>
          <Text style={styles.cardSubtitle}>{waterIntake}ml / {dailyGoals.water}ml</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: `${waterProgress}%`,
                    backgroundColor: getProgressColor(waterProgress)
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{waterProgress}%</Text>
          </View>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.waterButton]} 
              onPress={() => updateWaterIntake(waterIntake + 250)}
            >
              <Text style={styles.buttonText}>+250ml</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.waterButton]} 
              onPress={() => updateWaterIntake(waterIntake + 500)}
            >
              <Text style={styles.buttonText}>+500ml</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Exercise Card */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🏃</Text>
            <Text style={styles.cardTitle}>Exercise</Text>
          </View>
          <Text style={styles.cardSubtitle}>{exerciseMinutes}min / {dailyGoals.exercise}min</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: `${exerciseProgress}%`,
                    backgroundColor: getProgressColor(exerciseProgress)
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{exerciseProgress}%</Text>
          </View>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.exerciseButton]} 
              onPress={() => updateExerciseMinutes(exerciseMinutes + 10)}
            >
              <Text style={styles.buttonText}>+10min</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.exerciseButton]} 
              onPress={() => updateExerciseMinutes(exerciseMinutes + 30)}
            >
              <Text style={styles.buttonText}>+30min</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Calories Card */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🔥</Text>
            <Text style={styles.cardTitle}>Calories Burned</Text>
          </View>
          <Text style={styles.cardSubtitle}>{caloriesBurned}kcal / {dailyGoals.calories}kcal</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: `${caloriesProgress}%`,
                    backgroundColor: getProgressColor(caloriesProgress)
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{caloriesProgress}%</Text>
          </View>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.caloriesButton]} 
              onPress={() => updateCaloriesBurned(caloriesBurned + 100)}
            >
              <Text style={styles.buttonText}>+100kcal</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.caloriesButton]} 
              onPress={() => updateCaloriesBurned(caloriesBurned + 300)}
            >
              <Text style={styles.buttonText}>+300kcal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Sleep Card */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>😴</Text>
            <Text style={styles.cardTitle}>Sleep</Text>
          </View>
          <Text style={styles.cardSubtitle}>{sleepHours}h / {dailyGoals.sleep}h</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: `${sleepProgress}%`,
                    backgroundColor: getProgressColor(sleepProgress)
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{sleepProgress}%</Text>
          </View>
          
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.sleepButton]} 
              onPress={() => updateSleepHours(sleepHours + 1)}
            >
              <Text style={styles.buttonText}>+1h</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.sleepButton]} 
              onPress={() => updateSleepHours(sleepHours + 2)}
            >
              <Text style={styles.buttonText}>+2h</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <View style={styles.cardContent}>
          <Text style={styles.summaryTitle}>Today's Summary</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{waterIntake}ml</Text>
              <Text style={styles.summaryLabel}>Water</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{exerciseMinutes}min</Text>
              <Text style={styles.summaryLabel}>Exercise</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{caloriesBurned}kcal</Text>
              <Text style={styles.summaryLabel}>Calories</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{sleepHours}h</Text>
              <Text style={styles.summaryLabel}>Sleep</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Reset Button Card */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, { textAlign: 'center', color: '#ff6b6b' }]}>
            🔄 Reset Daily Metrics
          </Text>
          <Text style={{ textAlign: 'center', marginBottom: 15, color: '#666' }}>
            Reset all metrics to zero
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.resetButton, { backgroundColor: '#ff6b6b' }]}
              onPress={handleResetAll}
            >
              <Text style={styles.resetButtonText}>Reset All to Zero</Text>
            </TouchableOpacity>
          </View>
          <Text style={{ textAlign: 'center', marginTop: 10, fontSize: 12, color: '#888' }}>
            Data is automatically saved
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#1e90ff',
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  summaryCard: {
    marginBottom: 16,
    backgroundColor: '#1e90ff',
    borderRadius: 12,
    elevation: 4,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBarBackground: {
    flex: 1,
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 12,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 40,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  waterButton: {
    backgroundColor: '#1e90ff',
  },
  exerciseButton: {
    backgroundColor: '#4CAF50',
  },
  caloriesButton: {
    backgroundColor: '#FF6B6B',
  },
  sleepButton: {
    backgroundColor: '#9C27B0',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  resetButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

export default DashboardScreen;

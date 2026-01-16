import React from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  Text, 
  TouchableOpacity 
} from 'react-native';
// XÓA: import { Card, Title, ProgressBar } from 'react-native-paper';
import { useHealth } from '../hooks/useHealth';

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
    updateWaterIntake(0);
    updateCaloriesBurned(0);
    updateExerciseMinutes(0);
    updateSleepHours(0);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>HealthTrack Dashboard</Text>
      
      {/* Water Card - Dùng View thay Card */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>💧 Water Intake</Text>
          <Text>{waterIntake}ml / {dailyGoals.water}ml</Text>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${waterProgress}%`, backgroundColor: '#1e90ff' }
              ]} 
            />
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => updateWaterIntake(waterIntake + 250)}
            >
              <Text style={styles.buttonText}>+250ml</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button} 
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
          <Text style={styles.cardTitle}>🏃 Exercise</Text>
          <Text>{exerciseMinutes}min / {dailyGoals.exercise}min</Text>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${exerciseProgress}%`, backgroundColor: '#4CAF50' }
              ]} 
            />
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => updateExerciseMinutes(exerciseMinutes + 10)}
            >
              <Text style={styles.buttonText}>+10min</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button} 
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
          <Text style={styles.cardTitle}>🔥 Calories Burned</Text>
          <Text>{caloriesBurned}kcal / {dailyGoals.calories}kcal</Text>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${caloriesProgress}%`, backgroundColor: '#FF6B6B' }
              ]} 
            />
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => updateCaloriesBurned(caloriesBurned + 100)}
            >
              <Text style={styles.buttonText}>+100kcal</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button} 
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
          <Text style={styles.cardTitle}>😴 Sleep</Text>
          <Text>{sleepHours}h / {dailyGoals.sleep}h</Text>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill, 
                { width: `${sleepProgress}%`, backgroundColor: '#9C27B0' }
              ]} 
            />
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => updateSleepHours(sleepHours + 1)}
            >
              <Text style={styles.buttonText}>+1h</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => updateSleepHours(sleepHours + 2)}
            >
              <Text style={styles.buttonText}>+2h</Text>
            </TouchableOpacity>
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
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginVertical: 8,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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
});

export default DashboardScreen;

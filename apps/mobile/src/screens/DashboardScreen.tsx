import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Card, Title, ProgressBar, Button } from 'react-native-paper';
import { useHealth } from '../hooks/useHealth';
import { calculateProgress } from '@healthtrack/shared';

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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>HealthTrack Dashboard</Text>
      
      {/* Water Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>💧 Water Intake</Title>
          <Text>{waterIntake}ml / {dailyGoals.water}ml</Text>
          <ProgressBar progress={waterProgress / 100} color="#1e90ff" style={styles.progressBar} />
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
        </Card.Content>
      </Card>

      {/* Exercise Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>🏃 Exercise</Title>
          <Text>{exerciseMinutes}min / {dailyGoals.exercise}min</Text>
          <ProgressBar progress={exerciseProgress / 100} color="#4CAF50" style={styles.progressBar} />
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
        </Card.Content>
      </Card>

      {/* Calories Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>🔥 Calories Burned</Title>
          <Text>{caloriesBurned}kcal / {dailyGoals.calories}kcal</Text>
          <ProgressBar progress={caloriesProgress / 100} color="#FF6B6B" style={styles.progressBar} />
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
        </Card.Content>
      </Card>

      {/* Sleep Card */}
      <Card style={styles.card}>
        <Card.Content>
          <Title>😴 Sleep</Title>
          <Text>{sleepHours}h / {dailyGoals.sleep}h</Text>
          <ProgressBar progress={sleepProgress / 100} color="#9C27B0" style={styles.progressBar} />
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
        </Card.Content>
      </Card>
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
    elevation: 4,
  },
  progressBar: {
    marginVertical: 8,
    height: 10,
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
});

export default DashboardScreen;

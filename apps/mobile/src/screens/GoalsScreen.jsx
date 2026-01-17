import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Alert 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateDailyGoals } from '../store/healthSlice';

const GoalsScreen = () => {
  const dispatch = useDispatch();
  const dailyGoals = useSelector((state) => state.health.dailyGoals);
  
  const [goals, setGoals] = useState({
    water: dailyGoals.water.toString(),
    exercise: dailyGoals.exercise.toString(),
    calories: dailyGoals.calories.toString(),
    sleep: dailyGoals.sleep.toString(),
  });

  const handleSave = () => {
    const newGoals = {
      water: parseInt(goals.water) || 2000,
      exercise: parseInt(goals.exercise) || 30,
      calories: parseInt(goals.calories) || 2000,
      sleep: parseInt(goals.sleep) || 8,
    };

    // Validate input
    if (newGoals.water <= 0 || newGoals.exercise <= 0 || 
        newGoals.calories <= 0 || newGoals.sleep <= 0) {
      Alert.alert('Invalid Input', 'Please enter positive values for all goals.');
      return;
    }

    if (newGoals.sleep > 24) {
      Alert.alert('Invalid Sleep Goal', 'Sleep goal cannot exceed 24 hours.');
      return;
    }

    dispatch(updateDailyGoals(newGoals));
    Alert.alert('Success', 'Daily goals updated successfully!');
  };

  const handleResetToDefault = () => {
    setGoals({
      water: '2000',
      exercise: '30',
      calories: '2000',
      sleep: '8',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎯 Set Daily Goals</Text>
      <Text style={styles.subtitle}>Customize your daily health targets</Text>
      
      {/* Water Goal Card */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>💧</Text>
            <View>
              <Text style={styles.cardTitle}>Water Intake</Text>
              <Text style={styles.cardDescription}>
                Daily water goal in milliliters
              </Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={goals.water}
              onChangeText={(text) => setGoals({...goals, water: text.replace(/[^0-9]/g, '')})}
              keyboardType="numeric"
              placeholder="2000"
              maxLength={4}
            />
            <Text style={styles.unit}>ml</Text>
          </View>
          <View style={styles.presetButtons}>
            {['1500', '2000', '2500', '3000'].map((amount) => (
              <TouchableOpacity 
                key={amount}
                style={[
                  styles.presetButton,
                  goals.water === amount && styles.presetButtonActive
                ]}
                onPress={() => setGoals({...goals, water: amount})}
              >
                <Text style={[
                  styles.presetText,
                  goals.water === amount && styles.presetTextActive
                ]}>
                  {amount}ml
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Exercise Goal Card */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🏃</Text>
            <View>
              <Text style={styles.cardTitle}>Exercise</Text>
              <Text style={styles.cardDescription}>
                Daily exercise goal in minutes
              </Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={goals.exercise}
              onChangeText={(text) => setGoals({...goals, exercise: text.replace(/[^0-9]/g, '')})}
              keyboardType="numeric"
              placeholder="30"
              maxLength={3}
            />
            <Text style={styles.unit}>min</Text>
          </View>
          <View style={styles.presetButtons}>
            {['15', '30', '45', '60'].map((minutes) => (
              <TouchableOpacity 
                key={minutes}
                style={[
                  styles.presetButton,
                  goals.exercise === minutes && styles.presetButtonActive
                ]}
                onPress={() => setGoals({...goals, exercise: minutes})}
              >
                <Text style={[
                  styles.presetText,
                  goals.exercise === minutes && styles.presetTextActive
                ]}>
                  {minutes}min
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Calories Goal Card */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>🔥</Text>
            <View>
              <Text style={styles.cardTitle}>Calories Burned</Text>
              <Text style={styles.cardDescription}>
                Daily calories goal to burn
              </Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={goals.calories}
              onChangeText={(text) => setGoals({...goals, calories: text.replace(/[^0-9]/g, '')})}
              keyboardType="numeric"
              placeholder="2000"
              maxLength={5}
            />
            <Text style={styles.unit}>kcal</Text>
          </View>
          <View style={styles.presetButtons}>
            {['1500', '2000', '2500', '3000'].map((calories) => (
              <TouchableOpacity 
                key={calories}
                style={[
                  styles.presetButton,
                  goals.calories === calories && styles.presetButtonActive
                ]}
                onPress={() => setGoals({...goals, calories: calories})}
              >
                <Text style={[
                  styles.presetText,
                  goals.calories === calories && styles.presetTextActive
                ]}>
                  {calories}kcal
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Sleep Goal Card */}
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardIcon}>😴</Text>
            <View>
              <Text style={styles.cardTitle}>Sleep</Text>
              <Text style={styles.cardDescription}>
                Daily sleep goal in hours
              </Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={goals.sleep}
              onChangeText={(text) => setGoals({...goals, sleep: text.replace(/[^0-9]/g, '')})}
              keyboardType="numeric"
              placeholder="8"
              maxLength={2}
            />
            <Text style={styles.unit}>hours</Text>
          </View>
          <View style={styles.presetButtons}>
            {['6', '7', '8', '9'].map((hours) => (
              <TouchableOpacity 
                key={hours}
                style={[
                  styles.presetButton,
                  goals.sleep === hours && styles.presetButtonActive
                ]}
                onPress={() => setGoals({...goals, sleep: hours})}
              >
                <Text style={[
                  styles.presetText,
                  goals.sleep === hours && styles.presetTextActive
                ]}>
                  {hours}h
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.button, styles.resetButton]}
          onPress={handleResetToDefault}
        >
          <Text style={styles.resetButtonText}>Reset to Default</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save Goals</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tipsCard}>
        <View style={styles.cardContent}>
          <Text style={styles.tipsTitle}>💡 Recommended Goals</Text>
          <Text style={styles.tipItem}>• Water: 2000-3000ml per day</Text>
          <Text style={styles.tipItem}>• Exercise: 30+ minutes daily</Text>
          <Text style={styles.tipItem}>• Calories: 2000-2500 for adults</Text>
          <Text style={styles.tipItem}>• Sleep: 7-9 hours per night</Text>
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
    marginVertical: 10,
    color: '#1e90ff',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
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
  tipsCard: {
    marginBottom: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    elevation: 4,
  },
  cardContent: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  unit: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 12,
    width: 60,
  },
  presetButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  presetButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    minWidth: '23%',
    alignItems: 'center',
  },
  presetButtonActive: {
    backgroundColor: '#1e90ff',
  },
  presetText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  presetTextActive: {
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButton: {
    backgroundColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#1e90ff',
  },
  resetButtonText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  tipItem: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default GoalsScreen;

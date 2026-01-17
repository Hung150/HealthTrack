import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput 
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
    dispatch(updateDailyGoals({
      water: parseInt(goals.water) || 2000,
      exercise: parseInt(goals.exercise) || 30,
      calories: parseInt(goals.calories) || 2000,
      sleep: parseInt(goals.sleep) || 8,
    }));
    // Hiển thị success message
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🎯 Set Daily Goals</Text>
      
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>💧 Water Intake</Text>
          <Text style={styles.cardDescription}>
            Daily water goal in milliliters
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={goals.water}
              onChangeText={(text) => setGoals({...goals, water: text})}
              keyboardType="numeric"
              placeholder="2000"
            />
            <Text style={styles.unit}>ml</Text>
          </View>
          <View style={styles.presetButtons}>
            <TouchableOpacity 
              style={styles.presetButton}
              onPress={() => setGoals({...goals, water: '1500'})}
            >
              <Text style={styles.presetText}>1500ml</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.presetButton}
              onPress={() => setGoals({...goals, water: '2000'})}
            >
              <Text style={styles.presetText}>2000ml</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.presetButton}
              onPress={() => setGoals({...goals, water: '2500'})}
            >
              <Text style={styles.presetText}>2500ml</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Tương tự cho Exercise, Calories, Sleep */}

      <TouchableOpacity 
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Save Goals</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

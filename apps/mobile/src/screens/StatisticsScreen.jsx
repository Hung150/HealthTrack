import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomCard from '../components/CustomCard';
import { useHealth } from '../hooks/useHealth';

const StatisticsScreen = () => {
  const { 
    waterIntake, 
    caloriesBurned, 
    exerciseMinutes, 
    sleepHours,
    dailyGoals 
  } = useHealth();

  const calculatePercentage = (current, goal) => {
    if (goal === 0) return 0;
    return ((current / goal) * 100).toFixed(1);
  };

  const statistics = [
    {
      title: 'Water Intake',
      current: waterIntake,
      goal: dailyGoals.water,
      unit: 'ml',
      percentage: calculatePercentage(waterIntake, dailyGoals.water),
      color: '#1e90ff',
    },
    {
      title: 'Exercise',
      current: exerciseMinutes,
      goal: dailyGoals.exercise,
      unit: 'min',
      percentage: calculatePercentage(exerciseMinutes, dailyGoals.exercise),
      color: '#4CAF50',
    },
    {
      title: 'Calories Burned',
      current: caloriesBurned,
      goal: dailyGoals.calories,
      unit: 'kcal',
      percentage: calculatePercentage(caloriesBurned, dailyGoals.calories),
      color: '#FF6B6B',
    },
    {
      title: 'Sleep',
      current: sleepHours,
      goal: dailyGoals.sleep,
      unit: 'hours',
      percentage: calculatePercentage(sleepHours, dailyGoals.sleep),
      color: '#9C27B0',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📈 Daily Statistics</Text>
      
      <CustomCard>
        <Text style={styles.summaryTitle}>Today's Summary</Text>
        {statistics.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <View style={styles.statHeader}>
              <Text style={styles.statTitle}>{stat.title}</Text>
              <Text style={styles.statValue}>
                {stat.current} {stat.unit}
              </Text>
            </View>
            <View style={styles.progressContainer}>
              <View 
                style={[
                  styles.progressBar, 
                  { 
                    width: `${Math.min(parseFloat(stat.percentage), 100)}%`,
                    backgroundColor: stat.color 
                  }
                ]} 
              />
            </View>
            <View style={styles.statFooter}>
              <Text style={styles.statGoal}>
                Goal: {stat.goal} {stat.unit}
              </Text>
              <Text style={[
                styles.statPercentage,
                { color: parseFloat(stat.percentage) >= 100 ? '#4CAF50' : '#666' }
              ]}>
                {stat.percentage}%
              </Text>
            </View>
          </View>
        ))}
      </CustomCard>

      <CustomCard>
        <Text style={styles.summaryTitle}>Achievements</Text>
        <Text style={styles.comingSoon}>Achievements system coming soon!</Text>
      </CustomCard>
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
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  statItem: {
    marginBottom: 20,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  statFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statGoal: {
    fontSize: 14,
    color: '#666',
  },
  statPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  comingSoon: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingVertical: 20,
    fontStyle: 'italic',
  },
});

export default StatisticsScreen;

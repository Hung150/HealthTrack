import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
      icon: '💧',
    },
    {
      title: 'Exercise',
      current: exerciseMinutes,
      goal: dailyGoals.exercise,
      unit: 'min',
      percentage: calculatePercentage(exerciseMinutes, dailyGoals.exercise),
      color: '#4CAF50',
      icon: '🏃',
    },
    {
      title: 'Calories Burned',
      current: caloriesBurned,
      goal: dailyGoals.calories,
      unit: 'kcal',
      percentage: calculatePercentage(caloriesBurned, dailyGoals.calories),
      color: '#FF6B6B',
      icon: '🔥',
    },
    {
      title: 'Sleep',
      current: sleepHours,
      goal: dailyGoals.sleep,
      unit: 'hours',
      percentage: calculatePercentage(sleepHours, dailyGoals.sleep),
      color: '#9C27B0',
      icon: '😴',
    },
  ];

  const getStatus = (percentage) => {
    const percent = parseFloat(percentage);
    if (percent >= 100) return { text: 'Goal Achieved!', color: '#4CAF50' };
    if (percent >= 75) return { text: 'Good Progress', color: '#FF9800' };
    if (percent >= 50) return { text: 'Halfway There', color: '#1e90ff' };
    return { text: 'Keep Going', color: '#666' };
  };

  const totalPercentage = statistics.reduce((sum, stat) => 
    sum + parseFloat(stat.percentage), 0
  ) / statistics.length;

  const overallStatus = getStatus(totalPercentage);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📈 Daily Statistics</Text>
      
      {/* Overall Progress Card */}
      <View style={styles.overallCard}>
        <View style={styles.cardContent}>
          <Text style={styles.overallTitle}>Overall Progress</Text>
          <View style={styles.overallProgress}>
            <Text style={styles.overallPercentage}>
              {totalPercentage.toFixed(1)}%
            </Text>
            <Text style={[styles.overallStatus, { color: overallStatus.color }]}>
              {overallStatus.text}
            </Text>
          </View>
          <View style={styles.overallBarBackground}>
            <View 
              style={[
                styles.overallBarFill, 
                { width: `${Math.min(totalPercentage, 100)}%` }
              ]} 
            />
          </View>
        </View>
      </View>

      {/* Individual Stats Cards */}
      {statistics.map((stat, index) => {
        const status = getStatus(stat.percentage);
        
        return (
          <View key={index} style={styles.card}>
            <View style={styles.cardContent}>
              <View style={styles.statHeader}>
                <View style={styles.statTitleContainer}>
                  <Text style={styles.statIcon}>{stat.icon}</Text>
                  <Text style={styles.statTitle}>{stat.title}</Text>
                </View>
                <Text style={[styles.statStatus, { color: status.color }]}>
                  {status.text}
                </Text>
              </View>
              
              <View style={styles.statValues}>
                <Text style={styles.statCurrent}>
                  {stat.current} {stat.unit}
                </Text>
                <Text style={styles.statGoal}>
                  Goal: {stat.goal} {stat.unit}
                </Text>
              </View>
              
              <View style={styles.progressContainer}>
                <View style={styles.progressBarBackground}>
                  <View 
                    style={[
                      styles.progressBarFill, 
                      { 
                        width: `${Math.min(parseFloat(stat.percentage), 100)}%`,
                        backgroundColor: stat.color 
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>{stat.percentage}%</Text>
              </View>
              
              <View style={styles.achievement}>
                {parseFloat(stat.percentage) >= 100 ? (
                  <Text style={styles.achievementText}>🎉 Goal Achieved!</Text>
                ) : (
                  <Text style={styles.remainingText}>
                    Need {stat.goal - stat.current} more {stat.unit} to reach goal
                  </Text>
                )}
              </View>
            </View>
          </View>
        );
      })}
      
      {/* Tips Card */}
      <View style={styles.tipsCard}>
        <View style={styles.cardContent}>
          <Text style={styles.tipsTitle}>💡 Health Tips</Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipText}>• Drink water throughout the day</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipText}>• Take short breaks to stretch</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipText}>• Aim for 7-8 hours of sleep</Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipText}>• Regular exercise boosts energy</Text>
          </View>
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
  overallCard: {
    marginBottom: 16,
    backgroundColor: '#1e90ff',
    borderRadius: 12,
    elevation: 4,
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
  overallTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  overallProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  overallPercentage: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  overallStatus: {
    fontSize: 16,
    fontWeight: '600',
  },
  overallBarBackground: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 6,
    overflow: 'hidden',
  },
  overallBarFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  statTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  statValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statCurrent: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statGoal: {
    fontSize: 16,
    color: '#666',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
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
    minWidth: 50,
  },
  achievement: {
    marginTop: 8,
  },
  achievementText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
  remainingText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  tipItem: {
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
});

export default StatisticsScreen;

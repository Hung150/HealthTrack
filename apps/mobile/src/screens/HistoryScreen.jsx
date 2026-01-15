import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, DataTable } from 'react-native-paper';
import { useHealth } from '../hooks/useHealth';

const HistoryScreen = () => {
  const { waterIntake, caloriesBurned, exerciseMinutes, sleepHours } = useHealth();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Health History</Text>
      
      <Card style={styles.card}>
        <Card.Content>
          <Title>📊 Daily Summary</Title>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Date</DataTable.Title>
              <DataTable.Title numeric>Water</DataTable.Title>
              <DataTable.Title numeric>Exercise</DataTable.Title>
              <DataTable.Title numeric>Calories</DataTable.Title>
              <DataTable.Title numeric>Sleep</DataTable.Title>
            </DataTable.Header>

            {/* Example data - sẽ thay bằng real data */}
            <DataTable.Row>
              <DataTable.Cell>Today</DataTable.Cell>
              <DataTable.Cell numeric>1500ml</DataTable.Cell>
              <DataTable.Cell numeric>45min</DataTable.Cell>
              <DataTable.Cell numeric>1800kcal</DataTable.Cell>
              <DataTable.Cell numeric>7h</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Yesterday</DataTable.Cell>
              <DataTable.Cell numeric>2000ml</DataTable.Cell>
              <DataTable.Cell numeric>30min</DataTable.Cell>
              <DataTable.Cell numeric>2200kcal</DataTable.Cell>
              <DataTable.Cell numeric>8h</DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>📈 Progress Over Time</Title>
          <Text style={styles.comingSoon}>
            Charts and detailed analytics coming soon!
          </Text>
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
  comingSoon: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#666',
    marginVertical: 20,
  },
});

export default HistoryScreen;

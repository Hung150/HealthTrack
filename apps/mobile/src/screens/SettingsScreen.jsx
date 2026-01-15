import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Switch, List } from 'react-native-paper';
import { useHealth } from '../hooks/useHealth';

const SettingsScreen = () => {
  const { dailyGoals, updateDailyGoals } = useHealth();
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      
      <Card style={styles.card}>
        <Card.Content>
          <Title>🎯 Daily Goals</Title>
          
          <List.Item
            title="Water Goal"
            description={`Current: ${dailyGoals.water}ml`}
            right={() => <Text>{dailyGoals.water}ml</Text>}
          />
          
          <List.Item
            title="Exercise Goal"
            description={`Current: ${dailyGoals.exercise} minutes`}
            right={() => <Text>{dailyGoals.exercise}min</Text>}
          />
          
          <List.Item
            title="Calories Goal"
            description={`Current: ${dailyGoals.calories} kcal`}
            right={() => <Text>{dailyGoals.calories}kcal</Text>}
          />
          
          <List.Item
            title="Sleep Goal"
            description={`Current: ${dailyGoals.sleep} hours`}
            right={() => <Text>{dailyGoals.sleep}h</Text>}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>🔔 Notifications</Title>
          <List.Item
            title="Enable Notifications"
            description="Reminders to drink water, exercise, etc."
            right={() => (
              <Switch
                value={notifications}
                onValueChange={setNotifications}
              />
            )}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>🎨 Appearance</Title>
          <List.Item
            title="Dark Mode"
            right={() => (
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
              />
            )}
          />
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
});

export default SettingsScreen;

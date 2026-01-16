import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Title, List } from 'react-native-paper';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>⚙️ Settings</Title>
          <List.Item
            title="Daily Goals"
            description="Set your daily targets"
            left={props => <List.Icon {...props} icon="target" />}
            onPress={() => {}}
          />
          <List.Item
            title="Notifications"
            description="Manage reminders"
            left={props => <List.Icon {...props} icon="bell" />}
            onPress={() => {}}
          />
          <List.Item
            title="Appearance"
            description="Theme and display"
            left={props => <List.Icon {...props} icon="palette" />}
            onPress={() => {}}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginTop: 20,
  },
});

export default SettingsScreen;

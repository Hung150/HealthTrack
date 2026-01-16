import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Title } from 'react-native-paper';

const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>📊 Health History</Title>
          <Text style={styles.text}>Your health tracking history will appear here.</Text>
          <Text style={styles.subText}>Coming soon...</Text>
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
  text: {
    fontSize: 16,
    marginTop: 10,
    color: '#666',
  },
  subText: {
    fontSize: 14,
    marginTop: 5,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default HistoryScreen;

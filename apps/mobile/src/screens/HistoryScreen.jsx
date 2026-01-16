import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// XÓA: import { Card, Title } from 'react-native-paper';

const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.title}>📊 Health History</Text>
          <Text style={styles.text}>Your health tracking history will appear here.</Text>
          <Text style={styles.subText}>Coming soon...</Text>
        </View>
      </View>
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
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  cardContent: {
    // padding có trong card
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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

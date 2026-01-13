import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.content}>
          <Text style={styles.title}>🏥 HealthTrack</Text>
          <Text style={styles.subtitle}>Your Personal Health Companion</Text>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureTitle}>📊 Track Your Health</Text>
            <Text style={styles.featureText}>• Water intake</Text>
            <Text style={styles.featureText}>• Calories burned</Text>
            <Text style={styles.featureText}>• Sleep hours</Text>
            <Text style={styles.featureText}>• Exercise minutes</Text>
          </View>
          
          <Text style={styles.tech}>Built with: React Native, Expo, Redux, TypeScript</Text>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1e90ff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    marginLeft: 10,
  },
  tech: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

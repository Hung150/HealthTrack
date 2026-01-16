import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
// XÓA: import { Provider as PaperProvider } from 'react-native-paper';
import { storePromise } from './src/store';
import AppNavigator from './src/navigation';

export default function App() {
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStore = async () => {
      try {
        const loadedStore = await storePromise;
        setStore(loadedStore);
      } catch (error) {
        console.error('Failed to load store:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStore();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1e90ff" />
        <Text style={styles.loadingText}>Loading HealthTrack...</Text>
      </View>
    );
  }

  if (!store) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load application</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      {/* XÓA: <PaperProvider> */}
        <AppNavigator />
      {/* XÓA: </PaperProvider> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffebee',
  },
  errorText: {
    fontSize: 18,
    color: '#d32f2f',
    textAlign: 'center',
    padding: 20,
  },
});

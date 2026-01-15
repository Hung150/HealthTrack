// App.js không dùng navigation
import React from 'react';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import { store } from './src/store';
import DashboardScreen from './src/screens/DashboardScreen';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <DashboardScreen />
      </PaperProvider>
    </Provider>
  );
}

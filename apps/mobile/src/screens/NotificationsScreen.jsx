import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Switch, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import * as Notifications from 'expo-notifications';
import { 
  registerForPushNotificationsAsync, 
  scheduleWaterReminder,
  cancelAllNotifications,
  sendTestNotification 
} from '../utils/notifications';

const NotificationsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [waterReminders, setWaterReminders] = useState(true);
  const [exerciseReminders, setExerciseReminders] = useState(false);
  const [sleepReminders, setSleepReminders] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState('');

  useEffect(() => {
    // Register for notifications on mount
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token || '');
    });

    // Listen for notifications
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const toggleNotifications = async (value) => {
    setNotificationsEnabled(value);
    if (value) {
      await scheduleWaterReminder();
      Alert.alert('Notifications Enabled', 'You will receive health reminders.');
    } else {
      await cancelAllNotifications();
      Alert.alert('Notifications Disabled', 'All reminders have been cancelled.');
    }
  };

  const handleTestNotification = async () => {
    await sendTestNotification();
    Alert.alert('Test Sent', 'Check your notification!');
  };

  const reminderSettings = [
    {
      id: 1,
      title: 'Water Reminders',
      description: 'Remind to drink water every 2 hours',
      enabled: waterReminders,
      toggle: setWaterReminders,
      icon: '💧',
      color: '#1e90ff',
    },
    {
      id: 2,
      title: 'Exercise Reminders',
      description: 'Remind to exercise daily',
      enabled: exerciseReminders,
      toggle: setExerciseReminders,
      icon: '🏃',
      color: '#4CAF50',
    },
    {
      id: 3,
      title: 'Sleep Reminders',
      description: 'Remind to go to bed on time',
      enabled: sleepReminders,
      toggle: setSleepReminders,
      icon: '😴',
      color: '#9C27B0',
    },
    {
      id: 4,
      title: 'Daily Summary',
      description: 'Get daily progress report',
      enabled: true,
      toggle: () => {},
      icon: '📊',
      color: '#FF9800',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🔔 Notifications</Text>
      <Text style={styles.subtitle}>Manage your health reminders</Text>

      {/* Main Toggle */}
      <View style={styles.mainToggleCard}>
        <View style={styles.mainToggleContent}>
          <View style={styles.mainToggleLeft}>
            <Text style={styles.mainToggleIcon}>🔔</Text>
            <View>
              <Text style={styles.mainToggleTitle}>Enable Notifications</Text>
              <Text style={styles.mainToggleDescription}>
                Receive health reminders and updates
              </Text>
            </View>
          </View>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: '#ddd', true: '#1e90ff' }}
            thumbColor="#fff"
          />
        </View>
      </View>

      {/* Reminder Settings */}
      <View style={styles.settingsCard}>
        <Text style={styles.sectionTitle}>Reminder Settings</Text>
        {reminderSettings.map((item) => (
          <View key={item.id} style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: `${item.color}15` }]}>
                <Text style={styles.settingIconText}>{item.icon}</Text>
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingDescription}>{item.description}</Text>
              </View>
            </View>
            <Switch
              value={item.enabled}
              onValueChange={item.toggle}
              disabled={!notificationsEnabled}
              trackColor={{ false: '#ddd', true: item.color }}
              thumbColor="#fff"
            />
          </View>
        ))}
      </View>

      {/* Test & Actions */}
      <View style={styles.actionsCard}>
        <Text style={styles.sectionTitle}>Test & Actions</Text>
        
        <TouchableOpacity 
          style={[styles.actionButton, !notificationsEnabled && styles.actionButtonDisabled]}
          onPress={handleTestNotification}
          disabled={!notificationsEnabled}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>Send Test Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => Alert.alert('Scheduled', 'View and manage scheduled notifications')}
          activeOpacity={0.7}
        >
          <Text style={styles.actionButtonText}>View Scheduled Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.resetButton]}
          onPress={() => {
            cancelAllNotifications();
            setNotificationsEnabled(false);
            Alert.alert('Reset', 'All notifications have been reset.');
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.resetButtonText}>Reset All Notifications</Text>
        </TouchableOpacity>
      </View>

      {/* Info */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Notification Settings</Text>
        <Text style={styles.infoText}>
          • Notifications help you maintain healthy habits
        </Text>
        <Text style={styles.infoText}>
          • You can customize reminder frequency
        </Text>
        <Text style={styles.infoText}>
          • All data stays on your device
        </Text>
        
        {expoPushToken ? (
          <View style={styles.tokenContainer}>
            <Text style={styles.tokenLabel}>Push Token:</Text>
            <Text style={styles.tokenText} numberOfLines={1}>
              {expoPushToken.substring(0, 30)}...
            </Text>
          </View>
        ) : null}
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
    marginVertical: 10,
    color: '#1e90ff',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  mainToggleCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  mainToggleContent: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  mainToggleIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  mainToggleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  mainToggleDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  settingsCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
  },
  actionsCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
  },
  infoCard: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingIconText: {
    fontSize: 20,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  actionButton: {
    marginHorizontal: 20,
    marginBottom: 12,
    paddingVertical: 15,
    backgroundColor: '#1e90ff',
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonDisabled: {
    backgroundColor: '#ccc',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resetButton: {
    backgroundColor: '#f0f0f0',
    marginTop: 8,
  },
  resetButtonText: {
    color: '#666',
    fontWeight: 'bold',
    fontSize: 16,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  tokenContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  tokenLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  tokenText: {
    fontSize: 10,
    color: '#666',
    fontFamily: 'monospace',
  },
});

export default NotificationsScreen;

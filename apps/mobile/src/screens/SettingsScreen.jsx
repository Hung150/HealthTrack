import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// XÓA: import { Card, Title, List } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const settingsItems = [
    {
      id: 1,
      title: 'Daily Goals',
      description: 'Set your daily targets',
      icon: 'target',
      onPress: () => console.log('Daily Goals pressed'),
    },
    {
      id: 2,
      title: 'Notifications',
      description: 'Manage reminders',
      icon: 'bell',
      onPress: () => console.log('Notifications pressed'),
    },
    {
      id: 3,
      title: 'Appearance',
      description: 'Theme and display',
      icon: 'palette',
      onPress: () => console.log('Appearance pressed'),
    },
    {
      id: 4,
      title: 'Privacy & Security',
      description: 'Data and privacy settings',
      icon: 'shield-lock',
      onPress: () => console.log('Privacy pressed'),
    },
    {
      id: 5,
      title: 'About',
      description: 'App version and information',
      icon: 'information',
      onPress: () => console.log('About pressed'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <Text style={styles.title}>⚙️ Settings</Text>
          
          {settingsItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.listItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.listItemLeft}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons 
                    name={item.icon} 
                    size={24} 
                    color="#1e90ff" 
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
              </View>
              <MaterialCommunityIcons 
                name="chevron-right" 
                size={24} 
                color="#ccc" 
              />
            </TouchableOpacity>
          ))}
          
          {/* App Version */}
          <View style={styles.versionContainer}>
            <Text style={styles.versionText}>HealthTrack v1.0.0</Text>
            <Text style={styles.copyrightText}>© 2024 HealthTrack Inc.</Text>
          </View>
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  versionContainer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: '#666',
  },
  copyrightText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});

export default SettingsScreen;

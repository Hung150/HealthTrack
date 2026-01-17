import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();

  const settingsItems = [
    {
      id: 1,
      title: 'Daily Goals',
      description: 'Set your daily health targets',
      icon: 'target',
      onPress: () => navigation.navigate('Goals'),
      color: '#1e90ff',
    },
    {
      id: 2,
      title: 'Notifications',
      description: 'Manage reminders and alerts',
      icon: 'bell',
      onPress: () => console.log('Notifications pressed'),
      color: '#4CAF50',
    },
    {
      id: 3,
      title: 'Appearance',
      description: 'Theme and display settings',
      icon: 'palette',
      onPress: () => console.log('Appearance pressed'),
      color: '#9C27B0',
    },
    {
      id: 4,
      title: 'Privacy & Security',
      description: 'Data and privacy settings',
      icon: 'shield-lock',
      onPress: () => console.log('Privacy pressed'),
      color: '#FF6B6B',
    },
    {
      id: 5,
      title: 'Data & Storage',
      description: 'Manage app data and backups',
      icon: 'database',
      onPress: () => console.log('Data pressed'),
      color: '#FF9800',
    },
    {
      id: 6,
      title: 'About',
      description: 'App version and information',
      icon: 'information',
      onPress: () => console.log('About pressed'),
      color: '#607D8B',
    },
  ];

  const handleExportData = () => {
    console.log('Export data pressed');
    // Logic để export data
  };

  const handleResetAllData = () => {
    console.log('Reset all data pressed');
    // Logic để reset data
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>⚙️ Settings</Text>
      
      {/* User Profile Section */}
      <View style={styles.profileCard}>
        <View style={styles.profileContent}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>👤</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Health Tracker</Text>
            <Text style={styles.profileEmail}>tracker@healthapp.com</Text>
            <TouchableOpacity style={styles.editProfileButton}>
              <Text style={styles.editProfileText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Settings Options */}
      <View style={styles.settingsCard}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        {settingsItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.listItem}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={styles.listItemLeft}>
              <View style={[styles.iconContainer, { backgroundColor: `${item.color}15` }]}>
                <MaterialCommunityIcons 
                  name={item.icon} 
                  size={22} 
                  color={item.color} 
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
      </View>

      {/* Data Management Section */}
      <View style={styles.dataCard}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        
        <TouchableOpacity 
          style={styles.dataButton}
          onPress={handleExportData}
          activeOpacity={0.7}
        >
          <View style={styles.dataButtonLeft}>
            <MaterialCommunityIcons name="export" size={24} color="#4CAF50" />
            <Text style={styles.dataButtonTitle}>Export Health Data</Text>
          </View>
          <Text style={styles.dataButtonSubtitle}>CSV, PDF formats</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.dataButton}
          onPress={handleResetAllData}
          activeOpacity={0.7}
        >
          <View style={styles.dataButtonLeft}>
            <MaterialCommunityIcons name="refresh" size={24} color="#FF6B6B" />
            <Text style={styles.dataButtonTitle}>Reset All Data</Text>
          </View>
          <Text style={styles.dataButtonWarning}>This action cannot be undone</Text>
        </TouchableOpacity>
      </View>

      {/* Support Section */}
      <View style={styles.supportCard}>
        <Text style={styles.sectionTitle}>Support</Text>
        
        <TouchableOpacity style={styles.supportButton}>
          <MaterialCommunityIcons name="help-circle" size={22} color="#666" />
          <Text style={styles.supportButtonText}>Help & FAQ</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.supportButton}>
          <MaterialCommunityIcons name="email" size={22} color="#666" />
          <Text style={styles.supportButtonText}>Contact Support</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.supportButton}>
          <MaterialCommunityIcons name="star" size={22} color="#666" />
          <Text style={styles.supportButtonText}>Rate the App</Text>
        </TouchableOpacity>
      </View>

      {/* App Version & Info */}
      <View style={styles.infoCard}>
        <Text style={styles.appName}>HealthTrack</Text>
        <Text style={styles.versionText}>Version 1.0.0</Text>
        <Text style={styles.buildText}>Build 2024.01.16</Text>
        <Text style={styles.copyrightText}>© 2024 HealthTrack Inc. All rights reserved.</Text>
        
        <View style={styles.socialLinks}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>🐦</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>📘</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialIcon}>📷</Text>
          </TouchableOpacity>
        </View>
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
    marginVertical: 20,
    color: '#1e90ff',
  },
  profileCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  profileContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    fontSize: 48,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  editProfileButton: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
  editProfileText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  settingsCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
  },
  dataCard: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
  },
  supportCard: {
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
    alignItems: 'center',
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
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  dataButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dataButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dataButtonTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 16,
  },
  dataButtonSubtitle: {
    fontSize: 12,
    color: '#666',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  dataButtonWarning: {
    fontSize: 12,
    color: '#FF6B6B',
    backgroundColor: '#FF6B6B15',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  supportButtonText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginBottom: 8,
  },
  versionText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  buildText: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  copyrightText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginBottom: 16,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  socialButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  socialIcon: {
    fontSize: 20,
  },
});

export default SettingsScreen;

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SectionList,
  Dimensions 
} from 'react-native';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HistoryScreen = () => {
  const healthState = useSelector((state) => state.health);
  const history = healthState.history || [];
  const [selectedFilter, setSelectedFilter] = useState('all'); // all, week, month
  
  // Format date
  const formatDate = (dateString) => {
    const date = dayjs(dateString);
    const today = dayjs();
    const yesterday = today.subtract(1, 'day');
    
    if (date.isSame(today, 'day')) return 'Today';
    if (date.isSame(yesterday, 'day')) return 'Yesterday';
    if (date.isSame(today, 'week')) return date.format('dddd');
    
    return date.format('MMM D, YYYY');
  };

  // Calculate percentages
  const calculatePercentage = (value, goal) => {
    if (goal === 0) return 0;
    return Math.min(Math.round((value / goal) * 100), 100);
  };

  // Get status color
  const getStatusColor = (percentage) => {
    if (percentage >= 100) return '#4CAF50';
    if (percentage >= 75) return '#FF9800';
    return '#1e90ff';
  };

  // Filter history
  const filteredHistory = history.filter(record => {
    const recordDate = dayjs(record.date);
    const today = dayjs();
    
    switch (selectedFilter) {
      case 'week':
        return recordDate.isAfter(today.subtract(1, 'week'));
      case 'month':
        return recordDate.isAfter(today.subtract(1, 'month'));
      default:
        return true;
    }
  });

  // Group by date
  const groupedHistory = filteredHistory.reduce((groups, record) => {
    const date = record.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(record);
    return groups;
  }, {});

  // Convert to section list format
  const sections = Object.keys(groupedHistory)
    .sort((a, b) => dayjs(b).diff(dayjs(a)))
    .map(date => ({
      title: formatDate(date),
      date: date,
      data: groupedHistory[date],
    }));

  // Calculate averages
  const calculateAverages = () => {
    if (filteredHistory.length === 0) return null;
    
    const totals = filteredHistory.reduce((acc, record) => ({
      water: acc.water + record.water,
      exercise: acc.exercise + record.exercise,
      calories: acc.calories + record.calories,
      sleep: acc.sleep + record.sleep,
    }), { water: 0, exercise: 0, calories: 0, sleep: 0 });
    
    const count = filteredHistory.length;
    
    return {
      water: Math.round(totals.water / count),
      exercise: Math.round(totals.exercise / count),
      calories: Math.round(totals.calories / count),
      sleep: (totals.sleep / count).toFixed(1),
    };
  };

  const averages = calculateAverages();

  // Render history item
  const renderHistoryItem = ({ item }) => {
    const waterPercent = calculatePercentage(item.water, item.goals?.water || 2000);
    const exercisePercent = calculatePercentage(item.exercise, item.goals?.exercise || 30);
    const caloriesPercent = calculatePercentage(item.calories, item.goals?.calories || 2000);
    const sleepPercent = calculatePercentage(item.sleep, item.goals?.sleep || 8);

    return (
      <View style={styles.historyCard}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyDate}>
            {dayjs(item.date).format('MMM D')}
          </Text>
          <View style={styles.historyStats}>
            <Text style={styles.historyStat}>
              {item.water}ml • {item.exercise}min • {item.calories}kcal • {item.sleep}h
            </Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          {/* Water Progress */}
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>💧 Water</Text>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: `${waterPercent}%`,
                    backgroundColor: getStatusColor(waterPercent)
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{waterPercent}%</Text>
          </View>
          
          {/* Exercise Progress */}
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>🏃 Exercise</Text>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: `${exercisePercent}%`,
                    backgroundColor: getStatusColor(exercisePercent)
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{exercisePercent}%</Text>
          </View>
          
          {/* Calories Progress */}
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>🔥 Calories</Text>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: `${caloriesPercent}%`,
                    backgroundColor: getStatusColor(caloriesPercent)
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{caloriesPercent}%</Text>
          </View>
          
          {/* Sleep Progress */}
          <View style={styles.progressItem}>
            <Text style={styles.progressLabel}>😴 Sleep</Text>
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: `${sleepPercent}%`,
                    backgroundColor: getStatusColor(sleepPercent)
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>{sleepPercent}%</Text>
          </View>
        </View>
      </View>
    );
  };

  // Render section header
  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.sectionDate}>
        {dayjs(section.date).format('MMM D, YYYY')}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📊 Health History</Text>
        <Text style={styles.subtitle}>Track your progress over time</Text>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {['all', 'week', 'month'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.filterButtonActive
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter && styles.filterTextActive
            ]}>
              {filter === 'all' ? 'All Time' : 
               filter === 'week' ? 'This Week' : 'This Month'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Averages Card */}
      {averages && filteredHistory.length > 0 && (
        <View style={styles.averagesCard}>
          <Text style={styles.averagesTitle}>
            📈 {selectedFilter === 'all' ? 'Overall' : 
                selectedFilter === 'week' ? 'Weekly' : 'Monthly'} Averages
          </Text>
          <View style={styles.averagesGrid}>
            <View style={styles.averageItem}>
              <Text style={styles.averageValue}>{averages.water}ml</Text>
              <Text style={styles.averageLabel}>Water</Text>
            </View>
            <View style={styles.averageDivider} />
            <View style={styles.averageItem}>
              <Text style={styles.averageValue}>{averages.exercise}min</Text>
              <Text style={styles.averageLabel}>Exercise</Text>
            </View>
            <View style={styles.averageDivider} />
            <View style={styles.averageItem}>
              <Text style={styles.averageValue}>{averages.calories}kcal</Text>
              <Text style={styles.averageLabel}>Calories</Text>
            </View>
            <View style={styles.averageDivider} />
            <View style={styles.averageItem}>
              <Text style={styles.averageValue}>{averages.sleep}h</Text>
              <Text style={styles.averageLabel}>Sleep</Text>
            </View>
          </View>
          <Text style={styles.averagesNote}>
            Based on {filteredHistory.length} day{filteredHistory.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}

      {/* History List */}
      {sections.length > 0 ? (
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item.date + index}
          renderItem={renderHistoryItem}
          renderSectionHeader={renderSectionHeader}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="history" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>No History Yet</Text>
          <Text style={styles.emptyText}>
            Start tracking your health metrics in the Dashboard to see your history here.
          </Text>
          <TouchableOpacity style={styles.emptyButton}>
            <Text style={styles.emptyButtonText}>Go to Dashboard</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Stats Summary */}
      {filteredHistory.length > 0 && (
        <View style={styles.statsSummary}>
          <Text style={styles.statsTitle}>📋 Summary</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{filteredHistory.length}</Text>
              <Text style={styles.statLabel}>Days Tracked</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {Math.round(filteredHistory.length / (selectedFilter === 'week' ? 7 : 
                  selectedFilter === 'month' ? 30 : filteredHistory.length) * 100)}%
              </Text>
              <Text style={styles.statLabel}>Consistency</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <MaterialCommunityIcons 
                name="trending-up" 
                size={24} 
                color="#4CAF50" 
              />
              <Text style={styles.statLabel}>Progress</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1e90ff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginTop: -10,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#1e90ff',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
  },
  averagesCard: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 20,
    elevation: 4,
  },
  averagesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  averagesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  averageItem: {
    alignItems: 'center',
    flex: 1,
  },
  averageValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  averageLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  averageDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  averagesNote: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 12,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  list: {
    flex: 1,
    marginTop: 16,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  sectionHeader: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  historyStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyStat: {
    fontSize: 12,
    color: '#666',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 14,
    width: 80,
    color: '#333',
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginHorizontal: 12,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    width: 35,
    textAlign: 'right',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 60,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  emptyButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  statsSummary: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    elevation: 4,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
  },
});

export default HistoryScreen;

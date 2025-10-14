import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../src/utils/api';
import Colors from '../../src/constants/Colors';

interface TimetableItem {
  _id: string;
  course: string;
  time: string;
  location: string;
  day: string;
  campus: string;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function Timetable() {
  const [timetable, setTimetable] = useState<TimetableItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDay, setSelectedDay] = useState('Monday');

  const fetchTimetable = async () => {
    try {
      const response = await api.get('/timetable');
      setTimetable(response.data);
    } catch (error) {
      console.error('Error fetching timetable:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTimetable();
  };

  const filteredClasses = timetable.filter(item => item.day === selectedDay);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.daysScroll}
        contentContainerStyle={styles.daysContent}
      >
        {DAYS.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDay === day && styles.dayButtonActive,
            ]}
            onPress={() => setSelectedDay(day)}
          >
            <Text
              style={[
                styles.dayText,
                selectedDay === day && styles.dayTextActive,
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
        ) : filteredClasses.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color={Colors.textSecondary} />
            <Text style={styles.emptyText}>No classes scheduled for {selectedDay}</Text>
          </View>
        ) : (
          filteredClasses.map((item) => (
            <View key={item._id} style={styles.classCard}>
              <View style={styles.timeContainer}>
                <Ionicons name="time" size={20} color={Colors.primary} />
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <Text style={styles.courseName}>{item.course}</Text>
              <View style={styles.locationContainer}>
                <Ionicons name="location" size={16} color={Colors.textSecondary} />
                <Text style={styles.location}>{item.location}, {item.campus}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  daysScroll: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  daysContent: {
    padding: 16,
    gap: 8,
  },
  dayButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.background,
  },
  dayButtonActive: {
    backgroundColor: Colors.primary,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  dayTextActive: {
    color: 'white',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  loader: {
    marginTop: 32,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 16,
    textAlign: 'center',
  },
  classCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  time: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: 8,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
});
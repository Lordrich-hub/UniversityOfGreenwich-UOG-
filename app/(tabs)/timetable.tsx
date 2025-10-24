import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type DaySchedule = {
  id: string;
  time: string;
  title: string;
  lecturer: string;
  room: string;
  type: 'lecture' | 'lab' | 'tutorial' | 'seminar';
  color: string;
  emoji: string;
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const SCHEDULE: { [key: string]: DaySchedule[] } = {
  Mon: [
    { id: '1', time: '09:00 - 10:30', title: 'Advanced Algorithms', lecturer: 'Dr. Smith', room: 'CS Lab 3', type: 'lab', color: '#8b5cf6', emoji: '💻' },
    { id: '2', time: '11:00 - 12:30', title: 'Data Structures', lecturer: 'Prof. Johnson', room: 'Room 201', type: 'lecture', color: '#3b82f6', emoji: '📚' },
    { id: '3', time: '14:00 - 15:30', title: 'Web Development', lecturer: 'Dr. Chen', room: 'CS Lab 1', type: 'lab', color: '#10b981', emoji: '🌐' },
  ],
  Tue: [
    { id: '4', time: '10:00 - 11:30', title: 'Database Systems', lecturer: 'Dr. Williams', room: 'Room 305', type: 'lecture', color: '#f59e0b', emoji: '🗄️' },
    { id: '5', time: '13:00 - 14:30', title: 'Software Engineering', lecturer: 'Prof. Davis', room: 'Room 102', type: 'seminar', color: '#ec4899', emoji: '⚙️' },
  ],
  Wed: [
    { id: '6', time: '09:00 - 10:30', title: 'Machine Learning', lecturer: 'Dr. Martinez', room: 'CS Lab 2', type: 'lab', color: '#06b6d4', emoji: '🤖' },
    { id: '7', time: '11:00 - 12:00', title: 'Ethics in Tech', lecturer: 'Prof. Anderson', room: 'Lecture Hall A', type: 'lecture', color: '#8b5cf6', emoji: '⚖️' },
    { id: '8', time: '14:00 - 15:30', title: 'Tutorial Session', lecturer: 'TA: Sarah Lee', room: 'Room 201', type: 'tutorial', color: '#f59e0b', emoji: '✏️' },
  ],
  Thu: [
    { id: '9', time: '10:00 - 11:30', title: 'Mobile App Dev', lecturer: 'Dr. Taylor', room: 'CS Lab 3', type: 'lab', color: '#10b981', emoji: '📱' },
    { id: '10', time: '13:00 - 14:30', title: 'Computer Networks', lecturer: 'Prof. Brown', room: 'Room 204', type: 'lecture', color: '#3b82f6', emoji: '🌐' },
  ],
  Fri: [
    { id: '11', time: '09:00 - 10:30', title: 'Cloud Computing', lecturer: 'Dr. Wilson', room: 'Room 301', type: 'lecture', color: '#06b6d4', emoji: '☁️' },
    { id: '12', time: '11:00 - 12:30', title: 'Project Workshop', lecturer: 'All Staff', room: 'Innovation Lab', type: 'seminar', color: '#ec4899', emoji: '🚀' },
  ],
};

export default function Timetable() {
  const insets = useSafeAreaInsets();
  const [selectedDay, setSelectedDay] = useState('Mon');
  const todayClasses = SCHEDULE[selectedDay] || [];

  const handleClassPress = (classItem: DaySchedule) => {
    Alert.alert(
      `${classItem.emoji} ${classItem.title}`,
      `📍 ${classItem.room}\n👨‍🏫 ${classItem.lecturer}\n⏰ ${classItem.time}\n\n📝 ${classItem.type.charAt(0).toUpperCase() + classItem.type.slice(1)}`,
      [
        { text: 'Set Reminder', onPress: () => Alert.alert('Reminder Set! 🔔', `We'll remind you 10 mins before ${classItem.title}`) },
        { text: 'View Location', onPress: () => Alert.alert('Map 🗺️', `Opening directions to ${classItem.room}...`) },
        { text: 'Close' }
      ]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lecture': return 'school';
      case 'lab': return 'laptop';
      case 'tutorial': return 'edit';
      case 'seminar': return 'groups';
      default: return 'event';
    }
  };

  const getTotalHours = () => {
    let total = 0;
    Object.values(SCHEDULE).forEach(day => {
      total += day.length * 1.5; // Each class is 1.5 hours
    });
    return total;
  };

  return (
    <View style={[styles.page, { paddingTop: insets.top }]}>
      {/* Header */}
      <LinearGradient colors={['#0D1140', '#1a1f5c']} style={styles.header}>
        <Text style={styles.headerTitle}>📅 My Schedule</Text>
        <Text style={styles.headerSubtitle}>stay on top of your game ✨</Text>
      </LinearGradient>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{todayClasses.length}</Text>
          <Text style={styles.statLabel}>classes today</Text>
          <Text style={styles.statEmoji}>📚</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{getTotalHours()}h</Text>
          <Text style={styles.statLabel}>this week</Text>
          <Text style={styles.statEmoji}>⏰</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>days/week</Text>
          <Text style={styles.statEmoji}>📆</Text>
        </View>
      </View>

      {/* Day Selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.daySelector}>
        {DAYS.map(day => (
          <TouchableOpacity
            key={day}
            style={[styles.dayButton, selectedDay === day && styles.dayButtonActive]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={[styles.dayText, selectedDay === day && styles.dayTextActive]}>{day}</Text>
            <View style={[styles.dayDot, selectedDay === day && styles.dayDotActive]} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Classes List */}
      <ScrollView style={styles.classList} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        {todayClasses.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🎉</Text>
            <Text style={styles.emptyText}>no classes today!</Text>
            <Text style={styles.emptySubtext}>time to chill and catch up 🍿</Text>
          </View>
        ) : (
          todayClasses.map((classItem, index) => (
            <TouchableOpacity
              key={classItem.id}
              style={[styles.classCard, { borderLeftColor: classItem.color, borderLeftWidth: 4 }]}
              onPress={() => handleClassPress(classItem)}
              activeOpacity={0.7}
            >
              <View style={styles.classHeader}>
                <View style={[styles.classIcon, { backgroundColor: classItem.color + '20' }]}>
                  <MaterialIcons name={getTypeIcon(classItem.type) as any} size={24} color={classItem.color} />
                </View>
                <View style={styles.classInfo}>
                  <View style={styles.classTitleRow}>
                    <Text style={styles.classEmoji}>{classItem.emoji}</Text>
                    <Text style={styles.classTitle}>{classItem.title}</Text>
                  </View>
                  <Text style={styles.classLecturer}>👨‍🏫 {classItem.lecturer}</Text>
                </View>
              </View>
              <View style={styles.classDetails}>
                <View style={styles.classDetailItem}>
                  <MaterialIcons name="access-time" size={16} color="#9aa0c7" />
                  <Text style={styles.classDetailText}>{classItem.time}</Text>
                </View>
                <View style={styles.classDetailItem}>
                  <MaterialIcons name="location-on" size={16} color="#9aa0c7" />
                  <Text style={styles.classDetailText}>{classItem.room}</Text>
                </View>
              </View>
              <View style={[styles.classTypeBadge, { backgroundColor: classItem.color + '20' }]}>
                <Text style={[styles.classTypeText, { color: classItem.color }]}>
                  {classItem.type}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  header: { paddingVertical: 24, paddingHorizontal: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: '#fff', opacity: 0.9 },
  
  statsContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 16, gap: 12 },
  statCard: { flex: 1, backgroundColor: '#f8f9fb', borderRadius: 16, padding: 16, alignItems: 'center', position: 'relative' },
  statNumber: { fontSize: 24, fontWeight: '800', color: '#0D1140', marginBottom: 4 },
  statLabel: { fontSize: 11, color: '#6b7280', textAlign: 'center' },
  statEmoji: { fontSize: 20, position: 'absolute', top: 8, right: 8 },

  daySelector: { paddingHorizontal: 16, paddingVertical: 12, maxHeight: 60 },
  dayButton: { paddingHorizontal: 20, paddingVertical: 12, marginRight: 8, borderRadius: 20, backgroundColor: '#f8f9fb', alignItems: 'center', minWidth: 70 },
  dayButtonActive: { backgroundColor: '#0D1140' },
  dayText: { fontSize: 15, fontWeight: '700', color: '#6b7280', marginBottom: 4 },
  dayTextActive: { color: '#fff' },
  dayDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'transparent' },
  dayDotActive: { backgroundColor: '#8b5cf6' },

  classList: { flex: 1, paddingHorizontal: 16 },
  classCard: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  classHeader: { flexDirection: 'row', marginBottom: 12 },
  classIcon: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  classInfo: { flex: 1 },
  classTitleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  classEmoji: { fontSize: 18, marginRight: 8 },
  classTitle: { fontSize: 17, fontWeight: '700', color: '#0D1140', flex: 1 },
  classLecturer: { fontSize: 13, color: '#6b7280' },
  classDetails: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  classDetailItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  classDetailText: { fontSize: 13, color: '#6b7280' },
  classTypeBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  classTypeText: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },

  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyEmoji: { fontSize: 64, marginBottom: 16 },
  emptyText: { fontSize: 20, fontWeight: '700', color: '#0D1140', marginBottom: 8 },
  emptySubtext: { fontSize: 14, color: '#6b7280' },
});

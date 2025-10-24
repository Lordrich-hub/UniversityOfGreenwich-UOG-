import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
  building: string;
  description: string;
  credits: number;
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const WEEKS = ['This Week', 'Next Week', 'Week After'];

const SCHEDULE: { [key: string]: DaySchedule[] } = {
  Mon: [
    { id: '1', time: '09:00 - 10:30', title: 'Advanced Algorithms', lecturer: 'Dr. Smith', room: 'CS Lab 3', building: 'Stockwell Street Building', type: 'lab', color: '#8b5cf6', emoji: '💻', description: 'Learn advanced algorithm design and analysis techniques', credits: 15 },
    { id: '2', time: '11:00 - 12:30', title: 'Data Structures', lecturer: 'Prof. Johnson', room: 'Room 201', building: 'Queen Anne Building', type: 'lecture', color: '#3b82f6', emoji: '📚', description: 'Study fundamental data structures and their applications', credits: 15 },
    { id: '3', time: '14:00 - 15:30', title: 'Web Development', lecturer: 'Dr. Chen', room: 'CS Lab 1', building: 'Stockwell Street Building', type: 'lab', color: '#10b981', emoji: '🌐', description: 'Build modern web applications with latest technologies', credits: 15 },
  ],
  Tue: [
    { id: '4', time: '10:00 - 11:30', title: 'Database Systems', lecturer: 'Dr. Williams', room: 'Room 305', building: 'Queen Anne Building', type: 'lecture', color: '#f59e0b', emoji: '🗄️', description: 'Database design, SQL, and management systems', credits: 15 },
    { id: '5', time: '13:00 - 14:30', title: 'Software Engineering', lecturer: 'Prof. Davis', room: 'Room 102', building: 'Dreadnought Building', type: 'seminar', color: '#ec4899', emoji: '⚙️', description: 'Software development methodologies and practices', credits: 15 },
  ],
  Wed: [
    { id: '6', time: '09:00 - 10:30', title: 'Machine Learning', lecturer: 'Dr. Martinez', room: 'CS Lab 2', building: 'Stockwell Street Building', type: 'lab', color: '#06b6d4', emoji: '🤖', description: 'Introduction to ML algorithms and neural networks', credits: 20 },
    { id: '7', time: '11:00 - 12:00', title: 'Ethics in Tech', lecturer: 'Prof. Anderson', room: 'Lecture Hall A', building: 'Queen Anne Building', type: 'lecture', color: '#8b5cf6', emoji: '⚖️', description: 'Ethical considerations in technology and AI', credits: 10 },
    { id: '8', time: '14:00 - 15:30', title: 'Tutorial Session', lecturer: 'TA: Sarah Lee', room: 'Room 201', building: 'Queen Anne Building', type: 'tutorial', color: '#f59e0b', emoji: '✏️', description: 'Weekly tutorial for assignment help', credits: 0 },
  ],
  Thu: [
    { id: '9', time: '10:00 - 11:30', title: 'Mobile App Dev', lecturer: 'Dr. Taylor', room: 'CS Lab 3', building: 'Stockwell Street Building', type: 'lab', color: '#10b981', emoji: '📱', description: 'Develop iOS and Android applications', credits: 15 },
    { id: '10', time: '13:00 - 14:30', title: 'Computer Networks', lecturer: 'Prof. Brown', room: 'Room 204', building: 'Dreadnought Building', type: 'lecture', color: '#3b82f6', emoji: '🌐', description: 'Networking protocols and infrastructure', credits: 15 },
  ],
  Fri: [
    { id: '11', time: '09:00 - 10:30', title: 'Cloud Computing', lecturer: 'Dr. Wilson', room: 'Room 301', building: 'Queen Anne Building', type: 'lecture', color: '#06b6d4', emoji: '☁️', description: 'Cloud platforms, services, and deployment', credits: 15 },
    { id: '12', time: '11:00 - 12:30', title: 'Project Workshop', lecturer: 'All Staff', room: 'Innovation Lab', building: 'Stockwell Street Building', type: 'seminar', color: '#ec4899', emoji: '🚀', description: 'Collaborative project development session', credits: 0 },
  ],
};

export default function Timetable() {
  const insets = useSafeAreaInsets();
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [selectedWeek, setSelectedWeek] = useState('This Week');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<DaySchedule | null>(null);
  const todayClasses = SCHEDULE[selectedDay] || [];

  const handleClassPress = (classItem: DaySchedule) => {
    setSelectedClass(classItem);
    setShowDetailModal(true);
  };

  const openMaps = (room: string, building: string) => {
    // University of Greenwich coordinates
    const coords = '51.4826,-0.0077';
    const query = `University+of+Greenwich+${building.replace(/ /g, '+')}+${room.replace(/ /g, '+')}`;
    const url = `https://www.google.com/maps/search/?api=1&query=${query}&center=${coords}`;
    Linking.openURL(url);
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
      total += day.length * 1.5;
    });
    return total;
  };

  return (
    <View style={styles.page}>
      {/* Header with dark blue background that extends to top */}
      <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
        <LinearGradient colors={['#0D1140', '#1a1f5c']} style={styles.header}>
          <Text style={styles.headerTitle}>📅 My Schedule</Text>
          <Text style={styles.headerSubtitle}>stay on top of your game ✨</Text>
        </LinearGradient>
      </View>

      {/* White Content Area */}
      <View style={styles.content}>
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

        {/* Week Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekSelector}>
          {WEEKS.map(week => (
            <TouchableOpacity
              key={week}
              style={[styles.weekButton, selectedWeek === week && styles.weekButtonActive]}
              onPress={() => setSelectedWeek(week)}
            >
              <Text style={[styles.weekText, selectedWeek === week && styles.weekTextActive]}>
                {week}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

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
            todayClasses.map((classItem) => (
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

      {/* Class Detail Modal */}
      <Modal
        visible={showDetailModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDetailModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedClass && (
              <>
                <View style={styles.modalHeader}>
                  <View style={[styles.modalIcon, { backgroundColor: selectedClass.color }]}>
                    <Text style={styles.modalEmoji}>{selectedClass.emoji}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowDetailModal(false)}
                  >
                    <MaterialIcons name="close" size={24} color="#0D1140" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalTitle}>{selectedClass.title}</Text>
                <View style={[styles.modalTypeBadge, { backgroundColor: selectedClass.color + '20' }]}>
                  <Text style={[styles.modalTypeText, { color: selectedClass.color }]}>
                    {selectedClass.type}
                  </Text>
                </View>

                <Text style={styles.modalDescription}>{selectedClass.description}</Text>

                <View style={styles.modalInfoSection}>
                  <View style={styles.modalInfoRow}>
                    <MaterialIcons name="access-time" size={20} color="#6b7280" />
                    <View style={styles.modalInfoTextContainer}>
                      <Text style={styles.modalInfoLabel}>Time</Text>
                      <Text style={styles.modalInfoText}>{selectedClass.time}</Text>
                    </View>
                  </View>

                  <View style={styles.modalInfoRow}>
                    <MaterialIcons name="person" size={20} color="#6b7280" />
                    <View style={styles.modalInfoTextContainer}>
                      <Text style={styles.modalInfoLabel}>Lecturer</Text>
                      <Text style={styles.modalInfoText}>{selectedClass.lecturer}</Text>
                    </View>
                  </View>

                  <View style={styles.modalInfoRow}>
                    <MaterialIcons name="location-on" size={20} color="#6b7280" />
                    <View style={styles.modalInfoTextContainer}>
                      <Text style={styles.modalInfoLabel}>Location</Text>
                      <Text style={styles.modalInfoText}>{selectedClass.room}</Text>
                      <Text style={styles.modalInfoSubtext}>{selectedClass.building}</Text>
                    </View>
                  </View>

                  <View style={styles.modalInfoRow}>
                    <MaterialIcons name="stars" size={20} color="#6b7280" />
                    <View style={styles.modalInfoTextContainer}>
                      <Text style={styles.modalInfoLabel}>Credits</Text>
                      <Text style={styles.modalInfoText}>{selectedClass.credits} credits</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.mapButton, { backgroundColor: selectedClass.color }]}
                  onPress={() => {
                    setShowDetailModal(false);
                    openMaps(selectedClass.room, selectedClass.building);
                  }}
                >
                  <MaterialIcons name="map" size={20} color="#fff" />
                  <Text style={styles.mapButtonText}>Open in Maps</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.reminderButton}
                  onPress={() => {
                    setShowDetailModal(false);
                    Alert.alert('Reminder Set! 🔔', `We'll remind you 10 mins before ${selectedClass.title}`);
                  }}
                >
                  <MaterialIcons name="notifications" size={20} color="#0D1140" />
                  <Text style={styles.reminderButtonText}>Set Reminder</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#0D1140' },
  headerContainer: { backgroundColor: '#0D1140' },
  header: { paddingVertical: 24, paddingHorizontal: 20 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: '#fff', opacity: 0.9 },
  
  content: { flex: 1, backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -24 },
  
  statsContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 24, paddingBottom: 8, gap: 12 },
  statCard: { flex: 1, backgroundColor: '#f8f9fb', borderRadius: 16, padding: 16, alignItems: 'center', position: 'relative' },
  statNumber: { fontSize: 24, fontWeight: '800', color: '#0D1140', marginBottom: 4 },
  statLabel: { fontSize: 11, color: '#6b7280', textAlign: 'center' },
  statEmoji: { fontSize: 20, position: 'absolute', top: 8, right: 8 },

  weekSelector: { paddingHorizontal: 16, paddingVertical: 12, maxHeight: 56 },
  weekButton: { paddingHorizontal: 20, paddingVertical: 10, marginRight: 8, borderRadius: 16, backgroundColor: '#f8f9fb' },
  weekButtonActive: { backgroundColor: '#0D1140' },
  weekText: { fontSize: 14, fontWeight: '600', color: '#6b7280' },
  weekTextActive: { color: '#fff' },

  daySelector: { paddingHorizontal: 16, paddingVertical: 8, maxHeight: 60 },
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

  modalOverlay: { flex: 1, backgroundColor: 'rgba(13,17,64,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '90%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalIcon: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  modalEmoji: { fontSize: 32 },
  closeButton: { padding: 8 },
  modalTitle: { fontSize: 24, fontWeight: '800', color: '#0D1140', marginBottom: 12 },
  modalTypeBadge: { alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16, marginBottom: 16 },
  modalTypeText: { fontSize: 13, fontWeight: '700', textTransform: 'uppercase' },
  modalDescription: { fontSize: 15, color: '#6b7280', marginBottom: 24, lineHeight: 22 },
  modalInfoSection: { marginBottom: 24, gap: 16 },
  modalInfoRow: { flexDirection: 'row', gap: 12 },
  modalInfoTextContainer: { flex: 1 },
  modalInfoLabel: { fontSize: 12, fontWeight: '600', color: '#9aa0c7', marginBottom: 4 },
  modalInfoText: { fontSize: 15, fontWeight: '600', color: '#0D1140' },
  modalInfoSubtext: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  mapButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 16, marginBottom: 12 },
  mapButtonText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  reminderButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 16, backgroundColor: '#f8f9fb' },
  reminderButtonText: { fontSize: 16, fontWeight: '700', color: '#0D1140' },
});

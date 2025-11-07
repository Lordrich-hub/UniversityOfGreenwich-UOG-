import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
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
  latitude: number;
  longitude: number;
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const WEEKS = ['This Week', 'Next Week', 'Week After'];

// Schedules for different weeks
const THIS_WEEK_SCHEDULE: { [key: string]: DaySchedule[] } = {
  Mon: [
    { id: '1', time: '09:00 - 10:30', title: 'Advanced Algorithms', lecturer: 'Dr. Smith', room: 'CS Lab 3', building: 'Stockwell Street', type: 'lab', color: '#8b5cf6', emoji: '💻', description: 'Learn advanced algorithm design and analysis techniques', credits: 15, latitude: 51.4834, longitude: -0.0067 },
    { id: '2', time: '11:00 - 12:30', title: 'Data Structures', lecturer: 'Prof. Johnson', room: 'Room 201', building: 'Queen Anne', type: 'lecture', color: '#3b82f6', emoji: '📚', description: 'Study fundamental data structures and their applications', credits: 15, latitude: 51.4826, longitude: -0.0077 },
    { id: '3', time: '14:00 - 15:30', title: 'Web Development', lecturer: 'Dr. Chen', room: 'CS Lab 1', building: 'Stockwell Street', type: 'lab', color: '#10b981', emoji: '🌐', description: 'Build modern web applications with latest technologies', credits: 15, latitude: 51.4834, longitude: -0.0067 },
  ],
  Tue: [
    { id: '4', time: '10:00 - 11:30', title: 'Database Systems', lecturer: 'Dr. Williams', room: 'Room 305', building: 'Queen Anne', type: 'lecture', color: '#f59e0b', emoji: '🗄️', description: 'Database design, SQL, and management systems', credits: 15, latitude: 51.4826, longitude: -0.0077 },
    { id: '5', time: '13:00 - 14:30', title: 'Software Engineering', lecturer: 'Prof. Davis', room: 'Room 102', building: 'Dreadnought', type: 'seminar', color: '#ec4899', emoji: '⚙️', description: 'Software development methodologies and practices', credits: 15, latitude: 51.4829, longitude: -0.0071 },
  ],
  Wed: [
    { id: '6', time: '09:00 - 10:30', title: 'Machine Learning', lecturer: 'Dr. Martinez', room: 'CS Lab 2', building: 'Stockwell Street', type: 'lab', color: '#06b6d4', emoji: '🤖', description: 'Introduction to ML algorithms and neural networks', credits: 20, latitude: 51.4834, longitude: -0.0067 },
    { id: '7', time: '11:00 - 12:00', title: 'Ethics in Tech', lecturer: 'Prof. Anderson', room: 'Lecture Hall A', building: 'Queen Anne', type: 'lecture', color: '#8b5cf6', emoji: '⚖️', description: 'Ethical considerations in technology and AI', credits: 10, latitude: 51.4826, longitude: -0.0077 },
    { id: '8', time: '14:00 - 15:30', title: 'Tutorial Session', lecturer: 'TA: Sarah Lee', room: 'Room 201', building: 'Queen Anne', type: 'tutorial', color: '#f59e0b', emoji: '✏️', description: 'Weekly tutorial for assignment help', credits: 0, latitude: 51.4826, longitude: -0.0077 },
  ],
  Thu: [
    { id: '9', time: '10:00 - 11:30', title: 'Mobile App Dev', lecturer: 'Dr. Taylor', room: 'CS Lab 3', building: 'Stockwell Street', type: 'lab', color: '#10b981', emoji: '📱', description: 'Develop iOS and Android applications', credits: 15, latitude: 51.4834, longitude: -0.0067 },
    { id: '10', time: '13:00 - 14:30', title: 'Computer Networks', lecturer: 'Prof. Brown', room: 'Room 204', building: 'Dreadnought', type: 'lecture', color: '#3b82f6', emoji: '🌐', description: 'Networking protocols and infrastructure', credits: 15, latitude: 51.4829, longitude: -0.0071 },
  ],
  Fri: [
    { id: '11', time: '09:00 - 10:30', title: 'Cloud Computing', lecturer: 'Dr. Wilson', room: 'Room 301', building: 'Queen Anne', type: 'lecture', color: '#06b6d4', emoji: '☁️', description: 'Cloud platforms, services, and deployment', credits: 15, latitude: 51.4826, longitude: -0.0077 },
    { id: '12', time: '11:00 - 12:30', title: 'Project Workshop', lecturer: 'All Staff', room: 'Innovation Lab', building: 'Stockwell Street', type: 'seminar', color: '#ec4899', emoji: '🚀', description: 'Collaborative project development session', credits: 0, latitude: 51.4834, longitude: -0.0067 },
  ],
};

const NEXT_WEEK_SCHEDULE: { [key: string]: DaySchedule[] } = {
  Mon: [
    { id: 'n1', time: '09:00 - 10:30', title: 'AI & Robotics', lecturer: 'Dr. Zhang', room: 'CS Lab 2', building: 'Stockwell Street', type: 'lab', color: '#ec4899', emoji: '🤖', description: 'Introduction to AI and robotics systems', credits: 15, latitude: 51.4834, longitude: -0.0067 },
    { id: 'n2', time: '11:00 - 12:30', title: 'Systems Design', lecturer: 'Prof. Lee', room: 'Room 305', building: 'Queen Anne', type: 'lecture', color: '#f59e0b', emoji: '⚙️', description: 'Learn system architecture and design patterns', credits: 15, latitude: 51.4826, longitude: -0.0077 },
  ],
  Tue: [
    { id: 'n3', time: '10:00 - 11:30', title: 'Cybersecurity', lecturer: 'Dr. Parker', room: 'Room 201', building: 'Queen Anne', type: 'lecture', color: '#8b5cf6', emoji: '🔒', description: 'Network security and ethical hacking', credits: 15, latitude: 51.4826, longitude: -0.0077 },
    { id: 'n4', time: '14:00 - 15:30', title: 'Blockchain Tech', lecturer: 'Prof. Kim', room: 'CS Lab 1', building: 'Stockwell Street', type: 'lab', color: '#06b6d4', emoji: '⛓️', description: 'Decentralized applications and smart contracts', credits: 15, latitude: 51.4834, longitude: -0.0067 },
  ],
  Wed: [
    { id: 'n5', time: '09:00 - 10:30', title: 'Game Development', lecturer: 'Dr. Ross', room: 'Room 102', building: 'Dreadnought', type: 'lab', color: '#10b981', emoji: '🎮', description: 'Create interactive games with Unity', credits: 20, latitude: 51.4829, longitude: -0.0071 },
    { id: 'n6', time: '13:00 - 14:30', title: 'UI/UX Design', lecturer: 'Prof. Chen', room: 'Room 204', building: 'Dreadnought', type: 'seminar', color: '#ec4899', emoji: '🎨', description: 'User interface and experience principles', credits: 10, latitude: 51.4829, longitude: -0.0071 },
  ],
  Thu: [
    { id: 'n7', time: '10:00 - 11:30', title: 'DevOps Practice', lecturer: 'Dr. Taylor', room: 'CS Lab 3', building: 'Stockwell Street', type: 'lab', color: '#3b82f6', emoji: '⚡', description: 'CI/CD pipelines and deployment automation', credits: 15, latitude: 51.4834, longitude: -0.0067 },
  ],
  Fri: [
    { id: 'n8', time: '09:00 - 10:30', title: 'Data Analytics', lecturer: 'Prof. Martinez', room: 'Room 301', building: 'Queen Anne', type: 'lecture', color: '#f59e0b', emoji: '📊', description: 'Big data processing and visualization', credits: 15, latitude: 51.4826, longitude: -0.0077 },
    { id: 'n9', time: '11:00 - 12:30', title: 'Project Sprint', lecturer: 'All Staff', room: 'Innovation Lab', building: 'Stockwell Street', type: 'seminar', color: '#8b5cf6', emoji: '🚀', description: 'Agile development sprint session', credits: 0, latitude: 51.4834, longitude: -0.0067 },
  ],
};

const WEEK_AFTER_SCHEDULE: { [key: string]: DaySchedule[] } = {
  Mon: [
    { id: 'w1', time: '09:00 - 10:30', title: 'Quantum Computing', lecturer: 'Dr. White', room: 'Room 305', building: 'Queen Anne', type: 'lecture', color: '#06b6d4', emoji: '⚛️', description: 'Introduction to quantum algorithms', credits: 20, latitude: 51.4826, longitude: -0.0077 },
    { id: 'w2', time: '14:00 - 15:30', title: 'AR/VR Development', lecturer: 'Prof. Black', room: 'CS Lab 2', building: 'Stockwell Street', type: 'lab', color: '#ec4899', emoji: '🥽', description: 'Augmented and virtual reality applications', credits: 15, latitude: 51.4834, longitude: -0.0067 },
  ],
  Tue: [
    { id: 'w3', time: '10:00 - 11:30', title: 'IoT Systems', lecturer: 'Dr. Green', room: 'Room 102', building: 'Dreadnought', type: 'lecture', color: '#10b981', emoji: '📡', description: 'Internet of Things and sensor networks', credits: 15, latitude: 51.4829, longitude: -0.0071 },
  ],
  Wed: [
    { id: 'w4', time: '09:00 - 10:30', title: 'Cloud Architecture', lecturer: 'Prof. Blue', room: 'Room 201', building: 'Queen Anne', type: 'lecture', color: '#3b82f6', emoji: '☁️', description: 'Advanced cloud design patterns', credits: 15, latitude: 51.4826, longitude: -0.0077 },
    { id: 'w5', time: '11:00 - 12:00', title: 'Research Methods', lecturer: 'Dr. Gray', room: 'Lecture Hall A', building: 'Queen Anne', type: 'seminar', color: '#f59e0b', emoji: '📝', description: 'Academic research methodologies', credits: 10, latitude: 51.4826, longitude: -0.0077 },
  ],
  Thu: [
    { id: 'w6', time: '10:00 - 11:30', title: 'Microservices', lecturer: 'Dr. Brown', room: 'CS Lab 1', building: 'Stockwell Street', type: 'lab', color: '#8b5cf6', emoji: '🔧', description: 'Microservices architecture patterns', credits: 15, latitude: 51.4834, longitude: -0.0067 },
    { id: 'w7', time: '13:00 - 14:30', title: '5G Networks', lecturer: 'Prof. Silver', room: 'Room 204', building: 'Dreadnought', type: 'lecture', color: '#06b6d4', emoji: '📶', description: 'Next generation wireless networks', credits: 15, latitude: 51.4829, longitude: -0.0071 },
  ],
  Fri: [
    { id: 'w8', time: '09:00 - 10:30', title: 'Final Review', lecturer: 'All Staff', room: 'Innovation Lab', building: 'Stockwell Street', type: 'seminar', color: '#10b981', emoji: '✅', description: 'Exam preparation and Q&A', credits: 0, latitude: 51.4834, longitude: -0.0067 },
  ],
};

export default function Timetable() {
  const insets = useSafeAreaInsets();
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [selectedWeek, setSelectedWeek] = useState('This Week');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState<DaySchedule | null>(null);
  
  // Get schedule based on selected week
  const getFilteredSchedule = () => {
    switch (selectedWeek) {
      case 'This Week':
        return THIS_WEEK_SCHEDULE;
      case 'Next Week':
        return NEXT_WEEK_SCHEDULE;
      case 'Week After':
        return WEEK_AFTER_SCHEDULE;
      default:
        return THIS_WEEK_SCHEDULE;
    }
  };
  
  const todayClasses = getFilteredSchedule()[selectedDay] || [];

  const handleClassPress = (classItem: DaySchedule) => {
    setSelectedClass(classItem);
    setShowDetailModal(true);
  };

  const openMap = () => {
    setShowDetailModal(false);
    setTimeout(() => setShowMapModal(true), 300);
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
    const schedule = getFilteredSchedule();
    Object.values(schedule).forEach(day => {
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

        {/* Week Selector - Highly Visible */}
        <View style={styles.weekSelectorContainer}>
          <Text style={styles.weekSelectorLabel}>📅 Select Week</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekSelector}>
            {WEEKS.map(week => (
              <TouchableOpacity
                key={week}
                style={[styles.weekButton, selectedWeek === week && styles.weekButtonActive]}
                onPress={() => setSelectedWeek(week)}
                activeOpacity={0.7}
              >
                <Text style={[styles.weekText, selectedWeek === week && styles.weekTextActive]}>
                  {week}
                </Text>
                {selectedWeek === week && <View style={styles.weekButtonIndicator} />}
              </TouchableOpacity>
            ))}
          </ScrollView>
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
        <ScrollView 
          style={styles.classList} 
          contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}
          showsVerticalScrollIndicator={false}
        >
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
                  onPress={openMap}
                >
                  <MaterialIcons name="map" size={20} color="#fff" />
                  <Text style={styles.mapButtonText}>View on Map</Text>
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

      {/* Live Map Modal with Google Maps */}
      <Modal
        visible={showMapModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowMapModal(false)}
      >
        <View style={styles.mapModalOverlay}>
          <View style={styles.mapModalContent}>
            {selectedClass && (
              <>
                <View style={styles.mapModalHeader}>
                  <View style={styles.mapHeaderLeft}>
                    <MaterialIcons name="place" size={28} color="#ea4335" />
                    <View>
                      <Text style={styles.mapModalTitle}>{selectedClass.building}</Text>
                      <Text style={styles.mapModalSubtitle}>📍 {selectedClass.room}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.mapCloseButton}
                    onPress={() => setShowMapModal(false)}
                  >
                    <MaterialIcons name="close" size={28} color="#0D1140" />
                  </TouchableOpacity>
                </View>

                {/* Real Google Maps */}
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  initialRegion={{
                    latitude: selectedClass.latitude,
                    longitude: selectedClass.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: selectedClass.latitude,
                      longitude: selectedClass.longitude,
                    }}
                    title={selectedClass.building}
                    description={`${selectedClass.room} - ${selectedClass.title}`}
                    pinColor={selectedClass.color}
                  />
                </MapView>

                <View style={styles.mapFooter}>
                  <MaterialIcons name="location-city" size={20} color="#6b7280" />
                  <Text style={styles.mapFooterText}>
                    University of Greenwich • Maritime Greenwich Campus
                  </Text>
                </View>
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

  weekSelectorContainer: { 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#e5e7eb',
  },
  weekSelectorLabel: { 
    fontSize: 16, 
    fontWeight: '800', 
    color: '#0D1140', 
    marginBottom: 12,
  },
  weekSelector: { maxHeight: 70 },
  weekButton: { 
    paddingHorizontal: 18, 
    paddingVertical: 12, 
    marginRight: 10, 
    borderRadius: 20, 
    backgroundColor: '#f8f9fb',
    borderWidth: 2,
    borderColor: '#0D1140',
    minWidth: 100,
    alignItems: 'center',
    position: 'relative',
  },
  weekButtonActive: { 
    backgroundColor: '#0D1140',
    borderColor: '#0D1140',
  },
  weekText: { fontSize: 14, fontWeight: '700', color: '#0D1140' },
  weekTextActive: { color: '#fff' },
  weekButtonIndicator: {
    position: 'absolute',
    bottom: -2,
    left: '25%',
    right: '25%',
    height: 3,
    backgroundColor: '#8b5cf6',
    borderRadius: 2,
  },

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

  // Map Modal Styles
  mapModalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)' },
  mapModalContent: { flex: 1, backgroundColor: '#fff', marginTop: 50, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  mapModalHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderBottomColor: '#e0e0e0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  mapHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  mapModalTitle: { fontSize: 18, fontWeight: '700', color: '#0D1140' },
  mapModalSubtitle: { fontSize: 13, color: '#5f6368', marginTop: 2 },
  mapCloseButton: { padding: 8, backgroundColor: '#f1f3f4', borderRadius: 20 },
  
  // Google Maps
  map: { flex: 1 },
  
  // Map Footer
  mapFooter: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12, 
    padding: 16, 
    backgroundColor: '#f8f9fa', 
    borderTopWidth: 1, 
    borderTopColor: '#e0e0e0',
  },
  mapFooterText: { fontSize: 13, color: '#5f6368', flex: 1 },
});

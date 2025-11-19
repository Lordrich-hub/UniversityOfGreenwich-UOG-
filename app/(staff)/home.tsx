import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function StaffHome() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const quickActions = [
    { id: '1', icon: 'qr-code-scanner', label: 'Mark Attendance', route: '/(staff)/scan' },
    { id: '2', icon: 'campaign', label: 'Create Announcement', route: '/(staff)/announcements' },
    { id: '3', icon: 'add-circle', label: 'Add Class', route: '/(staff)/classes' },
    { id: '4', icon: 'analytics', label: 'View Reports', route: null },
  ];

  const upcomingClasses = [
    { id: '1', module: 'Computer Science 101', time: '09:00 AM', room: 'Room 204', students: 45 },
    { id: '2', module: 'Data Structures', time: '11:30 AM', room: 'Lab 3', students: 38 },
    { id: '3', module: 'Web Development', time: '02:00 PM', room: 'Room 305', students: 42 },
  ];

  return (
    <View style={styles.page}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}> 
        <View style={styles.headerLeft}>
          <Image
            source={require('../../assets/images/uog_logo.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity 
          style={styles.profileButton} 
          onPress={() => router.push('/(staff)/profile')}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>S</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome, Dr. Staff</Text>
          <Text style={styles.welcomeSubtitle}>University of Greenwich</Text>
        </View>

        {/* White background content area */}
        <View style={styles.whiteSection}>
          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              {quickActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={styles.actionCard}
                  onPress={() => action.route ? router.push(action.route as any) : alert('Coming soon')}
                >
                  <View style={styles.actionIconWrap}>
                    <MaterialIcons name={action.icon as any} size={28} color="#fff" />
                  </View>
                  <Text style={styles.actionLabel}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Today's Schedule */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>
            {upcomingClasses.map((cls) => (
              <TouchableOpacity key={cls.id} style={styles.classCard}>
                <View style={styles.classTime}>
                  <MaterialIcons name="schedule" size={20} color="#3b4a9e" />
                  <Text style={styles.classTimeText}>{cls.time}</Text>
                </View>
                <Text style={styles.classModule}>{cls.module}</Text>
                <View style={styles.classDetails}>
                  <View style={styles.classDetail}>
                    <MaterialIcons name="room" size={16} color="#6b7280" />
                    <Text style={styles.classDetailText}>{cls.room}</Text>
                  </View>
                  <View style={styles.classDetail}>
                    <MaterialIcons name="people" size={16} color="#6b7280" />
                    <Text style={styles.classDetailText}>{cls.students} students</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#0D1140' },
  header: { paddingHorizontal: 16, paddingBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerLeft: { flex: 1 },
  headerLogo: { width: 180, height: 40, tintColor: '#fff' },
  profileButton: { width: 44, height: 44 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#3b4a9e', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  content: { flex: 1 },
  welcomeSection: { padding: 24, backgroundColor: '#151a42', marginHorizontal: 16, marginBottom: 24, borderRadius: 16 },
  welcomeTitle: { fontSize: 26, fontWeight: '800', color: '#fff', marginBottom: 4 },
  welcomeSubtitle: { fontSize: 15, color: '#9aa0c7' },
  whiteSection: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingTop: 24, minHeight: '100%' },
  section: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#0D1140', marginBottom: 16 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
  actionCard: { width: '48%', backgroundColor: '#f8f9fb', borderRadius: 16, padding: 16, margin: '1%', alignItems: 'center' },
  actionIconWrap: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#3b4a9e', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  actionLabel: { fontSize: 14, fontWeight: '600', color: '#0D1140', textAlign: 'center' },
  classCard: { backgroundColor: '#f8f9fb', borderRadius: 16, padding: 16, marginBottom: 12 },
  classTime: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  classTimeText: { fontSize: 14, fontWeight: '600', color: '#3b4a9e', marginLeft: 6 },
  classModule: { fontSize: 18, fontWeight: '700', color: '#0D1140', marginBottom: 12 },
  classDetails: { flexDirection: 'row', gap: 16 },
  classDetail: { flexDirection: 'row', alignItems: 'center' },
  classDetailText: { fontSize: 13, color: '#6b7280', marginLeft: 4 },
});

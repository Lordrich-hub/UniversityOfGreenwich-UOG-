import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function StaffAttendance() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const attendanceRecords = [
    { id: '1', className: 'Computer Science 101', date: '2025-11-07', present: 42, absent: 3, total: 45 },
    { id: '2', className: 'Data Structures', date: '2025-11-06', present: 35, absent: 3, total: 38 },
    { id: '3', className: 'Web Development', date: '2025-11-05', present: 40, absent: 2, total: 42 },
  ];

  return (
    <View style={styles.page}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>Attendance</Text>
        <TouchableOpacity 
          style={styles.scanButton} 
          onPress={() => router.push('/(staff)/scan')}
        >
          <MaterialIcons name="qr-code-scanner" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        <View style={styles.whiteSection}>
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Today's Overview</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statLabel}>Classes</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>117</Text>
                <Text style={styles.statLabel}>Present</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>Absent</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>93.6%</Text>
                <Text style={styles.statLabel}>Rate</Text>
              </View>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Recent Records</Text>
          {attendanceRecords.map((record) => (
            <TouchableOpacity key={record.id} style={styles.recordCard}>
              <View style={styles.recordHeader}>
                <Text style={styles.recordClass}>{record.className}</Text>
                <Text style={styles.recordDate}>{record.date}</Text>
              </View>
              <View style={styles.recordStats}>
                <View style={styles.recordStat}>
                  <View style={[styles.recordDot, { backgroundColor: '#4CAF50' }]} />
                  <Text style={styles.recordStatText}>{record.present} Present</Text>
                </View>
                <View style={styles.recordStat}>
                  <View style={[styles.recordDot, { backgroundColor: '#f44336' }]} />
                  <Text style={styles.recordStatText}>{record.absent} Absent</Text>
                </View>
                <View style={styles.recordStat}>
                  <MaterialIcons name="people" size={16} color="#6b7280" />
                  <Text style={styles.recordStatText}>{record.total} Total</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#0D1140' },
  header: { paddingHorizontal: 16, paddingBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff' },
  scanButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1 },
  whiteSection: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingTop: 24, paddingHorizontal: 16, minHeight: '100%' },
  statsCard: { backgroundColor: '#f8f9fb', borderRadius: 16, padding: 20, marginBottom: 24 },
  statsTitle: { fontSize: 18, fontWeight: '700', color: '#0D1140', marginBottom: 16 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '800', color: '#0D1140', marginBottom: 4 },
  statLabel: { fontSize: 12, color: '#6b7280' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0D1140', marginBottom: 12 },
  recordCard: { backgroundColor: '#f8f9fb', borderRadius: 16, padding: 16, marginBottom: 12 },
  recordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  recordClass: { fontSize: 16, fontWeight: '700', color: '#0D1140' },
  recordDate: { fontSize: 13, color: '#6b7280' },
  recordStats: { flexDirection: 'row', gap: 16 },
  recordStat: { flexDirection: 'row', alignItems: 'center' },
  recordDot: { width: 8, height: 8, borderRadius: 4, marginRight: 6 },
  recordStatText: { fontSize: 13, color: '#6b7280', marginLeft: 4 },
});

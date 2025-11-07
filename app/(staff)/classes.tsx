import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function StaffClasses() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const classes = [
    { id: '1', name: 'Computer Science 101', code: 'CS101', students: 45, schedule: 'Mon, Wed, Fri - 09:00 AM' },
    { id: '2', name: 'Data Structures', code: 'CS201', students: 38, schedule: 'Tue, Thu - 11:30 AM' },
    { id: '3', name: 'Web Development', code: 'CS301', students: 42, schedule: 'Mon, Wed - 02:00 PM' },
    { id: '4', name: 'Database Systems', code: 'CS202', students: 35, schedule: 'Tue, Thu - 09:00 AM' },
  ];

  return (
    <View style={styles.page}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>My Classes</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => alert('Add class coming soon')}>
          <MaterialIcons name="add-circle" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        {classes.map((cls) => (
          <TouchableOpacity key={cls.id} style={styles.classCard}>
            <View style={styles.classHeader}>
              <View style={styles.classIconWrap}>
                <MaterialIcons name="class" size={24} color="#fff" />
              </View>
              <View style={styles.classInfo}>
                <Text style={styles.className}>{cls.name}</Text>
                <Text style={styles.classCode}>{cls.code}</Text>
              </View>
            </View>
            <Text style={styles.classSchedule}>{cls.schedule}</Text>
            <View style={styles.classFooter}>
              <View style={styles.classStudents}>
                <MaterialIcons name="people" size={18} color="#8891b8" />
                <Text style={styles.classStudentsText}>{cls.students} students</Text>
              </View>
              <TouchableOpacity style={styles.classAction}>
                <Text style={styles.classActionText}>View Details</Text>
                <MaterialIcons name="chevron-right" size={20} color="#3b4a9e" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#0D1140' },
  header: { paddingHorizontal: 16, paddingBottom: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontSize: 24, fontWeight: '800', color: '#fff' },
  addButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1, paddingHorizontal: 16 },
  classCard: { backgroundColor: '#151a42', borderRadius: 16, padding: 16, marginBottom: 12 },
  classHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  classIconWrap: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#3b4a9e', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  classInfo: { flex: 1 },
  className: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 2 },
  classCode: { fontSize: 13, color: '#8891b8' },
  classSchedule: { fontSize: 14, color: '#9aa0c7', marginBottom: 12 },
  classFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  classStudents: { flexDirection: 'row', alignItems: 'center' },
  classStudentsText: { fontSize: 14, color: '#8891b8', marginLeft: 6 },
  classAction: { flexDirection: 'row', alignItems: 'center' },
  classActionText: { fontSize: 14, fontWeight: '600', color: '#3b4a9e', marginRight: 4 },
});

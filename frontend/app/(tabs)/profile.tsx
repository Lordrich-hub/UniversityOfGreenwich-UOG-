import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../src/store/authStore';
import api from '../../src/utils/api';
import Colors from '../../src/constants/Colors';

interface Grade {
  _id: string;
  name: string;
  grade: string;
  credits: number;
}

interface AttendanceRecord {
  _id: string;
  class_name: string;
  timestamp: string;
}

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [grades, setGrades] = useState<Grade[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [gradesRes, attendanceRes] = await Promise.all([
        api.get('/grades'),
        api.get('/attendance'),
      ]);
      setGrades(gradesRes.data);
      setAttendance(attendanceRes.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/auth/login');
        },
      },
    ]);
  };

  const calculateGPA = () => {
    if (grades.length === 0) return 'N/A';
    const gradePoints: { [key: string]: number } = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D': 1.0, 'F': 0.0
    };
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    grades.forEach(grade => {
      const points = gradePoints[grade.grade] || 0;
      totalPoints += points * grade.credits;
      totalCredits += grade.credits;
    });
    
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 'N/A';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={48} color="white" />
        </View>
        <Text style={styles.name}>{user?.username}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="id-card" size={20} color={Colors.primary} />
          <Text style={styles.infoLabel}>Student ID:</Text>
          <Text style={styles.infoValue}>{user?.student_id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="school" size={20} color={Colors.primary} />
          <Text style={styles.infoLabel}>Course:</Text>
          <Text style={styles.infoValue}>{user?.course}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={20} color={Colors.primary} />
          <Text style={styles.infoLabel}>Year:</Text>
          <Text style={styles.infoValue}>Year {user?.year}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Academic Performance</Text>
        <View style={styles.gpaCard}>
          <Text style={styles.gpaLabel}>GPA</Text>
          <Text style={styles.gpaValue}>{calculateGPA()}</Text>
        </View>
        
        {loading ? (
          <ActivityIndicator size="small" color={Colors.primary} style={{ marginTop: 16 }} />
        ) : grades.length === 0 ? (
          <Text style={styles.emptyText}>No grades available yet</Text>
        ) : (
          grades.slice(0, 5).map((grade) => (
            <View key={grade._id} style={styles.gradeCard}>
              <View style={styles.gradeInfo}>
                <Text style={styles.gradeCourse}>{grade.name}</Text>
                <Text style={styles.gradeCredits}>{grade.credits} credits</Text>
              </View>
              <View style={styles.gradeBadge}>
                <Text style={styles.gradeValue}>{grade.grade}</Text>
              </View>
            </View>
          ))
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Attendance</Text>
        {loading ? (
          <ActivityIndicator size="small" color={Colors.primary} style={{ marginTop: 16 }} />
        ) : attendance.length === 0 ? (
          <Text style={styles.emptyText}>No attendance records yet</Text>
        ) : (
          attendance.slice(0, 5).map((record) => (
            <View key={record._id} style={styles.attendanceCard}>
              <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
              <View style={styles.attendanceInfo}>
                <Text style={styles.attendanceClass}>{record.class_name}</Text>
                <Text style={styles.attendanceTime}>
                  {new Date(record.timestamp).toLocaleDateString()} at {new Date(record.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={20} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: 24,
    alignItems: 'center',
    paddingTop: 16,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: Colors.secondary,
  },
  infoCard: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoLabel: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginLeft: 12,
    flex: 1,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  gpaCard: {
    backgroundColor: Colors.primary,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  gpaLabel: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
  },
  gpaValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  gradeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  gradeInfo: {
    flex: 1,
  },
  gradeCourse: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  gradeCredits: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  gradeBadge: {
    backgroundColor: Colors.lightBlue,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  gradeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  attendanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  attendanceInfo: {
    flex: 1,
    marginLeft: 12,
  },
  attendanceClass: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  attendanceTime: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.error,
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
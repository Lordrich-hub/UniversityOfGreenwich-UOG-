import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Grades() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const currentGPA = 3.85;
  const targetGPA = 4.0;
  const gpaProgress = (currentGPA / targetGPA) * 100;

  const semesters = [
    {
      id: '1',
      name: 'Fall 2024',
      gpa: 3.92,
      credits: 18,
      courses: [
        { code: 'CS301', name: 'Data Structures', grade: 'A', credits: 3, color: '#10b981' },
        { code: 'MATH201', name: 'Calculus II', grade: 'A-', credits: 4, color: '#3b82f6' },
        { code: 'ENG102', name: 'Technical Writing', grade: 'A', credits: 3, color: '#8b5cf6' },
        { code: 'PHY101', name: 'Physics I', grade: 'B+', credits: 4, color: '#f59e0b' },
        { code: 'CS250', name: 'Web Development', grade: 'A', credits: 3, color: '#ef4444' },
        { code: 'BUS100', name: 'Business Fundamentals', grade: 'A-', credits: 3, color: '#ec4899' },
      ],
    },
    {
      id: '2',
      name: 'Spring 2024',
      gpa: 3.78,
      credits: 16,
      courses: [
        { code: 'CS202', name: 'Algorithms', grade: 'B+', credits: 3, color: '#10b981' },
        { code: 'MATH150', name: 'Statistics', grade: 'A', credits: 3, color: '#3b82f6' },
        { code: 'CS180', name: 'Computer Systems', grade: 'A-', credits: 4, color: '#8b5cf6' },
        { code: 'ENG101', name: 'Composition', grade: 'A', credits: 3, color: '#f59e0b' },
        { code: 'HIST200', name: 'World History', grade: 'B+', credits: 3, color: '#ec4899' },
      ],
    },
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return '#10b981';
    if (grade.startsWith('B')) return '#3b82f6';
    if (grade.startsWith('C')) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <View style={styles.page}>
      {/* Header */}
      <LinearGradient
        colors={['#0D1140', '#1a2157']}
        style={[styles.header, { paddingTop: insets.top + 12 }]}
      >
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Academic Performance</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        {/* GPA Card - Gen Z Glassmorphism Style */}
        <View style={styles.gpaSection}>
          <LinearGradient
            colors={['rgba(59,74,158,0.15)', 'rgba(59,74,158,0.05)']}
            style={styles.gpaCard}
          >
            <View style={styles.gpaHeader}>
              <Text style={styles.gpaLabel}>Current GPA</Text>
              <MaterialIcons name="trending-up" size={24} color="#10b981" />
            </View>
            <Text style={styles.gpaValue}>{currentGPA.toFixed(2)}</Text>
            <View style={styles.gpaProgressBar}>
              <View style={[styles.gpaProgressFill, { width: `${gpaProgress}%` }]} />
            </View>
            <View style={styles.gpaStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Total Credits</Text>
                <Text style={styles.statValue}>34</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Target</Text>
                <Text style={styles.statValue}>{targetGPA.toFixed(1)}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Semesters */}
        {semesters.map((semester) => (
          <View key={semester.id} style={styles.semesterSection}>
            <View style={styles.semesterHeader}>
              <View>
                <Text style={styles.semesterName}>{semester.name}</Text>
                <Text style={styles.semesterCredits}>{semester.credits} Credits</Text>
              </View>
              <View style={styles.semesterGpaBox}>
                <Text style={styles.semesterGpaLabel}>GPA</Text>
                <Text style={styles.semesterGpaValue}>{semester.gpa.toFixed(2)}</Text>
              </View>
            </View>

            {semester.courses.map((course, index) => (
              <TouchableOpacity
                key={index}
                style={styles.courseCard}
                onPress={() => alert(`${course.name}\nGrade: ${course.grade}`)}
              >
                <View style={[styles.courseColorBar, { backgroundColor: course.color }]} />
                <View style={styles.courseContent}>
                  <View style={styles.courseInfo}>
                    <Text style={styles.courseCode}>{course.code}</Text>
                    <Text style={styles.courseName}>{course.name}</Text>
                    <Text style={styles.courseCredits}>{course.credits} credits</Text>
                  </View>
                  <View style={[styles.gradeBox, { backgroundColor: getGradeColor(course.grade) + '15' }]}>
                    <Text style={[styles.gradeText, { color: getGradeColor(course.grade) }]}>
                      {course.grade}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#f8f9fb' },
  header: { paddingHorizontal: 16, paddingBottom: 20, flexDirection: 'row', alignItems: 'center' },
  backButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#fff' },
  scrollView: { flex: 1 },
  
  // GPA Section - Glassmorphism
  gpaSection: { padding: 20 },
  gpaCard: { borderRadius: 24, padding: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5 },
  gpaHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  gpaLabel: { fontSize: 16, fontWeight: '600', color: '#6b7280' },
  gpaValue: { fontSize: 56, fontWeight: '800', color: '#0D1140', letterSpacing: -2 },
  gpaProgressBar: { height: 8, backgroundColor: 'rgba(59,74,158,0.1)', borderRadius: 4, marginTop: 16, marginBottom: 20, overflow: 'hidden' },
  gpaProgressFill: { height: '100%', backgroundColor: '#10b981', borderRadius: 4 },
  gpaStats: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  statItem: { alignItems: 'center' },
  statLabel: { fontSize: 13, color: '#9aa0c7', marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: '700', color: '#0D1140' },
  statDivider: { width: 1, height: 40, backgroundColor: 'rgba(59,74,158,0.2)' },

  // Semester Sections
  semesterSection: { paddingHorizontal: 20, marginBottom: 32 },
  semesterHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  semesterName: { fontSize: 20, fontWeight: '700', color: '#0D1140', marginBottom: 4 },
  semesterCredits: { fontSize: 14, color: '#6b7280' },
  semesterGpaBox: { alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  semesterGpaLabel: { fontSize: 11, color: '#9aa0c7', marginBottom: 2 },
  semesterGpaValue: { fontSize: 18, fontWeight: '700', color: '#10b981' },

  // Course Cards - Modern Design
  courseCard: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 12, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  courseColorBar: { height: 4 },
  courseContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  courseInfo: { flex: 1 },
  courseCode: { fontSize: 14, fontWeight: '700', color: '#0D1140', marginBottom: 4 },
  courseName: { fontSize: 15, color: '#6b7280', marginBottom: 6 },
  courseCredits: { fontSize: 12, color: '#9aa0c7' },
  gradeBox: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
  gradeText: { fontSize: 18, fontWeight: '800' },
});

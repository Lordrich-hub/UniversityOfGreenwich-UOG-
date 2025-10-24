import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Module = {
  id: string;
  code: string;
  title: string;
  progress: number;
  grade: string;
  credits: number;
  lecturer: string;
  color: string;
  emoji: string;
  nextDeadline: string;
  attendance: number;
};

const MODULES: Module[] = [
  { id: '1', code: 'COMP1001', title: 'Advanced Algorithms', progress: 0.75, grade: 'A', credits: 15, lecturer: 'Dr. Smith', color: '#8b5cf6', emoji: '💻', nextDeadline: 'Jan 25', attendance: 95 },
  { id: '2', code: 'COMP1002', title: 'Data Structures', progress: 0.60, grade: 'B+', credits: 15, lecturer: 'Prof. Johnson', color: '#3b82f6', emoji: '📊', nextDeadline: 'Jan 22', attendance: 88 },
  { id: '3', code: 'COMP1003', title: 'Web Development', progress: 0.85, grade: 'A-', credits: 15, lecturer: 'Dr. Chen', color: '#10b981', emoji: '🌐', nextDeadline: 'Jan 28', attendance: 92 },
  { id: '4', code: 'COMP1004', title: 'Database Systems', progress: 0.45, grade: 'B', credits: 15, lecturer: 'Dr. Williams', color: '#f59e0b', emoji: '🗄️', nextDeadline: 'Jan 20', attendance: 85 },
  { id: '5', code: 'COMP1005', title: 'Machine Learning', progress: 0.55, grade: 'B+', credits: 20, lecturer: 'Dr. Martinez', color: '#ec4899', emoji: '🤖', nextDeadline: 'Jan 30', attendance: 90 },
  { id: '6', code: 'COMP1006', title: 'Mobile App Dev', progress: 0.70, grade: 'A', credits: 15, lecturer: 'Dr. Taylor', color: '#06b6d4', emoji: '📱', nextDeadline: 'Jan 27', attendance: 94 },
];

export default function Modules() {
  const insets = useSafeAreaInsets();
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleModulePress = (module: Module) => {
    setSelectedModule(module);
    setShowDetailModal(true);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 0.7) return '#10b981';
    if (progress >= 0.4) return '#f59e0b';
    return '#ef4444';
  };

  const getAttendanceStatus = (attendance: number) => {
    if (attendance >= 90) return { text: 'excellent ✨', color: '#10b981' };
    if (attendance >= 75) return { text: 'good 👍', color: '#f59e0b' };
    return { text: 'needs attention ⚠️', color: '#ef4444' };
  };

  const totalCredits = MODULES.reduce((sum, m) => sum + m.credits, 0);
  const avgProgress = MODULES.reduce((sum, m) => sum + m.progress, 0) / MODULES.length;

  return (
    <View style={[styles.page, { paddingTop: insets.top }]}>
      {/* Header */}
      <LinearGradient colors={['#3b82f6', '#8b5cf6']} style={styles.header}>
        <Text style={styles.headerTitle}>📚 My Modules</Text>
        <Text style={styles.headerSubtitle}>crushing it one class at a time 💪</Text>
      </LinearGradient>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{MODULES.length}</Text>
          <Text style={styles.statLabel}>modules</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{totalCredits}</Text>
          <Text style={styles.statLabel}>credits</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{Math.round(avgProgress * 100)}%</Text>
          <Text style={styles.statLabel}>avg progress</Text>
        </View>
      </View>

      {/* Modules List */}
      <ScrollView style={styles.modulesList} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        {MODULES.map(module => {
          const attendanceStatus = getAttendanceStatus(module.attendance);
          return (
            <TouchableOpacity
              key={module.id}
              style={styles.moduleCard}
              onPress={() => handleModulePress(module)}
              activeOpacity={0.7}
            >
              {/* Module Header */}
              <View style={styles.moduleHeader}>
                <View style={[styles.moduleIcon, { backgroundColor: module.color + '20' }]}>
                  <Text style={styles.moduleEmoji}>{module.emoji}</Text>
                </View>
                <View style={styles.moduleInfo}>
                  <Text style={styles.moduleCode}>{module.code}</Text>
                  <Text style={styles.moduleTitle}>{module.title}</Text>
                  <Text style={styles.moduleLecturer}>👨‍🏫 {module.lecturer}</Text>
                </View>
                <View style={[styles.gradeChip, { backgroundColor: module.color }]}>
                  <Text style={styles.gradeText}>{module.grade}</Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>progress</Text>
                  <Text style={[styles.progressPercent, { color: getProgressColor(module.progress) }]}>
                    {Math.round(module.progress * 100)}%
                  </Text>
                </View>
                <View style={styles.progressTrack}>
                  <LinearGradient
                    colors={[module.color, module.color + '80']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.progressFill, { width: `${module.progress * 100}%` }]}
                  />
                </View>
              </View>

              {/* Module Details */}
              <View style={styles.moduleFooter}>
                <View style={styles.footerItem}>
                  <MaterialIcons name="event" size={14} color="#6b7280" />
                  <Text style={styles.footerText}>Due: {module.nextDeadline}</Text>
                </View>
                <View style={styles.footerItem}>
                  <MaterialIcons name="credit-card" size={14} color="#6b7280" />
                  <Text style={styles.footerText}>{module.credits} credits</Text>
                </View>
                <View style={styles.footerItem}>
                  <MaterialIcons name="check-circle" size={14} color={attendanceStatus.color} />
                  <Text style={[styles.footerText, { color: attendanceStatus.color }]}>
                    {module.attendance}%
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Detail Modal */}
      <Modal
        visible={showDetailModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowDetailModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedModule && (
              <>
                <View style={styles.modalHeader}>
                  <View style={[styles.modalIcon, { backgroundColor: selectedModule.color }]}>
                    <Text style={styles.modalEmoji}>{selectedModule.emoji}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowDetailModal(false)}
                  >
                    <MaterialIcons name="close" size={24} color="#0D1140" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.modalTitle}>{selectedModule.title}</Text>
                <Text style={styles.modalCode}>{selectedModule.code}</Text>

                <View style={styles.modalStats}>
                  <View style={styles.modalStatCard}>
                    <Text style={styles.modalStatLabel}>Current Grade</Text>
                    <Text style={[styles.modalStatValue, { color: selectedModule.color }]}>
                      {selectedModule.grade}
                    </Text>
                  </View>
                  <View style={styles.modalStatCard}>
                    <Text style={styles.modalStatLabel}>Attendance</Text>
                    <Text style={[styles.modalStatValue, { color: getAttendanceStatus(selectedModule.attendance).color }]}>
                      {selectedModule.attendance}%
                    </Text>
                  </View>
                </View>

                <View style={styles.modalInfo}>
                  <View style={styles.modalInfoRow}>
                    <MaterialIcons name="person" size={20} color="#6b7280" />
                    <Text style={styles.modalInfoText}>{selectedModule.lecturer}</Text>
                  </View>
                  <View style={styles.modalInfoRow}>
                    <MaterialIcons name="event" size={20} color="#6b7280" />
                    <Text style={styles.modalInfoText}>Next deadline: {selectedModule.nextDeadline}</Text>
                  </View>
                  <View style={styles.modalInfoRow}>
                    <MaterialIcons name="credit-card" size={20} color="#6b7280" />
                    <Text style={styles.modalInfoText}>{selectedModule.credits} credits</Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: selectedModule.color }]}
                  onPress={() => {
                    setShowDetailModal(false);
                    Alert.alert('View Materials 📖', `Opening ${selectedModule.title} course materials...`);
                  }}
                >
                  <MaterialIcons name="folder-open" size={20} color="#fff" />
                  <Text style={styles.actionButtonText}>View Course Materials</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={() => {
                    setShowDetailModal(false);
                    Alert.alert('Assignments 📝', `${selectedModule.title} has 2 pending assignments\n\n✅ Essay: Due ${selectedModule.nextDeadline}\n⏳ Quiz: Due next week`);
                  }}
                >
                  <Text style={styles.secondaryButtonText}>View Assignments</Text>
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
  page: { flex: 1, backgroundColor: '#fff' },
  header: { paddingVertical: 24, paddingHorizontal: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: '#fff', opacity: 0.9 },

  statsRow: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 16, gap: 12 },
  statBox: { flex: 1, backgroundColor: '#f8f9fb', borderRadius: 16, padding: 16, alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: '800', color: '#0D1140', marginBottom: 4 },
  statLabel: { fontSize: 11, color: '#6b7280' },

  modulesList: { flex: 1, paddingHorizontal: 16 },
  moduleCard: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  moduleHeader: { flexDirection: 'row', marginBottom: 16 },
  moduleIcon: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  moduleEmoji: { fontSize: 28 },
  moduleInfo: { flex: 1 },
  moduleCode: { fontSize: 12, fontWeight: '700', color: '#6b7280', marginBottom: 4 },
  moduleTitle: { fontSize: 16, fontWeight: '700', color: '#0D1140', marginBottom: 4 },
  moduleLecturer: { fontSize: 13, color: '#6b7280' },
  gradeChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, height: 32 },
  gradeText: { fontSize: 16, fontWeight: '800', color: '#fff' },

  progressSection: { marginBottom: 16 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  progressLabel: { fontSize: 12, fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' },
  progressPercent: { fontSize: 14, fontWeight: '700' },
  progressTrack: { height: 8, backgroundColor: '#f0f0f0', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: 8, borderRadius: 4 },

  moduleFooter: { flexDirection: 'row', gap: 16 },
  footerItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  footerText: { fontSize: 12, color: '#6b7280' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(13,17,64,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalIcon: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  modalEmoji: { fontSize: 32 },
  closeButton: { padding: 8 },
  modalTitle: { fontSize: 24, fontWeight: '800', color: '#0D1140', marginBottom: 4 },
  modalCode: { fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 24 },
  modalStats: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  modalStatCard: { flex: 1, backgroundColor: '#f8f9fb', borderRadius: 16, padding: 16, alignItems: 'center' },
  modalStatLabel: { fontSize: 12, color: '#6b7280', marginBottom: 8 },
  modalStatValue: { fontSize: 28, fontWeight: '800' },
  modalInfo: { marginBottom: 24, gap: 12 },
  modalInfoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  modalInfoText: { fontSize: 15, color: '#0D1140' },
  actionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 16, marginBottom: 12 },
  actionButtonText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  secondaryButton: { paddingVertical: 16, borderRadius: 16, backgroundColor: '#f8f9fb', alignItems: 'center' },
  secondaryButtonText: { fontSize: 16, fontWeight: '700', color: '#0D1140' },
});

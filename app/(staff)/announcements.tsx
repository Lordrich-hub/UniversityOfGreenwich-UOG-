import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function StaffAnnouncements() {
  const insets = useSafeAreaInsets();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const announcements = [
    { id: '1', title: 'Class Cancelled Tomorrow', date: '2025-11-06', message: 'CS101 class will be cancelled due to faculty meeting.' },
    { id: '2', title: 'Assignment Deadline Extended', date: '2025-11-05', message: 'Data Structures assignment deadline extended to Nov 15.' },
    { id: '3', title: 'Extra Office Hours', date: '2025-11-04', message: 'Will be available for consultations on Friday 3-5 PM.' },
  ];

  const handleCreate = () => {
    if (!title || !message) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    Alert.alert('Success', 'Announcement created!', [
      { text: 'OK', onPress: () => {
        setShowForm(false);
        setTitle('');
        setMessage('');
      }}
    ]);
  };

  return (
    <View style={styles.page}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>Announcements</Text>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => setShowForm(!showForm)}
        >
          <MaterialIcons name={showForm ? "close" : "add-circle"} size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        <View style={styles.whiteSection}>
          {showForm && (
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Create Announcement</Text>
              <TextInput
                style={styles.input}
                placeholder="Title"
                placeholderTextColor="#6b7280"
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Message"
                placeholderTextColor="#6b7280"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
              />
              <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                <Text style={styles.createButtonText}>Create Announcement</Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.sectionTitle}>Recent Announcements</Text>
          {announcements.map((announcement) => (
            <View key={announcement.id} style={styles.announcementCard}>
              <View style={styles.announcementHeader}>
                <MaterialIcons name="campaign" size={24} color="#3b4a9e" />
                <Text style={styles.announcementDate}>{announcement.date}</Text>
              </View>
              <Text style={styles.announcementTitle}>{announcement.title}</Text>
              <Text style={styles.announcementMessage}>{announcement.message}</Text>
              <View style={styles.announcementActions}>
                <TouchableOpacity style={styles.actionButton}>
                  <MaterialIcons name="edit" size={18} color="#3b4a9e" />
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <MaterialIcons name="delete" size={18} color="#f44336" />
                  <Text style={[styles.actionButtonText, { color: '#f44336' }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  addButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1 },
  whiteSection: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingTop: 24, paddingHorizontal: 16, minHeight: '100%' },
  formCard: { backgroundColor: '#f8f9fb', borderRadius: 16, padding: 20, marginBottom: 24 },
  formTitle: { fontSize: 18, fontWeight: '700', color: '#0D1140', marginBottom: 16 },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 16, color: '#0D1140', fontSize: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e5e7eb' },
  textArea: { height: 120, textAlignVertical: 'top' },
  createButton: { backgroundColor: '#3b4a9e', borderRadius: 12, padding: 16, alignItems: 'center' },
  createButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0D1140', marginBottom: 12 },
  announcementCard: { backgroundColor: '#f8f9fb', borderRadius: 16, padding: 16, marginBottom: 12 },
  announcementHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  announcementDate: { fontSize: 13, color: '#6b7280' },
  announcementTitle: { fontSize: 18, fontWeight: '700', color: '#0D1140', marginBottom: 8 },
  announcementMessage: { fontSize: 14, color: '#6b7280', lineHeight: 20, marginBottom: 16 },
  announcementActions: { flexDirection: 'row', gap: 12 },
  actionButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: '#e5e7eb' },
  actionButtonText: { fontSize: 14, fontWeight: '600', color: '#3b4a9e', marginLeft: 6 },
});

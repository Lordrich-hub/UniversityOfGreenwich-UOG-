import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Notifications() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    academicAlerts: true,
    gradeUpdates: true,
    assignmentReminders: true,
    eventNotifications: true,
    financialAlerts: true,
    libraryReminders: true,
    healthReminders: false,
    newsUpdates: true,
    socialUpdates: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationSections = [
    {
      title: 'Notification Channels',
      items: [
        { key: 'pushNotifications' as const, label: 'Push Notifications', subtitle: 'Receive notifications on your device', icon: 'notifications' },
        { key: 'emailNotifications' as const, label: 'Email Notifications', subtitle: 'Get updates via email', icon: 'email' },
        { key: 'smsNotifications' as const, label: 'SMS Notifications', subtitle: 'Receive text messages for urgent alerts', icon: 'sms' },
      ],
    },
    {
      title: 'Academic',
      items: [
        { key: 'academicAlerts' as const, label: 'Academic Alerts', subtitle: 'Important academic announcements', icon: 'school' },
        { key: 'gradeUpdates' as const, label: 'Grade Updates', subtitle: 'Notify when grades are posted', icon: 'grade' },
        { key: 'assignmentReminders' as const, label: 'Assignment Reminders', subtitle: 'Reminders for upcoming deadlines', icon: 'assignment' },
      ],
    },
    {
      title: 'Campus Life',
      items: [
        { key: 'eventNotifications' as const, label: 'Events & Activities', subtitle: 'Campus events and activities', icon: 'event' },
        { key: 'newsUpdates' as const, label: 'News Updates', subtitle: 'Latest university news', icon: 'article' },
        { key: 'socialUpdates' as const, label: 'Social Updates', subtitle: 'Student community updates', icon: 'group' },
      ],
    },
    {
      title: 'Services',
      items: [
        { key: 'financialAlerts' as const, label: 'Financial Alerts', subtitle: 'Tuition and payment reminders', icon: 'account-balance-wallet' },
        { key: 'libraryReminders' as const, label: 'Library Reminders', subtitle: 'Book due dates and reservations', icon: 'local-library' },
        { key: 'healthReminders' as const, label: 'Health Reminders', subtitle: 'Appointment and wellness reminders', icon: 'favorite' },
      ],
    },
  ];

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
        <Text style={styles.headerTitle}>Notifications</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        {notificationSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item) => (
              <View key={item.key} style={styles.settingCard}>
                <View style={[styles.settingIcon, { backgroundColor: settings[item.key] ? '#10b98115' : '#e8eaf0' }]}>
                  <MaterialIcons
                    name={item.icon as any}
                    size={24}
                    color={settings[item.key] ? '#10b981' : '#9aa0c7'}
                  />
                </View>
                <View style={styles.settingInfo}>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                </View>
                <Switch
                  value={settings[item.key]}
                  onValueChange={() => toggleSetting(item.key)}
                  trackColor={{ false: '#e8eaf0', true: '#10b981' }}
                  thumbColor="#fff"
                  ios_backgroundColor="#e8eaf0"
                />
              </View>
            ))}
          </View>
        ))}

        {/* Info Card */}
        <View style={styles.infoSection}>
          <LinearGradient
            colors={['rgba(59,74,158,0.08)', 'rgba(59,74,158,0.02)']}
            style={styles.infoCard}
          >
            <MaterialIcons name="info-outline" size={24} color="#3b82f6" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Notification Preferences</Text>
              <Text style={styles.infoText}>
                Your notification settings are saved automatically. You can change them anytime.
              </Text>
            </View>
          </LinearGradient>
        </View>
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

  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0D1140', marginBottom: 12, marginTop: 8 },

  settingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  settingIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  settingInfo: { flex: 1 },
  settingLabel: { fontSize: 15, fontWeight: '600', color: '#0D1140', marginBottom: 4 },
  settingSubtitle: { fontSize: 13, color: '#9aa0c7' },

  infoSection: { paddingHorizontal: 20, marginBottom: 24 },
  infoCard: { flexDirection: 'row', alignItems: 'flex-start', borderRadius: 16, padding: 16, gap: 12, borderWidth: 1, borderColor: 'rgba(59,74,158,0.1)' },
  infoContent: { flex: 1 },
  infoTitle: { fontSize: 15, fontWeight: '700', color: '#0D1140', marginBottom: 6 },
  infoText: { fontSize: 13, color: '#6b7280', lineHeight: 18 },
});

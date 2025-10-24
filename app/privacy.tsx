import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Privacy() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [settings, setSettings] = useState({
    profileVisibility: true,
    showEmail: false,
    showPhone: false,
    activityTracking: true,
    dataSharing: false,
    locationServices: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'Password change functionality coming soon');
  };

  const handleTwoFactor = () => {
    Alert.alert('Two-Factor Authentication', '2FA setup coming soon');
  };

  const handleDataDownload = () => {
    Alert.alert('Download Data', 'Your data will be prepared for download and sent to your email');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => alert('Account deletion requested') },
      ]
    );
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
        <Text style={styles.headerTitle}>Privacy & Security</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        {/* Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          
          <TouchableOpacity style={styles.actionCard} onPress={handleChangePassword}>
            <View style={[styles.actionIcon, { backgroundColor: '#3b82f615' }]}>
              <MaterialIcons name="lock-outline" size={24} color="#3b82f6" />
            </View>
            <View style={styles.actionInfo}>
              <Text style={styles.actionLabel}>Change Password</Text>
              <Text style={styles.actionSubtitle}>Update your account password</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9aa0c7" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={handleTwoFactor}>
            <View style={[styles.actionIcon, { backgroundColor: '#10b98115' }]}>
              <MaterialIcons name="shield" size={24} color="#10b981" />
            </View>
            <View style={styles.actionInfo}>
              <Text style={styles.actionLabel}>Two-Factor Authentication</Text>
              <Text style={styles.actionSubtitle}>Add an extra layer of security</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9aa0c7" />
          </TouchableOpacity>
        </View>

        {/* Privacy Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy Settings</Text>

          <View style={styles.settingCard}>
            <View style={[styles.settingIcon, { backgroundColor: settings.profileVisibility ? '#10b98115' : '#e8eaf0' }]}>
              <MaterialIcons
                name="visibility"
                size={24}
                color={settings.profileVisibility ? '#10b981' : '#9aa0c7'}
              />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Profile Visibility</Text>
              <Text style={styles.settingSubtitle}>Allow others to view your profile</Text>
            </View>
            <Switch
              value={settings.profileVisibility}
              onValueChange={() => toggleSetting('profileVisibility')}
              trackColor={{ false: '#e8eaf0', true: '#10b981' }}
              thumbColor="#fff"
              ios_backgroundColor="#e8eaf0"
            />
          </View>

          <View style={styles.settingCard}>
            <View style={[styles.settingIcon, { backgroundColor: settings.showEmail ? '#10b98115' : '#e8eaf0' }]}>
              <MaterialIcons
                name="email"
                size={24}
                color={settings.showEmail ? '#10b981' : '#9aa0c7'}
              />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Show Email</Text>
              <Text style={styles.settingSubtitle}>Display email on your profile</Text>
            </View>
            <Switch
              value={settings.showEmail}
              onValueChange={() => toggleSetting('showEmail')}
              trackColor={{ false: '#e8eaf0', true: '#10b981' }}
              thumbColor="#fff"
              ios_backgroundColor="#e8eaf0"
            />
          </View>

          <View style={styles.settingCard}>
            <View style={[styles.settingIcon, { backgroundColor: settings.showPhone ? '#10b98115' : '#e8eaf0' }]}>
              <MaterialIcons
                name="phone"
                size={24}
                color={settings.showPhone ? '#10b981' : '#9aa0c7'}
              />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Show Phone Number</Text>
              <Text style={styles.settingSubtitle}>Display phone on your profile</Text>
            </View>
            <Switch
              value={settings.showPhone}
              onValueChange={() => toggleSetting('showPhone')}
              trackColor={{ false: '#e8eaf0', true: '#10b981' }}
              thumbColor="#fff"
              ios_backgroundColor="#e8eaf0"
            />
          </View>
        </View>

        {/* Data Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data & Tracking</Text>

          <View style={styles.settingCard}>
            <View style={[styles.settingIcon, { backgroundColor: settings.activityTracking ? '#10b98115' : '#e8eaf0' }]}>
              <MaterialIcons
                name="analytics"
                size={24}
                color={settings.activityTracking ? '#10b981' : '#9aa0c7'}
              />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Activity Tracking</Text>
              <Text style={styles.settingSubtitle}>Help improve your experience</Text>
            </View>
            <Switch
              value={settings.activityTracking}
              onValueChange={() => toggleSetting('activityTracking')}
              trackColor={{ false: '#e8eaf0', true: '#10b981' }}
              thumbColor="#fff"
              ios_backgroundColor="#e8eaf0"
            />
          </View>

          <View style={styles.settingCard}>
            <View style={[styles.settingIcon, { backgroundColor: settings.dataSharing ? '#10b98115' : '#e8eaf0' }]}>
              <MaterialIcons
                name="share"
                size={24}
                color={settings.dataSharing ? '#10b981' : '#9aa0c7'}
              />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Data Sharing</Text>
              <Text style={styles.settingSubtitle}>Share data with third parties</Text>
            </View>
            <Switch
              value={settings.dataSharing}
              onValueChange={() => toggleSetting('dataSharing')}
              trackColor={{ false: '#e8eaf0', true: '#10b981' }}
              thumbColor="#fff"
              ios_backgroundColor="#e8eaf0"
            />
          </View>

          <View style={styles.settingCard}>
            <View style={[styles.settingIcon, { backgroundColor: settings.locationServices ? '#10b98115' : '#e8eaf0' }]}>
              <MaterialIcons
                name="location-on"
                size={24}
                color={settings.locationServices ? '#10b981' : '#9aa0c7'}
              />
            </View>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Location Services</Text>
              <Text style={styles.settingSubtitle}>Allow app to access your location</Text>
            </View>
            <Switch
              value={settings.locationServices}
              onValueChange={() => toggleSetting('locationServices')}
              trackColor={{ false: '#e8eaf0', true: '#10b981' }}
              thumbColor="#fff"
              ios_backgroundColor="#e8eaf0"
            />
          </View>
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>

          <TouchableOpacity style={styles.actionCard} onPress={handleDataDownload}>
            <View style={[styles.actionIcon, { backgroundColor: '#8b5cf615' }]}>
              <MaterialIcons name="download" size={24} color="#8b5cf6" />
            </View>
            <View style={styles.actionInfo}>
              <Text style={styles.actionLabel}>Download My Data</Text>
              <Text style={styles.actionSubtitle}>Get a copy of your data</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9aa0c7" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} onPress={handleDeleteAccount}>
            <View style={[styles.actionIcon, { backgroundColor: '#ef444415' }]}>
              <MaterialIcons name="delete-outline" size={24} color="#ef4444" />
            </View>
            <View style={styles.actionInfo}>
              <Text style={[styles.actionLabel, { color: '#ef4444' }]}>Delete Account</Text>
              <Text style={styles.actionSubtitle}>Permanently delete your account</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#9aa0c7" />
          </TouchableOpacity>
        </View>

        {/* Info Card */}
        <View style={styles.infoSection}>
          <LinearGradient
            colors={['rgba(59,74,158,0.08)', 'rgba(59,74,158,0.02)']}
            style={styles.infoCard}
          >
            <MaterialIcons name="lock" size={24} color="#3b82f6" />
            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>Your Privacy Matters</Text>
              <Text style={styles.infoText}>
                We take your privacy seriously. Your data is encrypted and protected according to university policies.
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

  actionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  actionIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  actionInfo: { flex: 1 },
  actionLabel: { fontSize: 15, fontWeight: '600', color: '#0D1140', marginBottom: 4 },
  actionSubtitle: { fontSize: 13, color: '#9aa0c7' },

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

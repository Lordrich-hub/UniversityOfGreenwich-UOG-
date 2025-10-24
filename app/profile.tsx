import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Profile() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const menuSections = [
    {
      id: 'main',
      items: [
        { icon: 'account-circle', iconLib: 'MaterialCommunityIcons', label: 'My Profile', onPress: () => Alert.alert('My Profile', 'Profile details coming soon') },
        { icon: 'wallet', iconLib: 'MaterialCommunityIcons', label: 'Wallet', badge: '', onPress: () => Alert.alert('Wallet', 'Wallet feature coming soon') },
        { icon: 'bookmark', iconLib: 'MaterialIcons', label: 'Saved Messages', onPress: () => Alert.alert('Saved Messages', 'Saved messages coming soon') },
        { icon: 'phone', iconLib: 'MaterialIcons', label: 'Recent Calls', onPress: () => Alert.alert('Recent Calls', 'Call history coming soon') },
        { icon: 'devices', iconLib: 'MaterialIcons', label: 'Devices', badge: '5', onPress: () => Alert.alert('Devices', 'Device management coming soon') },
        { icon: 'folder', iconLib: 'MaterialIcons', label: 'Chat Folders', onPress: () => Alert.alert('Chat Folders', 'Folder management coming soon') },
      ],
    },
    {
      id: 'settings',
      items: [
        { icon: 'notifications', iconLib: 'MaterialIcons', label: 'Notifications and Sounds', onPress: () => Alert.alert('Notifications', 'Notification settings coming soon') },
        { icon: 'security', iconLib: 'MaterialIcons', label: 'Privacy and Security', onPress: () => Alert.alert('Privacy', 'Privacy settings coming soon') },
        { icon: 'storage', iconLib: 'MaterialIcons', label: 'Data and Storage', onPress: () => Alert.alert('Data', 'Storage settings coming soon') },
        { icon: 'palette', iconLib: 'MaterialIcons', label: 'Appearance', onPress: () => Alert.alert('Appearance', 'Theme settings coming soon') },
        { icon: 'language', iconLib: 'MaterialIcons', label: 'Language', subtitle: 'English', onPress: () => Alert.alert('Language', 'Language selection coming soon') },
      ],
    },
  ];

  return (
    <View style={styles.page}>
      {/* Header with back button */}
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.push('/(tabs)/home')}
        >
          <MaterialIcons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        {/* Profile Header */}
        <TouchableOpacity style={styles.profileHeader} onPress={() => Alert.alert('Edit Profile', 'Profile editing coming soon')}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>L</Text>
          </View>
          <Text style={styles.profileName}>Student Name</Text>
          <Text style={styles.profilePhone}>+234 81 2659 3349 • @student_uog</Text>
        </TouchableOpacity>

        {/* Menu Sections */}
        {menuSections.map((section) => (
          <View key={section.id} style={styles.menuSection}>
            {section.items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  index === 0 && styles.menuItemFirst,
                  index === section.items.length - 1 && styles.menuItemLast,
                ]}
                onPress={item.onPress}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.iconContainer}>
                    {item.iconLib === 'MaterialIcons' ? (
                      <MaterialIcons name={item.icon as any} size={24} color="#fff" />
                    ) : (
                      <MaterialCommunityIcons name={item.icon as any} size={24} color="#fff" />
                    )}
                  </View>
                  <View style={styles.menuItemTextContainer}>
                    <Text style={styles.menuItemLabel}>{item.label}</Text>
                    {item.subtitle && <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>}
                  </View>
                </View>
                <View style={styles.menuItemRight}>
                  {item.badge && <Text style={styles.badge}>{item.badge}</Text>}
                  <MaterialIcons name="chevron-right" size={24} color="#8891b8" />
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
  page: { flex: 1, backgroundColor: '#0D1140' },
  header: { paddingHorizontal: 16, paddingBottom: 16, backgroundColor: '#0D1140', flexDirection: 'row', alignItems: 'center' },
  backButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff' },
  scrollView: { flex: 1 },
  profileHeader: { alignItems: 'center', paddingVertical: 32, paddingHorizontal: 24 },
  avatarLarge: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#3b4a9e', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  avatarLargeText: { color: '#fff', fontSize: 40, fontWeight: '700' },
  profileName: { fontSize: 26, fontWeight: '700', color: '#fff', marginBottom: 8 },
  profilePhone: { fontSize: 15, color: '#9aa0c7' },
  menuSection: { backgroundColor: '#151a42', marginHorizontal: 16, marginBottom: 16, borderRadius: 16, overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 16, backgroundColor: '#151a42', borderBottomWidth: 0.5, borderBottomColor: 'rgba(255,255,255,0.08)' },
  menuItemFirst: { borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  menuItemLast: { borderBottomWidth: 0, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconContainer: { width: 40, height: 40, borderRadius: 8, backgroundColor: '#3b4a9e', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  menuItemTextContainer: { flex: 1 },
  menuItemLabel: { fontSize: 16, fontWeight: '600', color: '#fff', marginBottom: 2 },
  menuItemSubtitle: { fontSize: 13, color: '#8891b8' },
  menuItemRight: { flexDirection: 'row', alignItems: 'center' },
  badge: { backgroundColor: '#8891b8', color: '#fff', fontSize: 13, fontWeight: '600', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12, marginRight: 8, minWidth: 24, textAlign: 'center' },
});

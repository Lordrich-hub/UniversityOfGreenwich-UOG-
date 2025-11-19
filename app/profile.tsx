import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface MenuItem {
  icon: string;
  iconLib: string;
  label: string;
  badge?: string;
  subtitle?: string;
  onPress: () => void;
}

export default function Profile() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const studentName = 'Lords Jackrich';
  const studentEmail = 'lj8607b@gre.ac.uk';
  const studentId = '8607';

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera roll permissions are required to change your profile picture');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status} = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera permissions are required to take a photo');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const showImagePicker = () => {
    Alert.alert(
      'Change Profile Picture',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Library', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleSwitchRole = async () => {
    Alert.alert(
      'Switch Role',
      'Do you want to switch to staff view?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Switch',
          onPress: async () => {
            await AsyncStorage.removeItem('userRole');
            router.replace('/choose-role');
          },
        },
      ]
    );
  };

  const menuSections: { id: string; title?: string; items: MenuItem[] }[] = [
    {
      id: 'academic',
      title: 'Academic',
      items: [
        { icon: 'school', iconLib: 'MaterialIcons', label: 'Grades/GPA', subtitle: 'View your academic performance', onPress: () => router.push('/grades') },
      ],
    },
    {
      id: 'services',
      title: 'Services',
      items: [
        { icon: 'wallet', iconLib: 'MaterialCommunityIcons', label: 'Finance', subtitle: 'Tuition & payments', onPress: () => router.push('/finance') },
        { icon: 'library-books', iconLib: 'MaterialIcons', label: 'Library', subtitle: 'Books & resources', onPress: () => router.push('/library') },
        { icon: 'local-dining', iconLib: 'MaterialIcons', label: 'Meal Plan', subtitle: 'Campus dining', onPress: () => router.push('/meal-plan') },
        { icon: 'health-and-safety', iconLib: 'MaterialIcons', label: 'Health Services', subtitle: 'Medical appointments', onPress: () => router.push('/health') },
      ],
    },
    {
      id: 'settings',
      title: 'Settings',
      items: [
        { icon: 'notifications', iconLib: 'MaterialIcons', label: 'Notifications', onPress: () => router.push('/notifications') },
        { icon: 'security', iconLib: 'MaterialIcons', label: 'Privacy & Security', onPress: () => router.push('/privacy') },
        { icon: 'help', iconLib: 'MaterialIcons', label: 'Help & Support', onPress: () => router.push('/support') },
        { icon: 'swap-horiz', iconLib: 'MaterialIcons', label: 'Switch to Staff View', onPress: handleSwitchRole },
        { icon: 'logout', iconLib: 'MaterialIcons', label: 'Sign Out', onPress: () => Alert.alert('Sign Out', 'Are you sure you want to sign out?', [{ text: 'Cancel' }, { text: 'Sign Out', style: 'destructive', onPress: () => router.replace('/') }]) },
      ],
    },
  ];

  return (
    <View style={styles.page}>
      {/* Header with back button - stays dark navy */}
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
        {/* Profile Header - white background */}
        <View style={styles.whiteSection}>
          <TouchableOpacity style={styles.profileHeader} onPress={showImagePicker}>
            <View style={styles.avatarContainer}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.avatarImage} />
              ) : (
                <View style={styles.avatarLarge}>
                  <Text style={styles.avatarLargeText}>
                    {studentName.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
              )}
              <View style={styles.cameraIcon}>
                <MaterialIcons name="camera-alt" size={18} color="#fff" />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{studentName}</Text>
            <Text style={styles.profileEmail}>{studentEmail}</Text>
            <Text style={styles.profileId}>Student ID: {studentId}</Text>
            <Text style={styles.profileNote}>Profile data synced from university database</Text>
          </View>

          {/* Menu Sections */}
          {menuSections.map((section) => (
            <View key={section.id} style={styles.menuSectionWhite}>
              {section.title && <Text style={styles.sectionTitle}>{section.title}</Text>}
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.menuItemWhite,
                    index === section.items.length - 1 && styles.menuItemLastWhite,
                  ]}
                  onPress={item.onPress}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.iconContainerWhite}>
                      {item.iconLib === 'MaterialIcons' ? (
                        <MaterialIcons name={item.icon as any} size={22} color="#0D1140" />
                      ) : (
                        <MaterialCommunityIcons name={item.icon as any} size={22} color="#0D1140" />
                      )}
                    </View>
                    <View style={styles.menuItemTextContainer}>
                      <Text style={styles.menuItemLabelWhite}>{item.label}</Text>
                      {item.subtitle && <Text style={styles.menuItemSubtitleWhite}>{item.subtitle}</Text>}
                    </View>
                  </View>
                  <View style={styles.menuItemRight}>
                    {item.badge && <Text style={styles.badgeWhite}>{item.badge}</Text>}
                    <MaterialIcons name="chevron-right" size={24} color="#9aa0c7" />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  header: { paddingHorizontal: 16, paddingBottom: 16, backgroundColor: '#0D1140', flexDirection: 'row', alignItems: 'center' },
  backButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#fff' },
  scrollView: { flex: 1, backgroundColor: '#fff' },
  // White section starts here
  whiteSection: { backgroundColor: '#fff', paddingTop: 32, paddingBottom: 40 },
  profileHeader: { alignItems: 'center', marginBottom: 24 },
  avatarContainer: { position: 'relative', marginBottom: 16 },
  avatarLarge: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#3b4a9e', alignItems: 'center', justifyContent: 'center' },
  avatarImage: { width: 100, height: 100, borderRadius: 50 },
  avatarLargeText: { color: '#fff', fontSize: 36, fontWeight: '700' },
  cameraIcon: { position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: '#3b4a9e', alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: '#fff' },
  profileInfo: { alignItems: 'center', paddingHorizontal: 24, marginBottom: 32 },
  profileName: { fontSize: 26, fontWeight: '700', color: '#0D1140', marginBottom: 8 },
  profileEmail: { fontSize: 15, color: '#6b7280', marginBottom: 4 },
  profileId: { fontSize: 14, color: '#9aa0c7', marginBottom: 8 },
  profileNote: { fontSize: 12, color: '#9aa0c7', fontStyle: 'italic', marginTop: 4 },
  // Menu sections on white background
  menuSectionWhite: { paddingHorizontal: 16, marginBottom: 24 },
  sectionTitle: { fontSize: 14, fontWeight: '700', color: '#9aa0c7', marginBottom: 12, marginLeft: 4, textTransform: 'uppercase', letterSpacing: 0.5 },
  menuItemWhite: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, paddingHorizontal: 16, backgroundColor: '#f8f9fb', borderBottomWidth: 0.5, borderBottomColor: '#e0e0e0' },
  menuItemLastWhite: { borderBottomWidth: 0, borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconContainerWhite: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#e8eaf0', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  menuItemTextContainer: { flex: 1 },
  menuItemLabelWhite: { fontSize: 16, fontWeight: '600', color: '#0D1140', marginBottom: 2 },
  menuItemSubtitleWhite: { fontSize: 13, color: '#6b7280' },
  menuItemRight: { flexDirection: 'row', alignItems: 'center' },
  badgeWhite: { backgroundColor: '#e8eaf0', color: '#0D1140', fontSize: 13, fontWeight: '600', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12, marginRight: 8, minWidth: 24, textAlign: 'center' },
});

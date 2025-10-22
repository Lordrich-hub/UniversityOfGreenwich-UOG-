import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Profile() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.page, { paddingTop: insets.top + 24 }]}> 
      <View style={styles.avatarWrap}>
        <View style={styles.avatar} />
        <Text style={styles.name}>Student L</Text>
        <Text style={styles.meta}>ID: 12345678</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Settings</Text>
        <Text style={styles.item}>- Edit profile</Text>
        <Text style={styles.item}>- Notifications</Text>
        <Text style={styles.item}>- Sign out</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
  avatarWrap: { alignItems: 'center', marginBottom: 24 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#d9e0ff', marginBottom: 12 },
  name: { fontSize: 22, fontWeight: '800', color: '#0D1140' },
  meta: { color: '#5b668f', marginTop: 4 },
  card: { backgroundColor: '#f8f9fb', borderRadius: 14, padding: 16 },
  cardTitle: { fontSize: 18, fontWeight: '800', color: '#0D1140', marginBottom: 8 },
  item: { color: '#0D1140', opacity: 0.8, marginBottom: 6 },
});

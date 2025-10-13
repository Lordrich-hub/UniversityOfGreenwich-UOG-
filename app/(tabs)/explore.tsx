import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Explore() {
  return (
    <View style={styles.page}>
      <View style={styles.card}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.sub}>Coming soon</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#0D1140', padding: 16 },
  card: { backgroundColor: '#0f1538', padding: 20, borderRadius: 12, alignItems: 'center' },
  title: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 8 },
  sub: { color: '#c8cfee' },
});

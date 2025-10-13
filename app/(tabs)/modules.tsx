import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const MODULES = [
  { id: 'm1', title: 'Calculus', progress: 0.6 },
  { id: 'm2', title: 'Algorithms', progress: 0.35 },
  { id: 'm3', title: 'Modern History', progress: 0.8 },
];

function Progress({ value }: { value: number }) {
  return (
    <View style={styles.progressTrack}>
      <View style={[styles.progressFill, { width: `${Math.round(value * 100)}%` }]} />
    </View>
  );
}

export default function Modules() {
  return (
    <View style={styles.page}>
      <FlatList
        data={MODULES}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Progress value={item.progress} />
            <Text style={styles.pct}>{Math.round(item.progress * 100)}%</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#0D1140' },
  card: { backgroundColor: '#0f1538', padding: 14, borderRadius: 12, marginBottom: 12, marginHorizontal: 8 },
  title: { color: '#fff', fontWeight: '700', marginBottom: 8 },
  progressTrack: { height: 10, backgroundColor: '#192042', borderRadius: 8, overflow: 'hidden' },
  progressFill: { height: 10, backgroundColor: '#6EA8FE' },
  pct: { color: '#c8cfee', marginTop: 8 },
});

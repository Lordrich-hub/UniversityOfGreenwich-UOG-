import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const DATA = [
  { id: '1', time: '09:00', title: 'Mathematics - Room 201' },
  { id: '2', time: '11:00', title: 'Computer Science - Lab 3' },
  { id: '3', time: '14:00', title: 'History - Lecture Hall' },
];

export default function Timetable() {
  return (
    <View style={styles.page}>
      <FlatList
        data={DATA}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#0D1140' },
  item: { backgroundColor: '#0f1538', padding: 14, borderRadius: 12, marginBottom: 12, marginHorizontal: 8 },
  time: { color: '#9fb0ff', fontWeight: '700', marginBottom: 6 },
  title: { color: '#fff' },
});

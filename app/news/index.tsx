import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HERO_NEWS = [
  {
    id: 'news-hero-1',
    image: require('../../assets/images/UOG.png'),
    category: 'University News',
    title: 'Campus Updates: New Library Opening & Term Timetable',
    meta: 'Announcements · 2 hours ago',
  },
  {
    id: 'news-hero-2',
    image: require('../../assets/images/dreadnought.png'),
    category: 'University News',
    title: 'Dreadnought building now open late',
    meta: 'Facilities · 1 hour ago',
  },
  {
    id: 'news-hero-3',
    image: require('../../assets/images/library.png'),
    category: 'Library',
    title: 'Library extended hours this weekend',
    meta: 'Announcements · 3 hours ago',
  },
  {
    id: 'news-hero-4',
    image: require('../../assets/images/librarybuilding.png'),
    category: 'Campus',
    title: 'New study spaces in library building',
    meta: 'Campus · today',
  },
];

export default function NewsList() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.page, { paddingTop: insets.top + 8 }]}> 
      <Text style={styles.title}>Announcements</Text>
      <FlatList
        data={HERO_NEWS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 30 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({ pathname: '/news/[id]', params: { id: item.id } })}
          >
            <Image source={item.image} style={styles.image} resizeMode="cover" />
            <View style={{ padding: 12 }}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.meta}>{item.meta}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: '800', color: '#0D1140', paddingHorizontal: 16, marginBottom: 8 },
  card: { backgroundColor: '#f8f9fb', borderRadius: 14, overflow: 'hidden', marginBottom: 16 },
  image: { width: '100%', height: 200 },
  category: { color: '#0D1140', opacity: 0.7, fontWeight: '600', marginBottom: 6 },
  cardTitle: { color: '#0D1140', fontSize: 18, fontWeight: '800', marginBottom: 6 },
  meta: { color: '#5b668f' },
});

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../src/store/authStore';
import api from '../../src/utils/api';
import Colors from '../../src/constants/Colors';

interface NewsItem {
  _id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
}

export default function Home() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchNews = async () => {
    try {
      const response = await api.get('/news');
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const seedData = async () => {
    try {
      await api.post('/seed');
      Alert.alert('Success', 'Sample data loaded!');
      fetchNews();
    } catch (error) {
      console.error('Error seeding data:', error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchNews();
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back,</Text>
        <Text style={styles.username}>{user?.username}!</Text>
        <Text style={styles.course}>{user?.course} - Year {user?.year}</Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/qr-scanner')}
        >
          <Ionicons name="qr-code" size={32} color={Colors.primary} />
          <Text style={styles.actionText}>QR Scanner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/chatbot')}
        >
          <Ionicons name="chatbubbles" size={32} color={Colors.primary} />
          <Text style={styles.actionText}>AI Assistant</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/(tabs)/timetable')}
        >
          <Ionicons name="calendar" size={32} color={Colors.primary} />
          <Text style={styles.actionText}>Timetable</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/(tabs)/campus')}
        >
          <Ionicons name="map" size={32} color={Colors.primary} />
          <Text style={styles.actionText}>Campus Map</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Latest News</Text>
          {news.length === 0 && !loading && (
            <TouchableOpacity onPress={seedData}>
              <Text style={styles.loadSample}>Load Sample Data</Text>
            </TouchableOpacity>
          )}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
        ) : news.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="newspaper-outline" size={48} color={Colors.textSecondary} />
            <Text style={styles.emptyText}>No news available</Text>
          </View>
        ) : (
          news.map((item) => (
            <View key={item._id} style={styles.newsCard}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>{item.category}</Text>
              </View>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsContent} numberOfLines={3}>
                {item.content}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: 24,
    paddingTop: 16,
  },
  greeting: {
    fontSize: 18,
    color: 'white',
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginTop: 4,
  },
  course: {
    fontSize: 14,
    color: 'white',
    marginTop: 4,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 12,
  },
  actionButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '47%',
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    color: Colors.text,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  loadSample: {
    fontSize: 14,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  loader: {
    marginTop: 32,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 12,
  },
  newsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryBadge: {
    backgroundColor: Colors.lightBlue,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  newsContent: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

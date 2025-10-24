import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
  emoji: string;
};

type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  attendees: number;
  emoji: string;
  color: string;
};

type Club = {
  id: string;
  name: string;
  members: number;
  category: string;
  emoji: string;
  description: string;
};

const CATEGORIES: Category[] = [
  { id: '1', name: 'All', icon: 'grid-view', color: '#8b5cf6', emoji: '✨' },
  { id: '2', name: 'Events', icon: 'event', color: '#ec4899', emoji: '🎉' },
  { id: '3', name: 'Clubs', icon: 'groups', color: '#3b82f6', emoji: '👥' },
  { id: '4', name: 'Sports', icon: 'sports-soccer', color: '#10b981', emoji: '⚽' },
  { id: '5', name: 'Social', icon: 'celebration', color: '#f59e0b', emoji: '🎊' },
];

const EVENTS: Event[] = [
  { id: '1', title: 'Welcome Party', date: 'Jan 26', time: '7:00 PM', location: 'Student Union', category: 'Social', attendees: 156, emoji: '🎉', color: '#ec4899' },
  { id: '2', title: 'Tech Talk: AI & Future', date: 'Jan 28', time: '2:00 PM', location: 'Innovation Lab', category: 'Events', attendees: 89, emoji: '🤖', color: '#8b5cf6' },
  { id: '3', title: 'Football Match', date: 'Jan 30', time: '4:00 PM', location: 'Sports Complex', category: 'Sports', attendees: 234, emoji: '⚽', color: '#10b981' },
  { id: '4', title: 'Movie Night', date: 'Feb 2', time: '8:00 PM', location: 'Cinema Hall', category: 'Social', attendees: 178, emoji: '🍿', color: '#f59e0b' },
  { id: '5', title: 'Coding Hackathon', date: 'Feb 5', time: '9:00 AM', location: 'CS Building', category: 'Events', attendees: 67, emoji: '💻', color: '#3b82f6' },
];

const CLUBS: Club[] = [
  { id: '1', name: 'Tech Society', members: 342, category: 'Tech', emoji: '💻', description: 'Code, create, innovate' },
  { id: '2', name: 'Drama Club', members: 156, category: 'Arts', emoji: '🎭', description: 'Express yourself on stage' },
  { id: '3', name: 'Gaming Guild', members: 289, category: 'Gaming', emoji: '🎮', description: 'Level up together' },
  { id: '4', name: 'Debate Society', members: 98, category: 'Academic', emoji: '🗣️', description: 'Speak your mind' },
  { id: '5', name: 'Photography Club', members: 203, category: 'Arts', emoji: '📸', description: 'Capture the moment' },
  { id: '6', name: 'Fitness Crew', members: 421, category: 'Sports', emoji: '💪', description: 'Get fit, stay fit' },
];

const TRENDING = [
  { id: '1', title: 'Study Spaces', emoji: '📚', count: '12 spots' },
  { id: '2', title: 'Food Deals', emoji: '🍕', count: '5 offers' },
  { id: '3', title: 'Campus Jobs', emoji: '💼', count: '8 openings' },
];

export default function Explore() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleEventPress = (event: Event) => {
    Alert.alert(
      `${event.emoji} ${event.title}`,
      `📅 ${event.date} at ${event.time}\n📍 ${event.location}\n👥 ${event.attendees} attending\n\nWanna join the vibe?`,
      [
        { text: 'Not Now' },
        { 
          text: 'Count Me In!', 
          onPress: () => Alert.alert('You are In!', `See you at ${event.title}!\nReminder set`) 
        }
      ]
    );
  };

  const handleClubPress = (club: Club) => {
    Alert.alert(
      `${club.emoji} ${club.name}`,
      `${club.description}\n\n👥 ${club.members} members\n\nJoin the squad?`,
      [
        { text: 'Maybe Later' },
        { 
          text: 'Join Club', 
          onPress: () => Alert.alert('Welcome!', `You are now part of ${club.name}!\nCheck your profile for updates.`) 
        }
      ]
    );
  };

  const handleTrendingPress = (item: any) => {
    Alert.alert(
      `${item.emoji} ${item.title}`,
      `${item.count} available\n\nWhat's trending on campus!`,
      [{ text: 'Got It!' }]
    );
  };

  const filteredEvents = selectedCategory === 'All' 
    ? EVENTS 
    : EVENTS.filter(e => e.category === selectedCategory);

  return (
    <View style={[styles.page, { paddingTop: insets.top }]}>
      {/* Header */}
      <LinearGradient colors={['#0D1140', '#1a1f5c']} style={styles.header}>
        <Text style={styles.headerTitle}>🌟 Explore</Text>
        <Text style={styles.headerSubtitle}>discover what's happening on campus</Text>
      </LinearGradient>

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <MaterialIcons name="search" size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="search events, clubs, activities..."
            placeholderTextColor="#9aa0c7"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialIcons name="close" size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>

        {/* Trending Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔥 trending now</Text>
            <TouchableOpacity onPress={() => Alert.alert('Trending 🔥', 'Showing all trending items on campus!\n\n📚 Study Spaces\n🍕 Food Deals\n💼 Campus Jobs\n🎮 Gaming Tournaments\n🎨 Art Exhibitions')}>
              <Text style={styles.seeAllText}>see all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.trendingScroll}>
            {TRENDING.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.trendingCard}
                onPress={() => handleTrendingPress(item)}
              >
                <Text style={styles.trendingEmoji}>{item.emoji}</Text>
                <Text style={styles.trendingTitle}>{item.title}</Text>
                <Text style={styles.trendingCount}>{item.count}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryChip,
                selectedCategory === cat.name && { backgroundColor: cat.color }
              ]}
              onPress={() => setSelectedCategory(cat.name)}
            >
              <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
              <Text style={[
                styles.categoryText,
                selectedCategory === cat.name && styles.categoryTextActive
              ]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Events Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🎊 upcoming events</Text>
            <Text style={styles.sectionCount}>{filteredEvents.length}</Text>
          </View>
          {filteredEvents.map(event => (
            <TouchableOpacity
              key={event.id}
              style={[styles.eventCard, { borderLeftColor: event.color, borderLeftWidth: 4 }]}
              onPress={() => handleEventPress(event)}
              activeOpacity={0.7}
            >
              <View style={styles.eventHeader}>
                <View style={[styles.eventIcon, { backgroundColor: event.color + '20' }]}>
                  <Text style={styles.eventEmoji}>{event.emoji}</Text>
                </View>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <View style={styles.eventMeta}>
                    <View style={styles.eventMetaItem}>
                      <MaterialIcons name="event" size={14} color="#6b7280" />
                      <Text style={styles.eventMetaText}>{event.date}</Text>
                    </View>
                    <View style={styles.eventMetaItem}>
                      <MaterialIcons name="access-time" size={14} color="#6b7280" />
                      <Text style={styles.eventMetaText}>{event.time}</Text>
                    </View>
                  </View>
                  <View style={styles.eventFooter}>
                    <View style={styles.eventLocation}>
                      <MaterialIcons name="location-on" size={14} color="#6b7280" />
                      <Text style={styles.eventLocationText}>{event.location}</Text>
                    </View>
                    <View style={styles.eventAttendees}>
                      <MaterialIcons name="people" size={14} color={event.color} />
                      <Text style={[styles.eventAttendeesText, { color: event.color }]}>
                        {event.attendees} going
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Clubs Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>👥 student clubs</Text>
            <TouchableOpacity onPress={() => Alert.alert('All Clubs 👥', 'Browse 50+ student clubs:\n\n💻 Tech Society\n🎭 Drama Club\n🎮 Gaming Guild\n🗣️ Debate Society\n📸 Photography Club\n💪 Fitness Crew\n🎵 Music Society\n♟️ Chess Club\n🌍 International Students\n...and many more!')}>
              <Text style={styles.seeAllText}>see all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.clubsGrid}>
            {CLUBS.map(club => (
              <TouchableOpacity
                key={club.id}
                style={styles.clubCard}
                onPress={() => handleClubPress(club)}
                activeOpacity={0.7}
              >
                <Text style={styles.clubEmoji}>{club.emoji}</Text>
                <Text style={styles.clubName}>{club.name}</Text>
                <Text style={styles.clubDescription}>{club.description}</Text>
                <View style={styles.clubMembers}>
                  <MaterialIcons name="people" size={14} color="#6b7280" />
                  <Text style={styles.clubMembersText}>{club.members} members</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },
  header: { paddingVertical: 24, paddingHorizontal: 20, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 4 },
  headerSubtitle: { fontSize: 14, color: '#fff', opacity: 0.9 },

  content: { flex: 1 },
  
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8f9fb', marginHorizontal: 16, marginTop: 16, marginBottom: 8, paddingHorizontal: 16, paddingVertical: 12, borderRadius: 16, gap: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#0D1140' },

  section: { marginTop: 24, paddingHorizontal: 16 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#0D1140' },
  sectionCount: { fontSize: 14, fontWeight: '700', color: '#6b7280', backgroundColor: '#f8f9fb', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12 },
  seeAllText: { fontSize: 14, fontWeight: '600', color: '#8b5cf6' },

  trendingScroll: { marginBottom: 8 },
  trendingCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginRight: 12, alignItems: 'center', minWidth: 120, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  trendingEmoji: { fontSize: 32, marginBottom: 8 },
  trendingTitle: { fontSize: 14, fontWeight: '700', color: '#0D1140', marginBottom: 4, textAlign: 'center' },
  trendingCount: { fontSize: 12, color: '#6b7280' },

  categories: { paddingHorizontal: 16, paddingVertical: 12, maxHeight: 60 },
  categoryChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, marginRight: 8, borderRadius: 20, backgroundColor: '#f8f9fb', gap: 6 },
  categoryEmoji: { fontSize: 16 },
  categoryText: { fontSize: 14, fontWeight: '700', color: '#6b7280' },
  categoryTextActive: { color: '#fff' },

  eventCard: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  eventHeader: { flexDirection: 'row' },
  eventIcon: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  eventEmoji: { fontSize: 28 },
  eventInfo: { flex: 1 },
  eventTitle: { fontSize: 17, fontWeight: '700', color: '#0D1140', marginBottom: 8 },
  eventMeta: { flexDirection: 'row', gap: 16, marginBottom: 8 },
  eventMetaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  eventMetaText: { fontSize: 13, color: '#6b7280' },
  eventFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  eventLocation: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  eventLocationText: { fontSize: 13, color: '#6b7280' },
  eventAttendees: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  eventAttendeesText: { fontSize: 13, fontWeight: '700' },

  clubsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  clubCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, width: '48%', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  clubEmoji: { fontSize: 36, marginBottom: 8 },
  clubName: { fontSize: 15, fontWeight: '700', color: '#0D1140', marginBottom: 4 },
  clubDescription: { fontSize: 12, color: '#6b7280', marginBottom: 8 },
  clubMembers: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  clubMembersText: { fontSize: 12, color: '#6b7280' },
});

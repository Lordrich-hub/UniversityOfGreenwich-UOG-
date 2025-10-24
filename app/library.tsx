import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Library() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const borrowedBooks = [
    { id: '1', title: 'Data Structures and Algorithms', author: 'Thomas Cormen', dueDate: 'Jan 20, 2025', status: 'active', color: '#10b981' },
    { id: '2', title: 'Clean Code', author: 'Robert Martin', dueDate: 'Jan 18, 2025', status: 'due-soon', color: '#f59e0b' },
    { id: '3', title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', dueDate: 'Jan 25, 2025', status: 'active', color: '#3b82f6' },
  ];

  const reservedBooks = [
    { id: '1', title: 'Design Patterns', author: 'Gang of Four', available: 'Jan 15, 2025' },
    { id: '2', title: 'Introduction to Algorithms', author: 'CLRS', available: 'Jan 22, 2025' },
  ];

  const quickLinks = [
    { icon: 'search', label: 'Search Catalog', color: '#3b82f6' },
    { icon: 'book', label: 'Study Rooms', color: '#8b5cf6' },
    { icon: 'laptop', label: 'E-Resources', color: '#10b981' },
    { icon: 'help-outline', label: 'Ask Librarian', color: '#ec4899' },
  ];

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
        <Text style={styles.headerTitle}>Library</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={22} color="#9aa0c7" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search books, journals, articles..."
              placeholderTextColor="#9aa0c7"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Quick Links */}
        <View style={styles.quickLinksSection}>
          <View style={styles.quickLinksGrid}>
            {quickLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickLinkCard}
                onPress={() => alert(`${link.label} coming soon`)}
              >
                <View style={[styles.quickLinkIcon, { backgroundColor: link.color + '15' }]}>
                  <MaterialIcons name={link.icon as any} size={26} color={link.color} />
                </View>
                <Text style={styles.quickLinkLabel}>{link.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Borrowed Books */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Borrowed Books</Text>
            <Text style={styles.sectionBadge}>{borrowedBooks.length}</Text>
          </View>
          {borrowedBooks.map((book) => (
            <TouchableOpacity
              key={book.id}
              style={styles.bookCard}
              onPress={() => alert(`Renew "${book.title}"?`)}
            >
              <View style={[styles.bookColorStrip, { backgroundColor: book.color }]} />
              <View style={styles.bookContent}>
                <View style={styles.bookInfo}>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookAuthor}>{book.author}</Text>
                  <View style={styles.bookFooter}>
                    <MaterialIcons name="schedule" size={14} color="#9aa0c7" />
                    <Text style={[
                      styles.bookDueDate,
                      book.status === 'due-soon' && { color: '#f59e0b', fontWeight: '600' }
                    ]}>
                      Due: {book.dueDate}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.renewButton, { backgroundColor: book.color + '15' }]}
                  onPress={() => alert(`Renew "${book.title}"?`)}
                >
                  <MaterialIcons name="refresh" size={20} color={book.color} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Reserved Books */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Reservations</Text>
            <Text style={styles.sectionBadge}>{reservedBooks.length}</Text>
          </View>
          {reservedBooks.map((book) => (
            <View key={book.id} style={styles.reservedCard}>
              <MaterialCommunityIcons name="bookmark-outline" size={24} color="#8b5cf6" />
              <View style={styles.reservedInfo}>
                <Text style={styles.reservedTitle}>{book.title}</Text>
                <Text style={styles.reservedAuthor}>{book.author}</Text>
                <View style={styles.reservedFooter}>
                  <MaterialIcons name="notifications-active" size={14} color="#8b5cf6" />
                  <Text style={styles.reservedAvailable}>Available: {book.available}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Library Hours */}
        <View style={styles.hoursSection}>
          <LinearGradient
            colors={['rgba(59,74,158,0.08)', 'rgba(59,74,158,0.02)']}
            style={styles.hoursCard}
          >
            <View style={styles.hoursHeader}>
              <MaterialIcons name="access-time" size={24} color="#0D1140" />
              <Text style={styles.hoursTitle}>Library Hours</Text>
            </View>
            <View style={styles.hoursRow}>
              <Text style={styles.hoursDay}>Mon - Thu</Text>
              <Text style={styles.hoursTime}>7:00 AM - 11:00 PM</Text>
            </View>
            <View style={styles.hoursRow}>
              <Text style={styles.hoursDay}>Fri - Sat</Text>
              <Text style={styles.hoursTime}>8:00 AM - 9:00 PM</Text>
            </View>
            <View style={styles.hoursRow}>
              <Text style={styles.hoursDay}>Sunday</Text>
              <Text style={styles.hoursTime}>10:00 AM - 8:00 PM</Text>
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

  // Search Section
  searchSection: { padding: 20, paddingBottom: 12 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 },
  searchInput: { flex: 1, fontSize: 15, color: '#0D1140' },

  // Quick Links
  quickLinksSection: { paddingHorizontal: 20, marginBottom: 24 },
  quickLinksGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  quickLinkCard: { width: '48%', backgroundColor: '#fff', borderRadius: 16, padding: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  quickLinkIcon: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  quickLinkLabel: { fontSize: 13, fontWeight: '600', color: '#0D1140', textAlign: 'center' },

  // Sections
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 10 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#0D1140' },
  sectionBadge: { backgroundColor: '#0D114015', color: '#0D1140', fontSize: 14, fontWeight: '700', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },

  // Borrowed Books
  bookCard: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 12, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  bookColorStrip: { height: 4 },
  bookContent: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  bookInfo: { flex: 1 },
  bookTitle: { fontSize: 15, fontWeight: '700', color: '#0D1140', marginBottom: 4 },
  bookAuthor: { fontSize: 14, color: '#6b7280', marginBottom: 8 },
  bookFooter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  bookDueDate: { fontSize: 13, color: '#9aa0c7' },
  renewButton: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },

  // Reserved Books
  reservedCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  reservedInfo: { flex: 1 },
  reservedTitle: { fontSize: 15, fontWeight: '700', color: '#0D1140', marginBottom: 4 },
  reservedAuthor: { fontSize: 14, color: '#6b7280', marginBottom: 6 },
  reservedFooter: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  reservedAvailable: { fontSize: 13, color: '#8b5cf6', fontWeight: '600' },

  // Library Hours
  hoursSection: { paddingHorizontal: 20, marginBottom: 24 },
  hoursCard: { borderRadius: 16, padding: 20, borderWidth: 1, borderColor: 'rgba(59,74,158,0.1)' },
  hoursHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  hoursTitle: { fontSize: 18, fontWeight: '700', color: '#0D1140' },
  hoursRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  hoursDay: { fontSize: 15, color: '#6b7280', fontWeight: '500' },
  hoursTime: { fontSize: 15, color: '#0D1140', fontWeight: '600' },
});

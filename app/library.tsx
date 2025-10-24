import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Library() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showStudyRoomModal, setShowStudyRoomModal] = useState(false);
  const [borrowedBooks, setBorrowedBooks] = useState([
    { id: '1', title: 'Data Structures and Algorithms', author: 'Thomas Cormen', dueDate: 'Jan 20, 2025', status: 'active', color: '#10b981' },
    { id: '2', title: 'Clean Code', author: 'Robert Martin', dueDate: 'Jan 18, 2025', status: 'due-soon', color: '#f59e0b' },
    { id: '3', title: 'The Pragmatic Programmer', author: 'Hunt & Thomas', dueDate: 'Jan 25, 2025', status: 'active', color: '#3b82f6' },
  ]);

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

  const handleRenewBook = (bookId: string, bookTitle: string) => {
    Alert.alert(
      'Renew Book',
      `Renew "${bookTitle}" for 14 more days?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Renew',
          onPress: () => {
            setBorrowedBooks(prev =>
              prev.map(book => {
                if (book.id === bookId) {
                  const newDate = new Date();
                  newDate.setDate(newDate.getDate() + 14);
                  return { ...book, dueDate: newDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }), status: 'active', color: '#10b981' };
                }
                return book;
              })
            );
            Alert.alert('Success', `"${bookTitle}" has been renewed for 14 days!`);
          },
        },
      ]
    );
  };

  const handleQuickLink = (label: string) => {
    switch (label) {
      case 'Search Catalog':
        setShowSearchModal(true);
        break;
      case 'Study Rooms':
        setShowStudyRoomModal(true);
        break;
      case 'E-Resources':
        Alert.alert(
          'E-Resources',
          'Available Resources:\n\n📚 JSTOR\n📚 IEEE Xplore\n📚 SpringerLink\n📚 ScienceDirect\n📚 ProQuest\n\nAccess all resources through your student portal.',
          [{ text: 'OK' }]
        );
        break;
      case 'Ask Librarian':
        Alert.alert(
          'Ask a Librarian',
          'Get help from our librarians:\n\n📧 Email: library@gre.ac.uk\n📞 Phone: +44 20 8331 9000\n💬 Live Chat: Available Mon-Fri 9am-5pm\n\nWe typically respond within 24 hours.',
          [{ text: 'OK' }]
        );
        break;
    }
  };

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
                onPress={() => handleQuickLink(link.label)}
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
                  onPress={() => handleRenewBook(book.id, book.title)}
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

      {/* Search Catalog Modal */}
      <Modal
        visible={showSearchModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSearchModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Search Catalog</Text>
              <TouchableOpacity onPress={() => setShowSearchModal(false)}>
                <MaterialIcons name="close" size={24} color="#0D1140" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <TextInput
                style={styles.searchModalInput}
                placeholder="Search for books, journals, articles..."
                placeholderTextColor="#9aa0c7"
                autoFocus
              />

              <Text style={styles.popularTitle}>Popular Searches</Text>
              {['Computer Science', 'Engineering', 'Business Studies', 'Mathematics', 'Psychology'].map((term, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.popularItem}
                  onPress={() => {
                    setShowSearchModal(false);
                    Alert.alert('Search Results', `Showing results for "${term}"`);
                  }}
                >
                  <MaterialIcons name="search" size={20} color="#9aa0c7" />
                  <Text style={styles.popularText}>{term}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* Study Room Modal */}
      <Modal
        visible={showStudyRoomModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowStudyRoomModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book Study Room</Text>
              <TouchableOpacity onPress={() => setShowStudyRoomModal(false)}>
                <MaterialIcons name="close" size={24} color="#0D1140" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.roomsTitle}>Available Study Rooms</Text>
              {[
                { name: 'Study Room A', capacity: '4 people', status: 'Available', color: '#10b981' },
                { name: 'Study Room B', capacity: '6 people', status: 'Available', color: '#10b981' },
                { name: 'Study Room C', capacity: '8 people', status: 'Occupied', color: '#ef4444' },
                { name: 'Study Room D', capacity: '4 people', status: 'Available', color: '#10b981' },
              ].map((room, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.roomCard}
                  onPress={() => {
                    if (room.status === 'Available') {
                      setShowStudyRoomModal(false);
                      Alert.alert('Book Room', `Book ${room.name}?`, [
                        { text: 'Cancel', style: 'cancel' },
                        {
                          text: 'Book',
                          onPress: () => Alert.alert('Success', `${room.name} booked for 2 hours!`),
                        },
                      ]);
                    }
                  }}
                  disabled={room.status === 'Occupied'}
                >
                  <View style={styles.roomInfo}>
                    <Text style={styles.roomName}>{room.name}</Text>
                    <Text style={styles.roomCapacity}>{room.capacity}</Text>
                  </View>
                  <View style={[styles.roomStatus, { backgroundColor: room.color + '15' }]}>
                    <View style={[styles.roomStatusDot, { backgroundColor: room.color }]} />
                    <Text style={[styles.roomStatusText, { color: room.color }]}>
                      {room.status}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
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

  // Modals
  modalOverlay: { flex: 1, backgroundColor: 'rgba(13,17,64,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#e8eaf0' },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#0D1140' },
  modalBody: { padding: 20 },
  searchModalInput: { backgroundColor: '#f8f9fb', borderRadius: 12, padding: 16, fontSize: 16, color: '#0D1140', marginBottom: 24 },
  popularTitle: { fontSize: 16, fontWeight: '700', color: '#0D1140', marginBottom: 12 },
  popularItem: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#f8f9fb', borderRadius: 12, marginBottom: 10, gap: 12 },
  popularText: { fontSize: 15, color: '#0D1140', fontWeight: '500' },
  roomsTitle: { fontSize: 16, fontWeight: '700', color: '#0D1140', marginBottom: 16 },
  roomCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f9fb', borderRadius: 16, padding: 18, marginBottom: 12 },
  roomInfo: { flex: 1 },
  roomName: { fontSize: 16, fontWeight: '700', color: '#0D1140', marginBottom: 6 },
  roomCapacity: { fontSize: 14, color: '#9aa0c7' },
  roomStatus: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, gap: 6 },
  roomStatusDot: { width: 6, height: 6, borderRadius: 3 },
  roomStatusText: { fontSize: 13, fontWeight: '600' },
});

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../../src/utils/api';
import Colors from '../../src/constants/Colors';

interface Book {
  _id: string;
  title: string;
  author: string;
  isbn: string;
  available: boolean;
  location: string;
  campus: string;
}

export default function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBooks = async (query = '') => {
    try {
      const response = await api.get(`/library${query ? `?query=${query}` : ''}`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBooks(searchQuery);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.length >= 2 || text.length === 0) {
      fetchBooks(text);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search books, authors, ISBN..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor={Colors.textSecondary}
        />
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {loading ? (
          <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
        ) : books.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="book-outline" size={64} color={Colors.textSecondary} />
            <Text style={styles.emptyText}>
              {searchQuery ? 'No books found' : 'No books available'}
            </Text>
          </View>
        ) : (
          books.map((book) => (
            <View key={book._id} style={styles.bookCard}>
              <View style={styles.bookHeader}>
                <View style={styles.bookIcon}>
                  <Ionicons name="book" size={32} color={Colors.primary} />
                </View>
                <View style={styles.bookInfo}>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <Text style={styles.bookAuthor}>by {book.author}</Text>
                </View>
                <View
                  style={[
                    styles.availabilityBadge,
                    book.available ? styles.availableBadge : styles.unavailableBadge,
                  ]}
                >
                  <Text
                    style={[
                      styles.availabilityText,
                      book.available ? styles.availableText : styles.unavailableText,
                    ]}
                  >
                    {book.available ? 'Available' : 'Borrowed'}
                  </Text>
                </View>
              </View>
              <View style={styles.bookDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="barcode" size={16} color={Colors.textSecondary} />
                  <Text style={styles.detailText}>ISBN: {book.isbn}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="location" size={16} color={Colors.textSecondary} />
                  <Text style={styles.detailText}>{book.location}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="business" size={16} color={Colors.textSecondary} />
                  <Text style={styles.detailText}>{book.campus} Campus</Text>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: Colors.text,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingTop: 8,
  },
  loader: {
    marginTop: 32,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 16,
    textAlign: 'center',
  },
  bookCard: {
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
  bookHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bookIcon: {
    width: 48,
    height: 48,
    backgroundColor: Colors.lightBlue,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  availabilityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availableBadge: {
    backgroundColor: '#E8F5E9',
  },
  unavailableBadge: {
    backgroundColor: '#FFEBEE',
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  availableText: {
    color: Colors.success,
  },
  unavailableText: {
    color: Colors.error,
  },
  bookDetails: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginLeft: 8,
  },
});
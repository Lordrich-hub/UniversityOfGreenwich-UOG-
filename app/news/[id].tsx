import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function NewsDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const newsId = params.id as string;

  // Mock news data - in production this would come from an API or database
  // Expanded newsData to support hero slide IDs
  const newsData: Record<string, { title: string; date: string; category: string; content: string }> = {
    'news-1': {
      title: 'New library wing opens on Monday',
      date: 'October 20, 2025',
      category: 'Announcements',
      content: `The University of Greenwich is pleased to announce the opening of our brand new library wing this coming Monday.\n\nThe new wing features:\n• 200 additional study spaces with modern ergonomic furniture\n• 50 private study rooms available for booking\n• State-of-the-art computer lab with 100 workstations\n• Collaborative learning spaces with interactive displays\n• Extended opening hours: 7am - 11pm during term time\n\nAll students and staff are welcome to visit and explore the new facilities. A formal opening ceremony will be held at 10am on Monday in the main atrium.\n\nFor more information or to book study spaces, please visit the library portal or contact the main desk.`,
    },
    'news-2': {
      title: 'Freshers fair this Friday',
      date: 'October 18, 2025',
      category: 'Events',
      content: `Join us this Friday for the annual Freshers Fair!\n\nMeet representatives from over 100 student societies, sports clubs, and community organizations. Whether you're interested in sports, arts, volunteering, or making new friends, there's something for everyone.\n\nEvent Details:\n• Date: Friday, October 25, 2025\n• Time: 11am - 4pm\n• Location: Student Hub Main Hall\n• Free entry for all students\n\nDon't miss out on exclusive sign-up offers, free merchandise, and the chance to win prizes throughout the day!`,
    },
    'news-3': {
      title: 'Term timetables published',
      date: 'October 15, 2025',
      category: 'Academic',
      content: `Timetables for the upcoming term have been published and are now available on the student portal.\n\nAll students should review their timetables carefully and report any clashes or issues to the academic registry office within 48 hours.\n\nKey dates:\n• Term starts: November 1, 2025\n• Reading week: December 9-13, 2025\n• Term ends: December 20, 2025\n\nPlease note that some courses may have room changes from last term. Check your timetable regularly for updates.`,
    },
    'news-4': {
      title: 'Scholarships deadline: 30th Oct',
      date: 'October 12, 2025',
      category: 'Funding',
      content: `Reminder: The deadline for scholarship applications is fast approaching!\n\nAvailable scholarships include:\n• Academic Excellence Scholarship (up to £5,000)\n• Sports Achievement Award (up to £3,000)\n• Community Leadership Grant (up to £2,500)\n• International Student Bursary (up to £4,000)\n\nTo apply, visit the scholarships portal and complete the online application form. You will need to provide:\n• Academic transcripts\n• Personal statement (max 500 words)\n• Two references\n• Supporting documentation (varies by scholarship)\n\nApplications close at 11:59pm on October 30, 2025. Late applications will not be considered.\n\nFor questions, contact the Student Finance Office.`,
    },
    // Add hero slide IDs for announcement section
    'news-hero-1': {
      title: 'Campus Updates: New Library Opening & Term Timetable',
      date: 'October 21, 2025',
      category: 'University News',
      content: `The new library is officially open! Explore new study spaces, updated term timetables, and more.\n\nVisit the campus portal for details.`,
    },
    'news-hero-2': {
      title: 'Dreadnought building now open late',
      date: 'October 21, 2025',
      category: 'University News',
      content: `The Dreadnought building is now open until midnight. Enjoy extended access to facilities and study areas.`,
    },
    'news-hero-3': {
      title: 'Library extended hours this weekend',
      date: 'October 21, 2025',
      category: 'Library',
      content: `Library hours are extended this weekend for exam prep. Check the schedule for details.`,
    },
    'news-hero-4': {
      title: 'New study spaces in library building',
      date: 'October 21, 2025',
      category: 'Campus',
      content: `Discover new collaborative and quiet study spaces in the library building. Available now!`,
    },
  };

  const article = newsData[newsId] || {
    title: 'Article not found',
    date: '',
    category: 'Unknown',
    content: 'The requested article could not be found.',
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>News</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: insets.bottom + 30 }}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{article.category}</Text>
        </View>

        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.date}>{article.date}</Text>

        <Image
          source={require('../../assets/images/UOG.png')}
          style={styles.heroImage}
          resizeMode="cover"
        />

        <Text style={styles.body}>{article.content}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#0D1140',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  categoryBadge: {
    backgroundColor: 'rgba(13,17,64,0.08)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(13,17,64,0.15)',
    marginTop: 16,
    marginBottom: 12,
  },
  categoryText: {
    color: '#0D1140',
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    color: '#0D1140',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
    lineHeight: 36,
  },
  date: {
    color: '#46507a',
    fontSize: 14,
    marginBottom: 20,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 24,
  },
  body: {
    color: '#0D1140',
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 24,
  },
});

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Support() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const quickHelp = [
    { icon: 'phone', label: 'Call Support', subtitle: '+44 20 8331 8000', color: '#10b981' },
    { icon: 'email', label: 'Email Us', subtitle: 'support@gre.ac.uk', color: '#3b82f6' },
    { icon: 'chat', label: 'Live Chat', subtitle: 'Chat with our team', color: '#8b5cf6' },
    { icon: 'bug-report', label: 'Report Bug', subtitle: 'Tell us what went wrong', color: '#ef4444' },
  ];

  const faqs = [
    {
      category: 'Account',
      questions: [
        { q: 'How do I reset my password?', a: 'Go to Settings > Privacy & Security > Change Password' },
        { q: 'How do I update my profile picture?', a: 'Tap your profile picture and select "Take Photo" or "Choose from Library"' },
        { q: 'Can I change my email address?', a: 'Your email is synced from the university database and cannot be changed in the app' },
      ],
    },
    {
      category: 'Academic',
      questions: [
        { q: 'When are grades posted?', a: 'Grades are typically posted within 2 weeks of exam completion' },
        { q: 'How do I view my GPA?', a: 'Navigate to Settings > Academic > Grades/GPA' },
        { q: 'Where can I find my course schedule?', a: 'Check the Timetable tab in the main navigation' },
      ],
    },
    {
      category: 'Services',
      questions: [
        { q: 'How do I pay my tuition?', a: 'Go to Settings > Services > Finance and tap "Make Payment"' },
        { q: 'How do I renew library books?', a: 'Visit Settings > Services > Library and tap the renew button next to your borrowed books' },
        { q: 'How do I check my meal plan balance?', a: 'Navigate to Settings > Services > Meal Plan' },
      ],
    },
  ];

  const handleQuickHelp = (item: typeof quickHelp[0]) => {
    if (item.label === 'Call Support') {
      Alert.alert('Call Support', `Would you like to call ${item.subtitle}?`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Call', onPress: () => alert(`Calling ${item.subtitle}...`) },
      ]);
    } else if (item.label === 'Email Us') {
      Alert.alert('Email Support', `Send email to ${item.subtitle}?`);
    } else if (item.label === 'Live Chat') {
      Alert.alert('Live Chat', 'Live chat coming soon');
    } else if (item.label === 'Report Bug') {
      Alert.alert('Report Bug', 'Bug reporting form coming soon');
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
        <Text style={styles.headerTitle}>Help & Support</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={22} color="#9aa0c7" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for help..."
              placeholderTextColor="#9aa0c7"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Quick Help */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Help</Text>
          <View style={styles.quickHelpGrid}>
            {quickHelp.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickHelpCard}
                onPress={() => handleQuickHelp(item)}
              >
                <View style={[styles.quickHelpIcon, { backgroundColor: item.color + '15' }]}>
                  <MaterialIcons name={item.icon as any} size={28} color={item.color} />
                </View>
                <Text style={styles.quickHelpLabel}>{item.label}</Text>
                <Text style={styles.quickHelpSubtitle}>{item.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map((category, categoryIndex) => (
            <View key={categoryIndex} style={styles.faqCategory}>
              <Text style={styles.faqCategoryTitle}>{category.category}</Text>
              {category.questions.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={styles.faqCard}
                  onPress={() => Alert.alert(item.q, item.a)}
                >
                  <View style={styles.faqIconBox}>
                    <MaterialCommunityIcons name="help-circle-outline" size={20} color="#3b82f6" />
                  </View>
                  <View style={styles.faqInfo}>
                    <Text style={styles.faqQuestion}>{item.q}</Text>
                    <Text style={styles.faqAnswer} numberOfLines={1}>{item.a}</Text>
                  </View>
                  <MaterialIcons name="chevron-right" size={22} color="#9aa0c7" />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Contact Card */}
        <View style={styles.contactSection}>
          <LinearGradient
            colors={['#3b82f6', '#2563eb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.contactCard}
          >
            <MaterialCommunityIcons name="lifebuoy" size={48} color="#fff" />
            <Text style={styles.contactTitle}>Still need help?</Text>
            <Text style={styles.contactSubtitle}>Our support team is here 24/7</Text>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={() => Alert.alert('Contact Support', 'Choose your preferred contact method', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Call', onPress: () => alert('Calling...') },
                { text: 'Email', onPress: () => alert('Opening email...') },
              ])}
            >
              <Text style={styles.contactButtonText}>Contact Support</Text>
              <MaterialIcons name="arrow-forward" size={18} color="#3b82f6" />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* App Info */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>App Version</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Last Updated</Text>
              <Text style={styles.infoValue}>Jan 2025</Text>
            </View>
          </View>
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

  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#0D1140', marginBottom: 16 },

  // Quick Help
  quickHelpGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  quickHelpCard: { width: '48%', backgroundColor: '#fff', borderRadius: 16, padding: 18, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  quickHelpIcon: { width: 64, height: 64, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  quickHelpLabel: { fontSize: 14, fontWeight: '700', color: '#0D1140', textAlign: 'center', marginBottom: 4 },
  quickHelpSubtitle: { fontSize: 11, color: '#9aa0c7', textAlign: 'center' },

  // FAQs
  faqCategory: { marginBottom: 20 },
  faqCategoryTitle: { fontSize: 16, fontWeight: '700', color: '#6b7280', marginBottom: 12 },
  faqCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
  faqIconBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#3b82f615', alignItems: 'center', justifyContent: 'center' },
  faqInfo: { flex: 1 },
  faqQuestion: { fontSize: 14, fontWeight: '600', color: '#0D1140', marginBottom: 4 },
  faqAnswer: { fontSize: 12, color: '#9aa0c7' },

  // Contact Card
  contactSection: { paddingHorizontal: 20, marginBottom: 24 },
  contactCard: { borderRadius: 20, padding: 28, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 },
  contactTitle: { fontSize: 20, fontWeight: '800', color: '#fff', marginTop: 16, marginBottom: 6 },
  contactSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 20 },
  contactButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 14, gap: 8 },
  contactButtonText: { fontSize: 15, fontWeight: '600', color: '#3b82f6' },

  // App Info
  infoSection: { paddingHorizontal: 20, marginBottom: 24 },
  infoCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  infoLabel: { fontSize: 14, color: '#6b7280', fontWeight: '500' },
  infoValue: { fontSize: 14, color: '#0D1140', fontWeight: '600' },
  infoDivider: { height: 1, backgroundColor: '#e8eaf0', marginVertical: 8 },
});

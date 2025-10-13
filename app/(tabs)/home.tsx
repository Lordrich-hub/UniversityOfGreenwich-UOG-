import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


// removed fixed top-level HERO_HEIGHT to compute it per-device inside the component

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { height: winH, width: winW } = useWindowDimensions();

  // Responsive hero: scale with window height but clamp to sensible min/max
  let heroHeight = Math.round(Math.max(200, Math.min(winH * 0.42, 420)));
  // On very wide screens (tablets), give a taller hero
  if (winW >= 768) heroHeight = Math.round(Math.max(320, Math.min(winH * 0.5, 700)));

  // small extra offset to nudge header content slightly downward
  // increase this to drop header items (scanner, logo, avatar) further
  const extraOffset = 32;

  // compute header and button positions so items can be centered visually
  const headerHeight = (insets.top || 8) + 56 + extraOffset;
  const buttonSize = 44;
  // The logo is translated down by extraOffset/2; shift buttons by same amount so they align
  const buttonTop = Math.round((headerHeight - buttonSize) / 2 + extraOffset / 2);

  const FEEDS = [
    { id: 'news-1', title: 'New library wing opens on Monday', meta: 'Announcements · 2 hours ago' },
    { id: 'news-2', title: 'Freshers fair this Friday', meta: 'Events · 1 day ago' },
    { id: 'news-3', title: 'Term timetables published', meta: 'Academic · 3 days ago' },
    { id: 'news-4', title: 'Scholarships deadline: 30th Oct', meta: 'Funding · 5 days ago' },
  ];
  return (
    <View style={styles.page}>
      {/* Header with side buttons at edges and absolutely centered logo */}
  <View style={[styles.header, { paddingTop: (insets.top || 8) + extraOffset, height: (insets.top || 0) + 56 + extraOffset }]}> 
        {/* left edge button - absolutely positioned so center stays exact */}
        <TouchableOpacity style={[styles.edgeLeft, { top: buttonTop, height: buttonSize, justifyContent: 'center' }]} onPress={() => alert('Scan (placeholder)')}> 
          <MaterialIcons name="qr-code-scanner" size={28} color="#fff" />
        </TouchableOpacity>

        {/* right edge button */}
        <TouchableOpacity style={[styles.edgeRight, { top: buttonTop }]} onPress={() => alert('Profile (placeholder)')}> 
          <View style={[styles.avatar, { width: 44, height: 44, borderRadius: 22 }]}> 
            <Text style={styles.avatarText}>L</Text>
          </View>
        </TouchableOpacity>

        {/* absolutely centered logo (moved down by half extraOffset to match buttons) */}
        <View style={[styles.centerContainer, { transform: [{ translateY: extraOffset / 2 }] }]} pointerEvents="none">
          <Image
            source={require('../../assets/images/uog_logo.png')}
            style={[styles.headerLogoCentered, { width: Math.min(220, Math.round(winW * 0.46)), height: 48, tintColor: '#fff' }]}
            resizeMode="contain"
          />
        </View>
      </View>

      <ScrollView style={styles.contentScroll} contentContainerStyle={{ paddingBottom: insets.bottom + 30 }}>
        <ImageBackground source={require('../../assets/images/UOG.png')} style={[styles.hero, { height: heroHeight }]} resizeMode="cover" />

        <View style={styles.container}>
        <View style={styles.heroTextWrap}>
          <Text style={styles.heroBadge}>University News</Text>
          <Text style={styles.heroTitle}>Campus Updates: New Library Opening & Term Timetable</Text>
          <Text style={styles.heroMeta}>{'Announcements · 2 hours ago'}</Text>
        </View>

        <View style={styles.cardLarge}>
          <Text style={styles.cardTitle}>Latest</Text>
          <Text style={styles.cardSub}>Select an item below to read more.</Text>
        </View>

          {FEEDS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.cardRowItem}
              onPress={() => router.push({ pathname: '/news/[id]', params: { id: item.id } })}
            >
              <Image source={require('../../assets/images/uog_logo.png')} style={styles.thumb} />
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSub}>{item.meta}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Student Life</Text>
            <Text style={styles.cardSub}>Coffee morning in the Student Hub · Society sign-ups open</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Academic</Text>
            <Text style={styles.cardSub}>Office hours updated for Mathematics department · New lecture notes uploaded</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Support</Text>
            <Text style={styles.cardSub}>Counselling appointments available — book via student portal</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#0D1140' },
  contentScroll: { flex: 1 },
  header: { height: 56, backgroundColor: '#0D1140', alignItems: 'center', justifyContent: 'center', paddingTop: 8 },
  headerLogo: { position: 'absolute', alignSelf: 'center', width: 120, height: 36 },
  headerLogoCentered: { width: 120, height: 36, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.35, shadowRadius: 4, elevation: 3 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  headerCenter: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  iconButton: { padding: 8, marginRight: 8 },
  leftButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  edgeLeft: { position: 'absolute', left: 12, justifyContent: 'center' },
  edgeRight: { position: 'absolute', right: 12, justifyContent: 'center' },
  centerContainer: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  avatarTextButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#3b4a9e', textAlign: 'center', lineHeight: 44, color: '#fff', fontWeight: '700' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#3b4a9e', alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '700' },
  hero: { width: '100%' },
  heroTextWrap: { padding: 16 },
  heroBadge: { color: '#fff', backgroundColor: 'rgba(255,255,255,0.08)', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16, marginBottom: 10 },
  heroTitle: { color: '#fff', fontSize: 20, fontWeight: '800', marginBottom: 6 },
  heroMeta: { color: '#c8cfee' },
  container: { padding: 16 },
  cardLarge: { backgroundColor: '#0f1538', borderRadius: 14, padding: 18, marginBottom: 12 },
  card: { backgroundColor: '#0f1538', borderRadius: 14, padding: 14, marginBottom: 12 },
  cardRowItem: { backgroundColor: '#0f1538', borderRadius: 12, padding: 12, marginBottom: 12, flexDirection: 'row', alignItems: 'center' },
  thumb: { width: 66, height: 66, borderRadius: 8, marginRight: 12 },
  cardTitle: { color: '#fff', fontWeight: '800', fontSize: 16, marginBottom: 6 },
  cardSub: { color: '#c8cfee' },
});

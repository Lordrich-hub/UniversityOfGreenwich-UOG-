import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
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

  // Overlay tuning (lighter and more even)
  const HERO_BLUR_INTENSITY = 14; // lighter blur
  const HERO_OVERLAY_HEIGHT = 124; // slightly shorter overlay
  // Gradient that softly fades in from top to bottom (lighter than before)
  const HERO_GRADIENT_COLORS = ['rgba(13,17,64,0)', 'rgba(13,17,64,0.18)', 'rgba(13,17,64,0.35)'];
  const HERO_GRADIENT_LOCATIONS = [0, 0.5, 1];

  const HERO_SLIDES = useMemo(() => ([
    {
      id: 'hero-1',
      image: require('../../assets/images/UOG.png'),
      category: 'University News',
      title: 'Campus Updates: New Library Opening & Term Timetable',
      meta: 'Announcements · 2 hours ago',
      newsId: 'news-hero-1',
    },
    {
      id: 'hero-2',
      image: require('../../assets/images/dreadnought.png'),
      category: 'University News',
      title: 'Dreadnought building now open late',
      meta: 'Facilities · 1 hour ago',
      newsId: 'news-hero-2',
    },
    {
      id: 'hero-3',
      image: require('../../assets/images/library.png'),
      category: 'Library',
      title: 'Library extended hours this weekend',
      meta: 'Announcements · 3 hours ago',
      newsId: 'news-hero-3',
    },
    {
      id: 'hero-4',
      image: require('../../assets/images/librarybuilding.png'),
      category: 'Campus',
      title: 'New study spaces in library building',
      meta: 'Campus · today',
      newsId: 'news-hero-4',
    },
  ]), []);

  const [activeIndex, setActiveIndex] = useState(0);
  const heroRef = useRef<FlatList<any>>(null);
  const SLIDE_COUNT = HERO_SLIDES.length;
  const LOOP_FACTOR = 400; // large enough to simulate infinite list
  const VIRTUAL_COUNT = SLIDE_COUNT * LOOP_FACTOR;
  const VIRTUAL_START_INDEX = Math.floor(VIRTUAL_COUNT / 2);
  const currentIndexRef = useRef(VIRTUAL_START_INDEX);

  // Auto-advance the hero every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      const next = currentIndexRef.current + 1;
      currentIndexRef.current = next;
      // Update active index modulo the number of real slides
      setActiveIndex(next % SLIDE_COUNT);
      heroRef.current?.scrollToIndex({ index: next, animated: true });
    }, 10000);
    return () => clearInterval(timer);
  }, [SLIDE_COUNT]);

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
        {/* Hero carousel */}
        <FlatList
          ref={heroRef}
          data={Array.from({ length: VIRTUAL_COUNT }, (_, i) => ({
            ...HERO_SLIDES[i % SLIDE_COUNT],
            _vkey: `${i}-${HERO_SLIDES[i % SLIDE_COUNT].id}`,
          }))}
          keyExtractor={(item) => item._vkey}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={VIRTUAL_START_INDEX}
          getItemLayout={(_, index) => ({ length: winW, offset: winW * index, index })}
          onMomentumScrollEnd={(e) => {
            const idx = Math.round(e.nativeEvent.contentOffset.x / winW);
            currentIndexRef.current = idx;
            setActiveIndex(idx % SLIDE_COUNT);
            // Soft wrap-around: if too close to edges, jump back to middle quietly
            const EDGE_BUFFER = SLIDE_COUNT * 2;
            if (idx < EDGE_BUFFER || idx > VIRTUAL_COUNT - EDGE_BUFFER) {
              const newIndex = VIRTUAL_START_INDEX + (idx % SLIDE_COUNT);
              currentIndexRef.current = newIndex;
              requestAnimationFrame(() => {
                heroRef.current?.scrollToIndex({ index: newIndex, animated: false });
              });
            }
          }}
          renderItem={({ item }) => (
            <View style={[styles.heroSlide, { width: winW, height: heroHeight }]}>
              <ImageBackground source={item.image} style={StyleSheet.absoluteFill} resizeMode="cover" />
              {/* Bottom overlay with blur */}
              <View style={styles.heroOverlayWrap}>
                <BlurView intensity={HERO_BLUR_INTENSITY} tint="dark" style={[styles.heroBlur, { height: HERO_OVERLAY_HEIGHT }]} />
                <LinearGradient
                  colors={HERO_GRADIENT_COLORS}
                  locations={HERO_GRADIENT_LOCATIONS}
                  style={[styles.heroGradient, { height: HERO_OVERLAY_HEIGHT }]}
                  pointerEvents="none"
                />
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.heroTextArea}
                  onPress={() => router.push({ pathname: '/news/[id]', params: { id: item.newsId } })}
                >
                  <Text style={styles.heroBadge}> {item.category} </Text>
                  <Text style={styles.heroTitle}>{item.title}</Text>
                  <Text style={styles.heroMeta}>{item.meta}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        {/* Carousel dots */}
        <View style={[styles.dotsWrap, { width: winW, bottom: 16 }]}>
          {HERO_SLIDES.map((_, i) => (
            <TouchableOpacity
              key={`dot-${i}`}
              onPress={() => {
                const target = VIRTUAL_START_INDEX + i;
                currentIndexRef.current = target;
                setActiveIndex(i);
                heroRef.current?.scrollToIndex({ index: target, animated: true });
              }}
              style={[styles.dot, i === activeIndex && styles.dotActive]}
              accessibilityRole="button"
              accessibilityLabel={`Go to slide ${i + 1}`}
            />
          ))}
        </View>

        <View style={styles.container}>

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
  heroSlide: { width: '100%', overflow: 'hidden' },
  heroOverlayWrap: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 16, paddingBottom: 16 },
  heroBlur: { ...StyleSheet.absoluteFillObject, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  heroGradient: { ...StyleSheet.absoluteFillObject, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
  heroTextArea: { padding: 16 },
  dotsWrap: { position: 'absolute', left: 0, right: 0, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 },
  dot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: 'rgba(255,255,255,0.35)', marginHorizontal: 4 },
  dotActive: { backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4 },
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

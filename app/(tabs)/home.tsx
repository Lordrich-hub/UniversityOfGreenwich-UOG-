import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
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

  // Overlay tuning (no blur, clean brand gradient fade)
  const HERO_OVERLAY_HEIGHT = 168; // taller fade for readability
  const HERO_GRADIENT_COLORS = ['rgba(13,17,64,0)', 'rgba(13,17,64,0.45)', 'rgba(13,17,64,0.92)'] as const;
  const HERO_GRADIENT_LOCATIONS = [0, 0.55, 1] as const;

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

  const FEED_ITEMS = [
    { 
      id: 'news-1', 
      title: 'Campus Life at Greenwich', 
      subtitle: 'Explore the vibrant student community',
      image: require('../../assets/images/greenwich-01.png'),
      category: 'Featured',
      type: 'large'
    },
    { 
      id: 'news-2', 
      title: 'Graduation Ceremony 2025', 
      subtitle: 'Celebrating our graduating class',
      image: require('../../assets/images/graduation.png'),
      category: 'Events',
      type: 'small'
    },
    { 
      id: 'news-3', 
      title: 'University of Greenwich Pembroke Building', 
      subtitle: 'State-of-the-art facilities',
      image: require('../../assets/images/University-Greenwich-Pembroke.jpg'),
      category: 'Campus',
      type: 'small'
    },
    { 
      id: 'news-4', 
      title: 'Academic Excellence', 
      subtitle: 'Supporting your learning journey',
      image: require('../../assets/images/OIP.png'),
      category: 'Academic',
      type: 'small'
    },
  ];
  return (
    <View style={styles.page}>
      {/* Header with side buttons at edges and absolutely centered logo */}
  <View style={[styles.header, { paddingTop: (insets.top || 8) + extraOffset, height: (insets.top || 0) + 56 + extraOffset }]}> 
        {/* left edge button - absolutely positioned so center stays exact */}
  <TouchableOpacity style={[styles.edgeLeft, { top: buttonTop, height: buttonSize, justifyContent: 'center' }]} onPress={() => router.push('/(tabs)/scan')}> 
          <MaterialIcons name="qr-code-scanner" size={28} color="#fff" />
        </TouchableOpacity>

        {/* right edge button */}
  <TouchableOpacity style={[styles.edgeRight, { top: buttonTop }]} onPress={() => router.push('/profile')}> 
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
          onMomentumScrollEnd={async (e) => {
            const idx = Math.round(e.nativeEvent.contentOffset.x / winW);
            currentIndexRef.current = idx;
            setActiveIndex(idx % SLIDE_COUNT);
            // light haptic feedback when slide settles
            try { await Haptics.selectionAsync(); } catch {}
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
              {/* Bottom overlay with gradient (no blur) */}
              <View style={styles.heroOverlayWrap}>
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

        {/* Carousel indicators in the gap between hero and Latest */}
        <View style={styles.dotsBetween}>
          <View style={styles.dotRow}>
            {HERO_SLIDES.map((_, i) => (
              <TouchableOpacity
                key={`dot-${i}`}
                onPress={() => {
                  const target = VIRTUAL_START_INDEX + i;
                  currentIndexRef.current = target;
                  setActiveIndex(i);
                  heroRef.current?.scrollToIndex({ index: target, animated: true });
                }}
                style={[styles.dotBar, i === activeIndex && styles.dotBarActive]}
                accessibilityRole="button"
                accessibilityLabel={`Go to slide ${i + 1}`}
              />
            ))}
          </View>
        </View>

        {/* Latest section - white background */}
        <View style={styles.latestSection}>
          <View style={styles.latestHeader}>
            <Text style={styles.latestTitle}>Latest</Text>
            <TouchableOpacity onPress={() => router.push('/news')}>
              <Text style={styles.seeAllText}>See all  ›</Text>
            </TouchableOpacity>
          </View>

          {FEED_ITEMS.map((item) => (
            item.type === 'large' ? (
              <TouchableOpacity
                key={item.id}
                style={styles.featuredCard}
                onPress={() => router.push({ pathname: '/news/[id]', params: { id: item.id } })}
              >
                <Image source={item.image} style={styles.featuredImage} resizeMode="cover" />
                <View style={styles.featuredContent}>
                  <Text style={styles.featuredTitle}>{item.title}</Text>
                  <Text style={styles.featuredCategory}>{item.category}</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                key={item.id}
                style={styles.smallCard}
                onPress={async () => { try { await Haptics.selectionAsync(); } catch {}; router.push({ pathname: '/news/[id]', params: { id: item.id } }); }}
              >
                <Image source={item.image} style={styles.smallImage} resizeMode="cover" />
                <View style={styles.smallContent}>
                  <Text style={styles.smallTitle}>{item.title}</Text>
                  <Text style={styles.smallSubtitle}>{item.subtitle}</Text>
                  <Text style={styles.smallCategory}>{item.category}</Text>
                </View>
              </TouchableOpacity>
            )
          ))}
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
  heroOverlayWrap: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 0, paddingBottom: 0 },
  heroGradient: { ...StyleSheet.absoluteFillObject },
  heroTextArea: { padding: 16, paddingBottom: 20 },
  dotsWrap: { position: 'absolute', left: 0, right: 0, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 6 },
  dot: { width: 7, height: 7, borderRadius: 3.5, backgroundColor: 'rgba(255,255,255,0.35)', marginHorizontal: 4 },
  dotActive: { backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4 },
  heroBadge: { color: '#fff', backgroundColor: 'rgba(255,255,255,0.18)', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 16, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(200,207,238,0.2)' },
  heroTitle: { color: '#fff', fontSize: 26, lineHeight: 30, fontWeight: '800', marginBottom: 6 },
  heroMeta: { color: '#c8cfee' },
  // Latest section - white background with dark blue text
  latestSection: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: 8, paddingTop: 32, paddingHorizontal: 16, paddingBottom: 24 },
  latestHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  latestTitle: { fontSize: 28, fontWeight: '800', color: '#0D1140' },
  seeAllText: { fontSize: 16, fontWeight: '600', color: '#0D1140' },
  // Dots between hero and Latest styled as small bars
  dotsBetween: { paddingVertical: 10, alignItems: 'center' },
  dotRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14 },
  dotBar: { width: 24, height: 3, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.35)' },
  dotBarActive: { width: 32, height: 3.5, borderRadius: 2, backgroundColor: '#fff' },
  // Featured large card
  featuredCard: { backgroundColor: '#f8f9fb', borderRadius: 16, marginBottom: 16, overflow: 'hidden' },
  featuredImage: { width: '100%', height: 220 },
  featuredContent: { padding: 16 },
  featuredTitle: { fontSize: 22, fontWeight: '800', color: '#0D1140', marginBottom: 8 },
  featuredCategory: { fontSize: 14, color: '#6b7280', fontWeight: '500' },
  // Small cards with image on right
  smallCard: { backgroundColor: '#f8f9fb', borderRadius: 12, marginBottom: 12, flexDirection: 'row', overflow: 'hidden', padding: 12 },
  smallImage: { width: 120, height: 100, borderRadius: 8 },
  smallContent: { flex: 1, paddingRight: 12, justifyContent: 'center', marginLeft: 12 },
  smallTitle: { fontSize: 16, fontWeight: '700', color: '#0D1140', marginBottom: 4 },
  smallSubtitle: { fontSize: 13, color: '#6b7280', marginBottom: 6 },
  smallCategory: { fontSize: 12, color: '#0D1140', fontWeight: '600', opacity: 0.6 },
});

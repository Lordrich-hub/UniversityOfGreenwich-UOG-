import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

// Adjust these constants to change visual spacing and size easily
const GAP_UNDER_COMPASS = 80; // distance between compass (top logo) and the text logo
const TEXT_LOGO_HEIGHT = 104; // height of the Greenwich text logo

export default function Index() {
  const router = useRouter();
  
  // Animation values for the main logo (uog_logo.png)
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.7);
  
  // Animation values for the text logo (Greenwich-LOGO_writng_only.png)
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(30);

  useEffect(() => {
    // Animate main logo: fade in + scale up (slower for 10s total)
    logoOpacity.value = withTiming(1, { duration: 1200, easing: Easing.out(Easing.cubic) });
    logoScale.value = withTiming(1, { duration: 1200, easing: Easing.out(Easing.cubic) });
    
    // Animate text logo: fade in + slide up (delayed slightly)
    textOpacity.value = withDelay(600, withTiming(1, { duration: 900, easing: Easing.out(Easing.quad) }));
    textTranslateY.value = withDelay(600, withTiming(0, { duration: 900, easing: Easing.out(Easing.quad) }));
    
    // After 9 seconds, fade out both and navigate (total 10s)
    const fadeOutTimer = setTimeout(() => {
      logoOpacity.value = withTiming(0, { duration: 800 });
      logoScale.value = withTiming(0.9, { duration: 800 });
      textOpacity.value = withTiming(0, { duration: 800 });
    }, 9000);
    
    const navTimer = setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 10000);
    
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(navTimer);
    };
  }, [logoOpacity, logoScale, textOpacity, textTranslateY, router]);

  const logoAnimStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));
  
  const textAnimStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoWrap, logoAnimStyle]}>
        <Image source={require('../assets/images/uog_logo.png')} style={[styles.logo, { tintColor: '#fff' }]} resizeMode="contain" />
      </Animated.View>
      
      <Animated.View style={[styles.textLogoWrap, textAnimStyle]}>
        <Image
          source={require('../assets/images/Greenwich-LOGO_writng_only.png')}
          style={[styles.textLogo, { tintColor: '#fff' }]}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1140',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    // Balanced gap under the compass (edit GAP_UNDER_COMPASS above)
    marginBottom: GAP_UNDER_COMPASS,
  },
  logo: {
    width: 200,
    height: 200,
  },
  textLogoWrap: {
    // Normal aspect ratio with generous width but not edge-to-edge
    width: '85%',
    height: TEXT_LOGO_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  textLogo: {
    width: '100%',
    height: TEXT_LOGO_HEIGHT,
  },
});

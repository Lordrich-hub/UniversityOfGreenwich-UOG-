import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated';

export default function Index() {
  const router = useRouter();
  
  // Animation values for the main logo (uog_logo.png)
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.7);
  
  // Animation values for the text logo (Greenwich-LOGO_writng_only.png)
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(30);

  useEffect(() => {
    // Animate main logo: fade in + scale up
    logoOpacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) });
    logoScale.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) });
    
    // Animate text logo: fade in + slide up (delayed slightly)
    textOpacity.value = withDelay(400, withTiming(1, { duration: 600, easing: Easing.out(Easing.quad) }));
    textTranslateY.value = withDelay(400, withTiming(0, { duration: 600, easing: Easing.out(Easing.quad) }));
    
    // After 2.5 seconds, fade out both and navigate
    const fadeOutTimer = setTimeout(() => {
      logoOpacity.value = withTiming(0, { duration: 400 });
      logoScale.value = withTiming(0.9, { duration: 400 });
      textOpacity.value = withTiming(0, { duration: 400 });
    }, 2500);
    
    const navTimer = setTimeout(() => {
      router.replace('/(tabs)/home');
    }, 3000);
    
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
        <Image source={require('../assets/images/uog_logo.png')} style={styles.logo} resizeMode="contain" />
      </Animated.View>
      
      <Animated.View style={[styles.textLogoWrap, textAnimStyle]}>
        <Image source={require('../assets/images/Greenwich-LOGO_writng_only.png')} style={styles.textLogo} resizeMode="contain" />
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
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 180,
    height: 180,
  },
  textLogoWrap: {
    width: 280,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogo: {
    width: 260,
    height: 50,
  },
});

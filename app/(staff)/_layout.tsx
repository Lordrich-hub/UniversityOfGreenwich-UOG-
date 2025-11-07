import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function StaffTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0D1140',
          borderTopColor: 'transparent',
          height: 72,
          marginHorizontal: 16,
          marginBottom: 18,
          borderRadius: 24,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.18,
          shadowRadius: 12,
          elevation: 12,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#9aa0c7',
        tabBarLabelStyle: { fontSize: 13, marginBottom: 2, fontWeight: '600' },
        tabBarIconStyle: { marginBottom: -2 },
        tabBarItemStyle: { marginHorizontal: 8, borderRadius: 16 },
        tabBarHideOnKeyboard: true,
      }}>
      {/* Hide the default index screen from the tab bar */}
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen name="home" options={{
        title: 'Home',
        tabBarIcon: ({ color, focused }) => (
          <MaterialIcons name="home" size={focused ? 30 : 24} color={color} />
        ),
      }} />
      <Tabs.Screen name="classes" options={{
        title: 'Classes',
        tabBarIcon: ({ color, focused }) => (
          <MaterialCommunityIcons name="google-classroom" size={focused ? 30 : 24} color={color} />
        ),
      }} />
      <Tabs.Screen name="attendance" options={{
        title: 'Attendance',
        tabBarIcon: ({ color, focused }) => (
          <MaterialCommunityIcons name="clipboard-check" size={focused ? 30 : 24} color={color} />
        ),
      }} />
      <Tabs.Screen name="announcements" options={{
        title: 'Announce',
        tabBarIcon: ({ color, focused }) => (
          <MaterialIcons name="campaign" size={focused ? 30 : 24} color={color} />
        ),
      }} />
      {/* Hide scan from tab bar - accessible via button */}
      <Tabs.Screen name="scan" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
    </Tabs>
  );
}

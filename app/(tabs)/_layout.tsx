import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0D1140',
          borderTopColor: 'transparent',
          height: 66,
          paddingBottom: 8,
          paddingTop: 6,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          position: 'absolute',
          left: 8,
          right: 8,
          bottom: 10,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#9aa0c7',
        tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
        tabBarIconStyle: { marginBottom: -4 },
        tabBarHideOnKeyboard: true,
      }}>
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: ({ color }) => <MaterialIcons name="home" size={22} color={color} /> }} />
      <Tabs.Screen name="timetable" options={{ title: 'Timetable', tabBarIcon: ({ color }) => <MaterialIcons name="event" size={22} color={color} /> }} />
      <Tabs.Screen name="modules" options={{ title: 'Modules', tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book-open-variant" size={22} color={color} /> }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore', tabBarIcon: ({ color }) => <MaterialIcons name="explore" size={22} color={color} /> }} />
     </Tabs>
  );
}

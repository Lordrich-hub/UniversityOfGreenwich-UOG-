import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MealPlan() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const mealBalance = 145;
  const flexBalance = 82.50;
  const totalMeals = 200;
  const mealsUsed = 55;
  const mealsRemaining = totalMeals - mealsUsed;
  const progressPercent = (mealsUsed / totalMeals) * 100;

  const diningLocations = [
    { 
      id: '1', 
      name: 'Dreadnought Dining Hall', 
      hours: '7:00 AM - 9:00 PM', 
      status: 'open', 
      distance: '2 min walk',
      color: '#10b981',
      icon: 'restaurant' 
    },
    { 
      id: '2', 
      name: 'Greenwich Café', 
      hours: '8:00 AM - 6:00 PM', 
      status: 'open', 
      distance: '5 min walk',
      color: '#3b82f6',
      icon: 'local-cafe' 
    },
    { 
      id: '3', 
      name: 'Library Quick Bites', 
      hours: 'Closed - Opens 7:00 AM', 
      status: 'closed', 
      distance: '3 min walk',
      color: '#9aa0c7',
      icon: 'fastfood' 
    },
    { 
      id: '4', 
      name: 'Student Union Food Court', 
      hours: '11:00 AM - 8:00 PM', 
      status: 'open', 
      distance: '8 min walk',
      color: '#f59e0b',
      icon: 'restaurant-menu' 
    },
  ];

  const recentMeals = [
    { id: '1', location: 'Dreadnought Dining Hall', type: 'Dinner', date: 'Today, 6:30 PM', swipes: 1 },
    { id: '2', location: 'Greenwich Café', type: 'Lunch', date: 'Today, 12:15 PM', swipes: 1 },
    { id: '3', location: 'Dreadnought Dining Hall', type: 'Breakfast', date: 'Today, 8:00 AM', swipes: 1 },
    { id: '4', location: 'Library Quick Bites', type: 'Snack', date: 'Yesterday, 3:45 PM', flex: 4.50 },
  ];

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
        <Text style={styles.headerTitle}>Meal Plan</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        {/* Meal Swipes Card */}
        <View style={styles.balanceSection}>
          <LinearGradient
            colors={['#f59e0b', '#ea580c']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.swipesCard}
          >
            <View style={styles.swipesHeader}>
              <Text style={styles.swipesLabel}>Meal Swipes Remaining</Text>
              <MaterialCommunityIcons name="food-apple" size={28} color="rgba(255,255,255,0.9)" />
            </View>
            <Text style={styles.swipesCount}>{mealsRemaining}</Text>
            <View style={styles.swipesProgress}>
              <View style={styles.swipesProgressBar}>
                <View style={[styles.swipesProgressFill, { width: `${progressPercent}%` }]} />
              </View>
              <Text style={styles.swipesProgressText}>{mealsUsed} of {totalMeals} used</Text>
            </View>
          </LinearGradient>

          {/* Flex Balance */}
          <View style={styles.flexCard}>
            <View style={styles.flexRow}>
              <View style={styles.flexIconBox}>
                <MaterialIcons name="account-balance-wallet" size={24} color="#10b981" />
              </View>
              <View style={styles.flexInfo}>
                <Text style={styles.flexLabel}>Flex Balance</Text>
                <Text style={styles.flexAmount}>£{flexBalance.toFixed(2)}</Text>
              </View>
              <TouchableOpacity style={styles.addFundsButton} onPress={() => alert('Add funds coming soon')}>
                <MaterialIcons name="add" size={20} color="#10b981" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Dining Locations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dining Locations</Text>
          {diningLocations.map((location) => (
            <TouchableOpacity
              key={location.id}
              style={styles.locationCard}
              onPress={() => alert(`View menu for ${location.name}`)}
            >
              <View style={[styles.locationIcon, { backgroundColor: location.color + '15' }]}>
                <MaterialIcons name={location.icon as any} size={26} color={location.color} />
              </View>
              <View style={styles.locationInfo}>
                <Text style={styles.locationName}>{location.name}</Text>
                <Text style={[
                  styles.locationHours,
                  location.status === 'closed' && { color: '#9aa0c7' }
                ]}>
                  {location.hours}
                </Text>
                <View style={styles.locationFooter}>
                  <MaterialIcons name="directions-walk" size={14} color="#9aa0c7" />
                  <Text style={styles.locationDistance}>{location.distance}</Text>
                </View>
              </View>
              <View style={[
                styles.statusBadge,
                location.status === 'open' 
                  ? { backgroundColor: '#10b98115' } 
                  : { backgroundColor: '#9aa0c715' }
              ]}>
                <View style={[
                  styles.statusDot,
                  { backgroundColor: location.status === 'open' ? '#10b981' : '#9aa0c7' }
                ]} />
                <Text style={[
                  styles.statusText,
                  { color: location.status === 'open' ? '#10b981' : '#9aa0c7' }
                ]}>
                  {location.status === 'open' ? 'Open' : 'Closed'}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentMeals.map((meal) => (
            <View key={meal.id} style={styles.mealCard}>
              <View style={styles.mealIcon}>
                {meal.swipes ? (
                  <MaterialCommunityIcons name="credit-card-check" size={20} color="#f59e0b" />
                ) : (
                  <MaterialIcons name="account-balance-wallet" size={20} color="#10b981" />
                )}
              </View>
              <View style={styles.mealInfo}>
                <Text style={styles.mealLocation}>{meal.location}</Text>
                <Text style={styles.mealType}>{meal.type} • {meal.date}</Text>
              </View>
              <View style={styles.mealValue}>
                {meal.swipes ? (
                  <Text style={styles.mealSwipes}>-{meal.swipes} swipe</Text>
                ) : (
                  <Text style={styles.mealFlex}>-£{meal.flex?.toFixed(2)}</Text>
                )}
              </View>
            </View>
          ))}
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

  // Balance Section
  balanceSection: { padding: 20, gap: 12 },
  swipesCard: { borderRadius: 20, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 },
  swipesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  swipesLabel: { fontSize: 14, color: 'rgba(255,255,255,0.85)' },
  swipesCount: { fontSize: 52, fontWeight: '800', color: '#fff', letterSpacing: -2, marginBottom: 16 },
  swipesProgress: { gap: 8 },
  swipesProgressBar: { height: 6, backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 3, overflow: 'hidden' },
  swipesProgressFill: { height: '100%', backgroundColor: '#fff', borderRadius: 3 },
  swipesProgressText: { fontSize: 13, color: 'rgba(255,255,255,0.85)' },

  flexCard: { backgroundColor: '#fff', borderRadius: 16, padding: 18, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 },
  flexRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  flexIconBox: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#10b98115', alignItems: 'center', justifyContent: 'center' },
  flexInfo: { flex: 1 },
  flexLabel: { fontSize: 13, color: '#9aa0c7', marginBottom: 4 },
  flexAmount: { fontSize: 22, fontWeight: '800', color: '#0D1140' },
  addFundsButton: { width: 40, height: 40, borderRadius: 10, backgroundColor: '#10b98115', alignItems: 'center', justifyContent: 'center' },

  // Sections
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#0D1140', marginBottom: 16 },

  // Dining Locations
  locationCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  locationIcon: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  locationInfo: { flex: 1 },
  locationName: { fontSize: 15, fontWeight: '700', color: '#0D1140', marginBottom: 4 },
  locationHours: { fontSize: 13, color: '#6b7280', marginBottom: 6 },
  locationFooter: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationDistance: { fontSize: 12, color: '#9aa0c7' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, gap: 6 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 12, fontWeight: '600' },

  // Recent Activity
  mealCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  mealIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#f8f9fb', alignItems: 'center', justifyContent: 'center' },
  mealInfo: { flex: 1 },
  mealLocation: { fontSize: 14, fontWeight: '600', color: '#0D1140', marginBottom: 4 },
  mealType: { fontSize: 13, color: '#9aa0c7' },
  mealValue: { alignItems: 'flex-end' },
  mealSwipes: { fontSize: 14, fontWeight: '700', color: '#f59e0b' },
  mealFlex: { fontSize: 14, fontWeight: '700', color: '#10b981' },
});

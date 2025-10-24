import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Finance() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const accountBalance = 2450.00;
  const tuitionDue = 8750.00;
  const dueDate = 'Jan 15, 2025';

  const transactions = [
    { id: '1', date: 'Dec 10, 2024', description: 'Tuition Payment', amount: -4375.00, type: 'payment' },
    { id: '2', date: 'Dec 5, 2024', description: 'Financial Aid Credit', amount: 5000.00, type: 'credit' },
    { id: '3', date: 'Nov 20, 2024', description: 'Meal Plan Charge', amount: -850.00, type: 'charge' },
    { id: '4', date: 'Nov 15, 2024', description: 'Housing Payment', amount: -2500.00, type: 'payment' },
    { id: '5', date: 'Oct 25, 2024', description: 'Book Refund', amount: 125.00, type: 'refund' },
  ];

  const quickActions = [
    { icon: 'credit-card', label: 'Make Payment', color: '#10b981' },
    { icon: 'receipt', label: 'View Statement', color: '#3b82f6' },
    { icon: 'school', label: 'Financial Aid', color: '#8b5cf6' },
    { icon: 'history', label: 'Payment History', color: '#f59e0b' },
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
        <Text style={styles.headerTitle}>Finance</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        {/* Account Balance */}
        <View style={styles.balanceSection}>
          <LinearGradient
            colors={['#10b981', '#059669']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.balanceCard}
          >
            <Text style={styles.balanceLabel}>Account Balance</Text>
            <Text style={styles.balanceAmount}>£{accountBalance.toFixed(2)}</Text>
            <View style={styles.balanceFooter}>
              <MaterialIcons name="account-balance-wallet" size={20} color="rgba(255,255,255,0.8)" />
              <Text style={styles.balanceNote}>Available for payments</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Tuition Due */}
        <View style={styles.dueSection}>
          <View style={styles.dueCard}>
            <View style={styles.dueHeader}>
              <MaterialIcons name="warning" size={24} color="#f59e0b" />
              <Text style={styles.dueLabel}>Tuition Due</Text>
            </View>
            <Text style={styles.dueAmount}>£{tuitionDue.toFixed(2)}</Text>
            <Text style={styles.dueDate}>Due by {dueDate}</Text>
            <TouchableOpacity style={styles.payButton} onPress={() => alert('Payment processing coming soon')}>
              <Text style={styles.payButtonText}>Pay Now</Text>
              <MaterialIcons name="arrow-forward" size={18} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionCard}
                onPress={() => alert(`${action.label} coming soon`)}
              >
                <View style={[styles.actionIcon, { backgroundColor: action.color + '15' }]}>
                  <MaterialIcons name={action.icon as any} size={28} color={action.color} />
                </View>
                <Text style={styles.actionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Transaction History */}
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {transactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              style={styles.transactionCard}
              onPress={() => alert(`Transaction details for ${transaction.description}`)}
            >
              <View style={[
                styles.transactionIcon,
                { backgroundColor: transaction.amount > 0 ? '#10b98115' : '#ef444415' }
              ]}>
                <MaterialCommunityIcons
                  name={transaction.amount > 0 ? 'arrow-down' : 'arrow-up'}
                  size={20}
                  color={transaction.amount > 0 ? '#10b981' : '#ef4444'}
                />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionDesc}>{transaction.description}</Text>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
              <Text style={[
                styles.transactionAmount,
                { color: transaction.amount > 0 ? '#10b981' : '#0D1140' }
              ]}>
                {transaction.amount > 0 ? '+' : ''}£{Math.abs(transaction.amount).toFixed(2)}
              </Text>
            </TouchableOpacity>
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
  balanceSection: { padding: 20 },
  balanceCard: { borderRadius: 20, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 },
  balanceLabel: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 8 },
  balanceAmount: { fontSize: 42, fontWeight: '800', color: '#fff', letterSpacing: -1 },
  balanceFooter: { flexDirection: 'row', alignItems: 'center', marginTop: 16, gap: 8 },
  balanceNote: { fontSize: 13, color: 'rgba(255,255,255,0.8)' },

  // Due Section
  dueSection: { paddingHorizontal: 20, marginBottom: 24 },
  dueCard: { backgroundColor: '#fff', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 4 },
  dueHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  dueLabel: { fontSize: 16, fontWeight: '600', color: '#6b7280' },
  dueAmount: { fontSize: 32, fontWeight: '800', color: '#0D1140', marginBottom: 8 },
  dueDate: { fontSize: 14, color: '#9aa0c7', marginBottom: 16 },
  payButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0D1140', borderRadius: 12, paddingVertical: 14, gap: 8 },
  payButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },

  // Quick Actions
  actionsSection: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#0D1140', marginBottom: 16 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionCard: { width: '48%', backgroundColor: '#fff', borderRadius: 16, padding: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  actionIcon: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  actionLabel: { fontSize: 13, fontWeight: '600', color: '#0D1140', textAlign: 'center' },

  // Transactions
  transactionsSection: { paddingHorizontal: 20, marginBottom: 24 },
  transactionCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  transactionIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  transactionInfo: { flex: 1 },
  transactionDesc: { fontSize: 15, fontWeight: '600', color: '#0D1140', marginBottom: 4 },
  transactionDate: { fontSize: 13, color: '#9aa0c7' },
  transactionAmount: { fontSize: 16, fontWeight: '700' },
});

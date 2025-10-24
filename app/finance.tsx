import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Finance() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [statementModalVisible, setStatementModalVisible] = useState(false);
  const [aidModalVisible, setAidModalVisible] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');

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

  const handleMakePayment = () => {
    setPaymentModalVisible(true);
  };

  const handleViewStatement = () => {
    setStatementModalVisible(true);
  };

  const handleFinancialAid = () => {
    setAidModalVisible(true);
  };

  const handlePaymentHistory = () => {
    Alert.alert(
      'Payment History',
      'Your recent transactions are displayed below. For full history, please visit the Student Portal.',
      [{ text: 'OK' }]
    );
  };

  const processPayment = () => {
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid payment amount');
      return;
    }
    if (amount > accountBalance) {
      Alert.alert('Insufficient Funds', 'Your account balance is insufficient for this payment');
      return;
    }
    
    setPaymentModalVisible(false);
    Alert.alert(
      'Payment Successful',
      `£${amount.toFixed(2)} has been processed successfully.\n\nTransaction ID: ${Date.now()}\nRemaining Balance: £${(accountBalance - amount).toFixed(2)}`,
      [{ text: 'OK' }]
    );
    setPaymentAmount('');
  };

  const quickActions = [
    { icon: 'credit-card', label: 'Make Payment', color: '#10b981', onPress: handleMakePayment },
    { icon: 'receipt', label: 'View Statement', color: '#3b82f6', onPress: handleViewStatement },
    { icon: 'school', label: 'Financial Aid', color: '#8b5cf6', onPress: handleFinancialAid },
    { icon: 'history', label: 'Payment History', color: '#f59e0b', onPress: handlePaymentHistory },
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
            <TouchableOpacity style={styles.payButton} onPress={handleMakePayment}>
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
                onPress={action.onPress}
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

      {/* Payment Modal */}
      <Modal visible={paymentModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Make Payment</Text>
              <TouchableOpacity onPress={() => setPaymentModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#0D1140" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalLabel}>Enter Amount (£)</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="0.00"
                keyboardType="numeric"
                value={paymentAmount}
                onChangeText={setPaymentAmount}
              />
              <Text style={styles.modalBalance}>Available Balance: £{accountBalance.toFixed(2)}</Text>
              <TouchableOpacity style={styles.modalButton} onPress={processPayment}>
                <Text style={styles.modalButtonText}>Process Payment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Statement Modal */}
      <Modal visible={statementModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Account Statement</Text>
              <TouchableOpacity onPress={() => setStatementModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#0D1140" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <View style={styles.statementRow}>
                <Text style={styles.statementLabel}>Account Balance</Text>
                <Text style={styles.statementValue}>£{accountBalance.toFixed(2)}</Text>
              </View>
              <View style={styles.statementRow}>
                <Text style={styles.statementLabel}>Tuition Due</Text>
                <Text style={[styles.statementValue, { color: '#ef4444' }]}>£{tuitionDue.toFixed(2)}</Text>
              </View>
              <View style={styles.statementRow}>
                <Text style={styles.statementLabel}>Due Date</Text>
                <Text style={styles.statementValue}>{dueDate}</Text>
              </View>
              <View style={styles.statementDivider} />
              <Text style={styles.statementNote}>
                For detailed statements and transaction history, please visit the Student Finance Portal or contact the Finance Office.
              </Text>
              <TouchableOpacity style={styles.modalButton} onPress={() => Alert.alert('Download', 'Statement will be sent to your email')}>
                <MaterialIcons name="download" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.modalButtonText}>Download PDF</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Financial Aid Modal */}
      <Modal visible={aidModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Financial Aid</Text>
              <TouchableOpacity onPress={() => setAidModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#0D1140" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <View style={styles.aidCard}>
                <MaterialIcons name="check-circle" size={48} color="#10b981" />
                <Text style={styles.aidTitle}>Aid Package Active</Text>
                <Text style={styles.aidAmount}>£5,000 / Semester</Text>
              </View>
              <View style={styles.aidDetails}>
                <Text style={styles.aidLabel}>Type: Merit Scholarship</Text>
                <Text style={styles.aidLabel}>Status: Active</Text>
                <Text style={styles.aidLabel}>Next Disbursement: Jan 5, 2025</Text>
              </View>
              <TouchableOpacity style={styles.modalButton} onPress={() => Alert.alert('Apply', 'Visit Student Finance Office for new applications')}>
                <Text style={styles.modalButtonText}>Apply for More Aid</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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

  // Modals
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#e8eaf0' },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#0D1140' },
  modalBody: { padding: 20 },
  modalLabel: { fontSize: 14, fontWeight: '600', color: '#6b7280', marginBottom: 8 },
  modalInput: { backgroundColor: '#f8f9fb', borderRadius: 12, padding: 16, fontSize: 24, fontWeight: '700', color: '#0D1140', marginBottom: 12 },
  modalBalance: { fontSize: 13, color: '#9aa0c7', marginBottom: 20 },
  modalButton: { backgroundColor: '#0D1140', borderRadius: 12, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 12 },
  modalButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  statementRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  statementLabel: { fontSize: 15, color: '#6b7280' },
  statementValue: { fontSize: 15, fontWeight: '700', color: '#0D1140' },
  statementDivider: { height: 1, backgroundColor: '#e8eaf0', marginVertical: 16 },
  statementNote: { fontSize: 13, color: '#9aa0c7', lineHeight: 20, marginBottom: 16 },
  aidCard: { backgroundColor: '#10b98115', borderRadius: 16, padding: 24, alignItems: 'center', marginBottom: 20 },
  aidTitle: { fontSize: 18, fontWeight: '700', color: '#0D1140', marginTop: 12, marginBottom: 8 },
  aidAmount: { fontSize: 28, fontWeight: '800', color: '#10b981' },
  aidDetails: { backgroundColor: '#f8f9fb', borderRadius: 12, padding: 16, marginBottom: 12 },
  aidLabel: { fontSize: 14, color: '#6b7280', marginBottom: 8 },
});

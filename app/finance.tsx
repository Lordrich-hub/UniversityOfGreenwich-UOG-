import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Finance() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showStatementModal, setShowStatementModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card');

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

  const handleQuickAction = (label: string) => {
    switch (label) {
      case 'Make Payment':
        setShowPaymentModal(true);
        break;
      case 'View Statement':
        setShowStatementModal(true);
        break;
      case 'Financial Aid':
        Alert.alert(
          'Financial Aid',
          'Your Financial Aid Status:\n\n✅ Federal Student Aid: £5,000\n✅ University Scholarship: £2,500\n\nTotal Aid: £7,500\n\nNext disbursement: Jan 10, 2025',
          [{ text: 'OK' }]
        );
        break;
      case 'Payment History':
        Alert.alert(
          'Payment History',
          'Showing last 5 transactions.\n\nFor full payment history, check the Recent Transactions section below.',
          [{ text: 'OK' }]
        );
        break;
    }
  };

  const handlePayment = () => {
    if (!paymentAmount || parseFloat(paymentAmount) <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid payment amount');
      return;
    }

    const amount = parseFloat(paymentAmount);
    if (amount > accountBalance) {
      Alert.alert('Insufficient Balance', 'Payment amount exceeds your account balance');
      return;
    }

    Alert.alert(
      'Confirm Payment',
      `Pay £${amount.toFixed(2)} using ${selectedPaymentMethod === 'card' ? 'Card' : 'Bank Transfer'}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            setShowPaymentModal(false);
            setPaymentAmount('');
            Alert.alert('Success', `Payment of £${amount.toFixed(2)} processed successfully!`);
          },
        },
      ]
    );
  };

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
            <TouchableOpacity style={styles.payButton} onPress={() => {
              setPaymentAmount(tuitionDue.toString());
              setShowPaymentModal(true);
            }}>
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
                onPress={() => handleQuickAction(action.label)}
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
      <Modal
        visible={showPaymentModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Make Payment</Text>
              <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                <MaterialIcons name="close" size={24} color="#0D1140" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <Text style={styles.inputLabel}>Payment Amount (£)</Text>
              <TextInput
                style={styles.input}
                placeholder="0.00"
                keyboardType="decimal-pad"
                value={paymentAmount}
                onChangeText={setPaymentAmount}
              />

              <Text style={[styles.inputLabel, { marginTop: 20 }]}>Payment Method</Text>
              <View style={styles.paymentMethods}>
                <TouchableOpacity
                  style={[
                    styles.paymentMethodCard,
                    selectedPaymentMethod === 'card' && styles.paymentMethodCardActive,
                  ]}
                  onPress={() => setSelectedPaymentMethod('card')}
                >
                  <MaterialIcons
                    name="credit-card"
                    size={28}
                    color={selectedPaymentMethod === 'card' ? '#10b981' : '#9aa0c7'}
                  />
                  <Text
                    style={[
                      styles.paymentMethodText,
                      selectedPaymentMethod === 'card' && styles.paymentMethodTextActive,
                    ]}
                  >
                    Card
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.paymentMethodCard,
                    selectedPaymentMethod === 'bank' && styles.paymentMethodCardActive,
                  ]}
                  onPress={() => setSelectedPaymentMethod('bank')}
                >
                  <MaterialIcons
                    name="account-balance"
                    size={28}
                    color={selectedPaymentMethod === 'bank' ? '#10b981' : '#9aa0c7'}
                  />
                  <Text
                    style={[
                      styles.paymentMethodText,
                      selectedPaymentMethod === 'bank' && styles.paymentMethodTextActive,
                    ]}
                  >
                    Bank Transfer
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.submitButton} onPress={handlePayment}>
                <Text style={styles.submitButtonText}>Process Payment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Statement Modal */}
      <Modal
        visible={showStatementModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowStatementModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Account Statement</Text>
              <TouchableOpacity onPress={() => setShowStatementModal(false)}>
                <MaterialIcons name="close" size={24} color="#0D1140" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <View style={styles.statementCard}>
                <Text style={styles.statementTitle}>Current Balance</Text>
                <Text style={styles.statementAmount}>£{accountBalance.toFixed(2)}</Text>
              </View>

              <View style={styles.statementCard}>
                <Text style={styles.statementTitle}>Outstanding Balance</Text>
                <Text style={[styles.statementAmount, { color: '#ef4444' }]}>£{tuitionDue.toFixed(2)}</Text>
              </View>

              <View style={styles.statementDivider} />

              <Text style={styles.statementSectionTitle}>Recent Transactions</Text>
              {transactions.slice(0, 3).map((transaction) => (
                <View key={transaction.id} style={styles.statementRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.statementRowTitle}>{transaction.description}</Text>
                    <Text style={styles.statementRowDate}>{transaction.date}</Text>
                  </View>
                  <Text
                    style={[
                      styles.statementRowAmount,
                      { color: transaction.amount > 0 ? '#10b981' : '#0D1140' },
                    ]}
                  >
                    {transaction.amount > 0 ? '+' : ''}£{Math.abs(transaction.amount).toFixed(2)}
                  </Text>
                </View>
              ))}

              <TouchableOpacity
                style={styles.downloadButton}
                onPress={() => {
                  setShowStatementModal(false);
                  Alert.alert('Download Statement', 'Statement will be sent to your email');
                }}
              >
                <MaterialIcons name="download" size={20} color="#10b981" />
                <Text style={styles.downloadButtonText}>Download Full Statement</Text>
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
  modalOverlay: { flex: 1, backgroundColor: 'rgba(13,17,64,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '90%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#e8eaf0' },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#0D1140' },
  modalBody: { padding: 20 },
  inputLabel: { fontSize: 14, fontWeight: '600', color: '#0D1140', marginBottom: 8 },
  input: { backgroundColor: '#f8f9fb', borderRadius: 12, padding: 16, fontSize: 16, color: '#0D1140', borderWidth: 1, borderColor: '#e8eaf0' },
  paymentMethods: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  paymentMethodCard: { flex: 1, backgroundColor: '#f8f9fb', borderRadius: 16, padding: 20, alignItems: 'center', borderWidth: 2, borderColor: '#e8eaf0' },
  paymentMethodCardActive: { borderColor: '#10b981', backgroundColor: '#10b98108' },
  paymentMethodText: { fontSize: 14, fontWeight: '600', color: '#9aa0c7', marginTop: 8 },
  paymentMethodTextActive: { color: '#10b981' },
  submitButton: { backgroundColor: '#10b981', borderRadius: 12, padding: 16, alignItems: 'center' },
  submitButtonText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  statementCard: { backgroundColor: '#f8f9fb', borderRadius: 16, padding: 20, marginBottom: 12 },
  statementTitle: { fontSize: 14, color: '#9aa0c7', marginBottom: 8 },
  statementAmount: { fontSize: 28, fontWeight: '800', color: '#10b981' },
  statementDivider: { height: 1, backgroundColor: '#e8eaf0', marginVertical: 20 },
  statementSectionTitle: { fontSize: 16, fontWeight: '700', color: '#0D1140', marginBottom: 16 },
  statementRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f8f9fb' },
  statementRowTitle: { fontSize: 14, fontWeight: '600', color: '#0D1140', marginBottom: 4 },
  statementRowDate: { fontSize: 12, color: '#9aa0c7' },
  statementRowAmount: { fontSize: 15, fontWeight: '700' },
  downloadButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#10b98115', borderRadius: 12, padding: 16, marginTop: 20, gap: 8 },
  downloadButtonText: { fontSize: 15, fontWeight: '600', color: '#10b981' },
});

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Health() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showPrescriptionsModal, setShowPrescriptionsModal] = useState(false);
  const [selectedAppointmentType, setSelectedAppointmentType] = useState('');

  const upcomingAppointments = [
    { 
      id: '1', 
      type: 'General Checkup', 
      doctor: 'Dr. Sarah Johnson', 
      date: 'Jan 18, 2025', 
      time: '2:00 PM',
      location: 'Student Health Center',
      color: '#10b981' 
    },
  ];

  const healthServices = [
    { icon: 'medical-services', label: 'Book Appointment', color: '#3b82f6' },
    { icon: 'medication', label: 'Prescriptions', color: '#8b5cf6' },
    { icon: 'healing', label: 'Mental Health', color: '#ec4899' },
    { icon: 'vaccines', label: 'Immunizations', color: '#10b981' },
    { icon: 'local-hospital', label: 'Emergency Info', color: '#ef4444' },
    { icon: 'favorite', label: 'Wellness Tips', color: '#f59e0b' },
  ];

  const recentVisits = [
    { id: '1', date: 'Dec 10, 2024', reason: 'Flu Symptoms', doctor: 'Dr. Michael Chen', notes: 'Prescribed rest and fluids' },
    { id: '2', date: 'Nov 5, 2024', reason: 'Annual Physical', doctor: 'Dr. Sarah Johnson', notes: 'All results normal' },
    { id: '3', date: 'Oct 20, 2024', reason: 'Sports Injury', doctor: 'Dr. Emily Brown', notes: 'Minor sprain - recovered' },
  ];

  const healthResources = [
    { 
      title: '24/7 Crisis Hotline', 
      description: 'Available anytime for urgent mental health support', 
      phone: '0800-123-4567',
      icon: 'phone',
      color: '#ef4444' 
    },
    { 
      title: 'Student Counseling', 
      description: 'Free confidential counseling services', 
      action: 'Schedule Session',
      icon: 'psychology',
      color: '#8b5cf6' 
    },
    { 
      title: 'Health Insurance', 
      description: 'View your coverage and benefits', 
      action: 'View Details',
      icon: 'shield',
      color: '#3b82f6' 
    },
  ];

  const handleServiceClick = (label: string) => {
    switch (label) {
      case 'Book Appointment':
        setShowBookingModal(true);
        break;
      case 'Prescriptions':
        setShowPrescriptionsModal(true);
        break;
      case 'Mental Health':
        Alert.alert(
          'Mental Health Support',
          '🧠 Student Counseling Services\n\n📞 24/7 Crisis Line: 0800-123-4567\n📧 counseling@gre.ac.uk\n\n💬 Free confidential counseling\n🕐 Walk-in hours: Mon-Fri 9am-5pm\n\nYou are not alone. We are here to help.',
          [{ text: 'OK' }]
        );
        break;
      case 'Immunizations':
        Alert.alert(
          'Immunization Records',
          'Your Immunization Status:\n\n✅ COVID-19: Up to date\n✅ Flu: Current season\n✅ MMR: Complete\n✅ Tetanus: Valid until 2027\n\nNext recommended: Annual Flu (Oct 2025)',
          [{ text: 'OK' }]
        );
        break;
      case 'Emergency Info':
        Alert.alert(
          '🚨 Emergency Contact',
          'Emergency Services: 999\n\nStudent Health Center:\n📞 +44 20 8331 9000\n📍 Main Campus Building\n\nCampus Security:\n📞 +44 20 8331 8888\n\nNearest Hospital:\nQueen Elizabeth Hospital\n📍 Stadium Road, SE18 4QH',
          [{ text: 'OK' }]
        );
        break;
      case 'Wellness Tips':
        Alert.alert(
          '💪 Wellness Tips',
          '• Get 7-9 hours of sleep\n• Drink 8 glasses of water daily\n• Exercise 30 min/day\n• Take study breaks every hour\n• Practice mindfulness\n• Eat balanced meals\n• Stay socially connected\n• Limit screen time before bed\n\nYour health is your wealth! 🌟',
          [{ text: 'Got it!' }]
        );
        break;
    }
  };

  const handleBookAppointment = (type: string) => {
    setSelectedAppointmentType(type);
    Alert.alert(
      'Confirm Booking',
      `Book ${type} appointment?\n\nNext available: Jan 20, 2025 at 10:00 AM`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Book',
          onPress: () => {
            setShowBookingModal(false);
            Alert.alert('Success', `${type} appointment booked for Jan 20 at 10:00 AM!`);
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
        <Text style={styles.headerTitle}>Health & Wellness</Text>
      </LinearGradient>

      <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: insets.bottom + 100 }}>
        {/* Quick Book Appointment */}
        <View style={styles.bookSection}>
          <LinearGradient
            colors={['#3b82f6', '#2563eb']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.bookCard}
          >
            <MaterialCommunityIcons name="calendar-plus" size={32} color="#fff" />
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>Need to see a doctor?</Text>
              <Text style={styles.bookSubtitle}>Book an appointment in seconds</Text>
            </View>
            <TouchableOpacity style={styles.bookButton} onPress={() => setShowBookingModal(true)}>
              <Text style={styles.bookButtonText}>Book Now</Text>
              <MaterialIcons name="arrow-forward" size={18} color="#3b82f6" />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
            {upcomingAppointments.map((appointment) => (
              <View key={appointment.id} style={styles.appointmentCard}>
                <View style={[styles.appointmentStrip, { backgroundColor: appointment.color }]} />
                <View style={styles.appointmentContent}>
                  <View style={styles.appointmentHeader}>
                    <Text style={styles.appointmentType}>{appointment.type}</Text>
                    <TouchableOpacity onPress={() => alert('Reschedule or cancel appointment')}>
                      <MaterialIcons name="more-vert" size={22} color="#9aa0c7" />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.appointmentDetail}>
                    <MaterialIcons name="person" size={16} color="#6b7280" />
                    <Text style={styles.appointmentText}>{appointment.doctor}</Text>
                  </View>
                  <View style={styles.appointmentDetail}>
                    <MaterialIcons name="calendar-today" size={16} color="#6b7280" />
                    <Text style={styles.appointmentText}>{appointment.date} at {appointment.time}</Text>
                  </View>
                  <View style={styles.appointmentDetail}>
                    <MaterialIcons name="location-on" size={16} color="#6b7280" />
                    <Text style={styles.appointmentText}>{appointment.location}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Health Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Services</Text>
          <View style={styles.servicesGrid}>
            {healthServices.map((service, index) => (
              <TouchableOpacity
                key={index}
                style={styles.serviceCard}
                onPress={() => handleServiceClick(service.label)}
              >
                <View style={[styles.serviceIcon, { backgroundColor: service.color + '15' }]}>
                  <MaterialIcons name={service.icon as any} size={28} color={service.color} />
                </View>
                <Text style={styles.serviceLabel}>{service.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Health Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Resources</Text>
          {healthResources.map((resource, index) => (
            <TouchableOpacity
              key={index}
              style={styles.resourceCard}
              onPress={() => resource.phone ? alert(`Call ${resource.phone}`) : alert(resource.action)}
            >
              <View style={[styles.resourceIcon, { backgroundColor: resource.color + '15' }]}>
                <MaterialIcons name={resource.icon as any} size={24} color={resource.color} />
              </View>
              <View style={styles.resourceInfo}>
                <Text style={styles.resourceTitle}>{resource.title}</Text>
                <Text style={styles.resourceDescription}>{resource.description}</Text>
                {resource.phone && (
                  <View style={styles.resourceAction}>
                    <MaterialIcons name="phone" size={14} color={resource.color} />
                    <Text style={[styles.resourceActionText, { color: resource.color }]}>
                      {resource.phone}
                    </Text>
                  </View>
                )}
                {resource.action && (
                  <View style={styles.resourceAction}>
                    <MaterialIcons name="arrow-forward" size={14} color={resource.color} />
                    <Text style={[styles.resourceActionText, { color: resource.color }]}>
                      {resource.action}
                    </Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Visits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Visits</Text>
          {recentVisits.map((visit) => (
            <TouchableOpacity
              key={visit.id}
              style={styles.visitCard}
              onPress={() => alert(`Visit details: ${visit.reason}`)}
            >
              <View style={styles.visitIconBox}>
                <MaterialCommunityIcons name="medical-bag" size={22} color="#3b82f6" />
              </View>
              <View style={styles.visitInfo}>
                <Text style={styles.visitReason}>{visit.reason}</Text>
                <Text style={styles.visitDoctor}>{visit.doctor}</Text>
                <Text style={styles.visitNotes}>{visit.notes}</Text>
                <Text style={styles.visitDate}>{visit.date}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#9aa0c7" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Book Appointment Modal */}
      <Modal
        visible={showBookingModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowBookingModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book Appointment</Text>
              <TouchableOpacity onPress={() => setShowBookingModal(false)}>
                <MaterialIcons name="close" size={24} color="#0D1140" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.appointmentTypeTitle}>Select Appointment Type</Text>
              
              {[
                { type: 'General Checkup', icon: 'medical-services', color: '#10b981' },
                { type: 'Mental Health Consultation', icon: 'psychology', color: '#8b5cf6' },
                { type: 'Vaccination', icon: 'vaccines', color: '#3b82f6' },
                { type: 'Sports Injury', icon: 'healing', color: '#f59e0b' },
                { type: 'Prescription Refill', icon: 'medication', color: '#ec4899' },
              ].map((appointment, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.appointmentTypeCard}
                  onPress={() => handleBookAppointment(appointment.type)}
                >
                  <View style={[styles.appointmentTypeIcon, { backgroundColor: appointment.color + '15' }]}>
                    <MaterialIcons name={appointment.icon as any} size={28} color={appointment.color} />
                  </View>
                  <Text style={styles.appointmentTypeText}>{appointment.type}</Text>
                  <MaterialIcons name="chevron-right" size={24} color="#9aa0c7" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Prescriptions Modal */}
      <Modal
        visible={showPrescriptionsModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPrescriptionsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>My Prescriptions</Text>
              <TouchableOpacity onPress={() => setShowPrescriptionsModal(false)}>
                <MaterialIcons name="close" size={24} color="#0D1140" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.prescriptionSectionTitle}>Active Prescriptions</Text>
              
              {[
                { name: 'Amoxicillin 500mg', dosage: 'Take 1 tablet twice daily', refills: '2 refills left', expires: 'Expires: Mar 15, 2025' },
                { name: 'Vitamin D3 1000IU', dosage: 'Take 1 tablet daily', refills: '3 refills left', expires: 'Expires: Jun 20, 2025' },
              ].map((prescription, index) => (
                <View key={index} style={styles.prescriptionCard}>
                  <View style={styles.prescriptionHeader}>
                    <MaterialCommunityIcons name="pill" size={24} color="#8b5cf6" />
                    <Text style={styles.prescriptionName}>{prescription.name}</Text>
                  </View>
                  <Text style={styles.prescriptionDosage}>{prescription.dosage}</Text>
                  <Text style={styles.prescriptionRefills}>{prescription.refills}</Text>
                  <Text style={styles.prescriptionExpires}>{prescription.expires}</Text>
                  <TouchableOpacity
                    style={styles.refillButton}
                    onPress={() => {
                      setShowPrescriptionsModal(false);
                      Alert.alert('Refill Request', `Request refill for ${prescription.name}?`, [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Request', onPress: () => Alert.alert('Success', 'Refill request submitted!') },
                      ]);
                    }}
                  >
                    <Text style={styles.refillButtonText}>Request Refill</Text>
                  </TouchableOpacity>
                </View>
              ))}
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

  // Book Section
  bookSection: { padding: 20 },
  bookCard: { flexDirection: 'row', alignItems: 'center', borderRadius: 20, padding: 20, gap: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 8 },
  bookInfo: { flex: 1 },
  bookTitle: { fontSize: 16, fontWeight: '700', color: '#fff', marginBottom: 4 },
  bookSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.85)' },
  bookButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, gap: 6 },
  bookButtonText: { fontSize: 14, fontWeight: '600', color: '#3b82f6' },

  // Sections
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#0D1140', marginBottom: 16 },

  // Appointments
  appointmentCard: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  appointmentStrip: { height: 4 },
  appointmentContent: { padding: 16 },
  appointmentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  appointmentType: { fontSize: 16, fontWeight: '700', color: '#0D1140' },
  appointmentDetail: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  appointmentText: { fontSize: 14, color: '#6b7280' },

  // Services
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  serviceCard: { width: '31%', backgroundColor: '#fff', borderRadius: 16, padding: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 },
  serviceIcon: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  serviceLabel: { fontSize: 12, fontWeight: '600', color: '#0D1140', textAlign: 'center' },

  // Resources
  resourceCard: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  resourceIcon: { width: 48, height: 48, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  resourceInfo: { flex: 1 },
  resourceTitle: { fontSize: 15, fontWeight: '700', color: '#0D1140', marginBottom: 4 },
  resourceDescription: { fontSize: 13, color: '#6b7280', marginBottom: 8 },
  resourceAction: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  resourceActionText: { fontSize: 13, fontWeight: '600' },

  // Visits
  visitCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  visitIconBox: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#3b82f615', alignItems: 'center', justifyContent: 'center' },
  visitInfo: { flex: 1 },
  visitReason: { fontSize: 15, fontWeight: '700', color: '#0D1140', marginBottom: 4 },
  visitDoctor: { fontSize: 13, color: '#6b7280', marginBottom: 6 },
  visitNotes: { fontSize: 13, color: '#9aa0c7', marginBottom: 6 },
  visitDate: { fontSize: 12, color: '#9aa0c7' },

  // Modals
  modalOverlay: { flex: 1, backgroundColor: 'rgba(13,17,64,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#e8eaf0' },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#0D1140' },
  modalBody: { padding: 20 },
  appointmentTypeTitle: { fontSize: 16, fontWeight: '700', color: '#0D1140', marginBottom: 16 },
  appointmentTypeCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8f9fb', borderRadius: 16, padding: 16, marginBottom: 12, gap: 12 },
  appointmentTypeIcon: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  appointmentTypeText: { flex: 1, fontSize: 15, fontWeight: '600', color: '#0D1140' },
  prescriptionSectionTitle: { fontSize: 16, fontWeight: '700', color: '#0D1140', marginBottom: 16 },
  prescriptionCard: { backgroundColor: '#f8f9fb', borderRadius: 16, padding: 18, marginBottom: 16 },
  prescriptionHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  prescriptionName: { fontSize: 16, fontWeight: '700', color: '#0D1140' },
  prescriptionDosage: { fontSize: 14, color: '#6b7280', marginBottom: 6 },
  prescriptionRefills: { fontSize: 13, color: '#10b981', fontWeight: '600', marginBottom: 4 },
  prescriptionExpires: { fontSize: 12, color: '#9aa0c7', marginBottom: 12 },
  refillButton: { backgroundColor: '#8b5cf6', borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  refillButtonText: { fontSize: 14, fontWeight: '600', color: '#fff' },
});

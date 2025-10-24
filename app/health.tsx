import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Health() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

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
            <TouchableOpacity style={styles.bookButton} onPress={() => alert('Booking system coming soon')}>
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
                onPress={() => alert(`${service.label} coming soon`)}
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
});

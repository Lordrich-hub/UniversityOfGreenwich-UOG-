import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../src/constants/Colors';

interface Campus {
  name: string;
  location: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  facilities: string[];
}

const CAMPUSES: Campus[] = [
  {
    name: 'Greenwich Campus',
    location: 'Old Royal Naval College, Park Row, Greenwich, London SE10 9LS',
    description: 'Historic World Heritage Site campus with state-of-the-art facilities including the £76-million Stockwell Street Building.',
    coordinates: {
      latitude: 51.4826,
      longitude: -0.0077,
    },
    facilities: ['Library', 'Film/TV Studios', 'Students Union', 'Cafe', 'Sports Centre'],
  },
  {
    name: 'Avery Hill Campus',
    location: 'Avery Hill Road, Eltham, London SE9 2UG',
    description: 'Extensive campus with academic and social facilities, student accommodation, and sports amenities.',
    coordinates: {
      latitude: 51.4561,
      longitude: 0.0735,
    },
    facilities: ['Accommodation', 'Sports Complex', 'Library', 'Cafe', 'Study Spaces'],
  },
  {
    name: 'Medway Campus',
    location: 'Central Avenue, Chatham Maritime, Kent ME4 4TB',
    description: 'Modern campus in Chatham Maritime serving students in Kent.',
    coordinates: {
      latitude: 51.4007,
      longitude: 0.5427,
    },
    facilities: ['Library', 'Lecture Halls', 'Study Areas', 'Cafe', 'Student Services'],
  },
];

export default function Campus() {
  const [selectedCampus, setSelectedCampus] = useState<Campus>(CAMPUSES[0]);

  const openInMaps = () => {
    const { latitude, longitude } = selectedCampus.coordinates;
    const label = encodeURIComponent(selectedCampus.name);
    
    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}(${label})`,
      default: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
    });

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.campusScroll}
        contentContainerStyle={styles.campusContent}
      >
        {CAMPUSES.map((campus) => (
          <TouchableOpacity
            key={campus.name}
            style={[
              styles.campusButton,
              selectedCampus.name === campus.name && styles.campusButtonActive,
            ]}
            onPress={() => setSelectedCampus(campus)}
          >
            <Text
              style={[
                styles.campusText,
                selectedCampus.name === campus.name && styles.campusTextActive,
              ]}
            >
              {campus.name.replace(' Campus', '')}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map" size={64} color={Colors.textSecondary} />
          <Text style={styles.mapText}>Interactive Map</Text>
          <TouchableOpacity style={styles.directionsButton} onPress={openInMaps}>
            <Ionicons name="navigate" size={20} color="white" />
            <Text style={styles.directionsText}>Open in Maps</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.campusName}>{selectedCampus.name}</Text>
          <Text style={styles.description}>{selectedCampus.description}</Text>

          <View style={styles.locationSection}>
            <Ionicons name="location" size={20} color={Colors.primary} />
            <Text style={styles.locationText}>{selectedCampus.location}</Text>
          </View>

          <View style={styles.facilitiesSection}>
            <Text style={styles.sectionTitle}>Facilities</Text>
            {selectedCampus.facilities.map((facility, index) => (
              <View key={index} style={styles.facilityItem}>
                <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
                <Text style={styles.facilityText}>{facility}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  campusScroll: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  campusContent: {
    padding: 16,
    gap: 8,
  },
  campusButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.background,
  },
  campusButtonActive: {
    backgroundColor: Colors.primary,
  },
  campusText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  campusTextActive: {
    color: 'white',
  },
  content: {
    flex: 1,
  },
  mapPlaceholder: {
    height: 250,
    backgroundColor: Colors.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 12,
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginTop: 16,
  },
  directionsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoCard: {
    backgroundColor: 'white',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  campusName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  locationSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  locationText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text,
    marginLeft: 8,
    lineHeight: 20,
  },
  facilitiesSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  facilityText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 8,
  },
});
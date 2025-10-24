import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Scan() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <View style={styles.content}>
        <MaterialIcons name="qr-code-scanner" size={80} color="#c8cfee" />
        <Text style={styles.header}>QR Code Scanner</Text>
        <Text style={styles.help}>Scanner functionality will be available soon.</Text>
        <Text style={styles.subtext}>Use this feature to mark attendance and access campus services.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1140' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  header: { fontSize: 28, fontWeight: '800', color: '#fff', marginTop: 24, marginBottom: 12, textAlign: 'center' },
  help: { fontSize: 16, color: '#c8cfee', textAlign: 'center', marginBottom: 8 },
  subtext: { fontSize: 14, color: '#8891b8', textAlign: 'center' },
});

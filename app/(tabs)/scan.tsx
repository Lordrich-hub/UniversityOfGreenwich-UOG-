import { MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  if (!permission) {
    return <View style={styles.container}><Text style={styles.loadingText}>Loading camera...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View style={styles.permissionContainer}>
          <MaterialIcons name="qr-code-scanner" size={80} color="#c8cfee" style={{ marginBottom: 20 }} />
          <Text style={styles.permissionText}>Camera access required</Text>
          <Text style={styles.permissionSubtext}>We need camera permission to scan QR codes</Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    Alert.alert(
      'QR Code Scanned',
      `Data: ${data}`,
      [
        { text: 'Scan Again', onPress: () => setScanned(false) },
        { text: 'Done', onPress: () => router.back() },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      <View style={[styles.overlay, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.header}>Scan QR Code</Text>
        <Text style={styles.help}>Align the code within the frame</Text>
      </View>
      <View style={styles.scanFrame} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1140' },
  loadingText: { color: '#fff', textAlign: 'center', marginTop: 50 },
  permissionContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  permissionText: { fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 12, textAlign: 'center' },
  permissionSubtext: { fontSize: 16, color: '#c8cfee', textAlign: 'center', marginBottom: 32 },
  permissionButton: { backgroundColor: '#3b4a9e', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 12 },
  permissionButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  overlay: { position: 'absolute', left: 0, right: 0, alignItems: 'center', backgroundColor: 'rgba(13,17,64,0.8)', paddingBottom: 16 },
  header: { fontSize: 24, fontWeight: '800', color: '#fff', marginBottom: 8 },
  help: { fontSize: 14, color: '#c8cfee' },
  scanFrame: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    height: 250,
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
});

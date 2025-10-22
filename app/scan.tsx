import { BarCodeScanner } from 'expo-barcode-scanner';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Scan() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const insets = useSafeAreaInsets();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    Alert.alert('Attendance', `Scanned code: ${data}`, [
      { text: 'Done', onPress: () => router.back() },
      { text: 'Scan again', onPress: () => setScanned(false) },
    ]);
  };

  if (hasPermission === null) {
    return <View style={[styles.center, { paddingTop: insets.top + 20 }]}><Text>Requesting camera permission…</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={[styles.center, { paddingTop: insets.top + 20 }]}><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={[styles.overlay, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.header}>Scan QR Code</Text>
        <Text style={styles.help}>Align the code within the frame to mark attendance.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  overlay: { position: 'absolute', left: 0, right: 0, alignItems: 'center' },
  header: { fontSize: 18, fontWeight: '800', color: '#fff', textShadowColor: 'rgba(0,0,0,0.4)', textShadowRadius: 4 },
  help: { marginTop: 6, color: '#fff' },
});

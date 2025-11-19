import React, { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

type QRScannerProps = {
  onScanned: (data: string) => void;
};

export default function QRScanner({ onScanned }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      // Web: use @zxing/browser
      let codeReader: any = null;
      
      const startWebScanner = async () => {
        try {
          const { BrowserMultiFormatReader } = await import('@zxing/browser');
          codeReader = new BrowserMultiFormatReader();
          
          const devices = await codeReader.listVideoInputDevices();
          if (devices.length === 0) {
            setHasPermission(false);
            return;
          }
          
          setHasPermission(true);
          
          if (videoRef.current) {
            await codeReader.decodeFromVideoDevice(
              undefined, // Use default camera
              videoRef.current,
              (result: any, error: any) => {
                if (result && !scanned) {
                  setScanned(true);
                  onScanned(result.getText());
                }
              }
            );
          }
        } catch (err) {
          console.error('Web scanner error:', err);
          setHasPermission(false);
        }
      };
      
      startWebScanner();
      
      return () => {
        if (codeReader) {
          codeReader.reset();
        }
      };
    } else {
      // Native: handled by parent using expo-camera
      setHasPermission(true);
    }
  }, [scanned, onScanned]);

  if (Platform.OS === 'web') {
    if (hasPermission === null) {
      return (
        <View style={styles.container}>
          <Text style={styles.message}>Requesting camera permission...</Text>
        </View>
      );
    }
    
    if (hasPermission === false) {
      return (
        <View style={styles.container}>
          <Text style={styles.message}>No access to camera. Please enable camera permissions.</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <video
          ref={videoRef as any}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {scanned && (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>QR Code Scanned! ✓</Text>
          </View>
        )}
      </View>
    );
  }

  // Native platform: parent component handles expo-camera
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  message: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -100 }, { translateY: -50 }],
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 20,
    borderRadius: 12,
  },
  overlayText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

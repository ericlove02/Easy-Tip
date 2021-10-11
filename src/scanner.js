import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StatusBar } from 'expo-status-bar';

export default function ScannerScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const scanOverlay = {
      position:        'absolute',
      backgroundColor: 'rgba(255,255,255,0.3)',
  };
  const scanOverlayBar = {
    position:        'absolute',
    backgroundColor: 'rgba(255,255,255,1)',
};
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      
      <View style={StyleSheet.absoluteFill}>
        <View style={[scanOverlay, {top: 0, left: 0, width: '15%', bottom: 0}]} />
        <View style={[scanOverlayBar, {top: '25%', left: '15%', width: 2, bottom: '40%'}]} />
        <View style={[scanOverlay, {top: 0, left: '15%', right: '15%', height: '25%'}]} />
        <View style={[scanOverlayBar, {top: '25%', left: '15%', height: 2, right: '15%'}]} />
        <View style={[scanOverlay, {bottom: 0, left: '15%', right: '15%', height: '40%'}]} />
        <View style={[scanOverlayBar, {bottom: '40%', left: '15%', height: 2, right: '15%'}]} />
        <View style={[scanOverlay, {top: 0, right: 0, width: '15%', bottom: 0}]} />
        <View style={[scanOverlayBar, {top: '25%', right: '15%', width: 2, bottom: '40%'}]} />
    </View>
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}
const { width: winWidth, height: winHeight } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    height: winHeight,
    width: winWidth,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
}
})
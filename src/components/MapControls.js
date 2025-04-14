import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const MapControls = ({ onCenterCurrentLocation, onClearMarkers }) => {
  return (
    <View style={styles.controlsContainer}>
      {/* 現在地を中心に移動するボタン */}
      <Button
        title="現在地を中心に移動"
        onPress={onCenterCurrentLocation}
        color="#007BFF"
      />

      {/* ピンをすべて削除するボタン */}
      <Button
        title="すべてのピンを削除"
        onPress={onClearMarkers}
        color="red"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default MapControls;

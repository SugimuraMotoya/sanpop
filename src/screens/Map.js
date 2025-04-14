import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapWithPins from '../components/MapWithPins';

const Map = () => {
  return (
    <View style={styles.container}>
      <MapWithPins />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Map;

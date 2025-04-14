import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapWithPins = () => {
  const [markers, setMarkers] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => Alert.alert('エラー', '現在地を取得できませんでした'),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  const handleMapLongPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkers((prev) => [...prev, { coordinate }]);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: currentLocation?.latitude || 35.6895,
          longitude: currentLocation?.longitude || 139.6917,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onLongPress={handleMapLongPress}
      >
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={marker.coordinate} />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapWithPins;

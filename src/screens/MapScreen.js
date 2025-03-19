import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const MapScreen = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => setLocation(position.coords),
      error => console.log(error),
      {enableHighAccuracy: true},
    );
  }, []);

  return (
    <View>
      <MapView style={{width: '100%', height: 400}}>
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        )}
      </MapView>
    </View>
  );
};

export default MapScreen;

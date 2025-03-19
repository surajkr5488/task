import Geolocation from 'react-native-geolocation-service';
import {saveLocation} from './storageService';
import {requestLocationPermission} from '../utils/permissions';

export const startForegroundTracking = async () => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) {
    console.log('Location permission denied');
    return;
  }

  Geolocation.watchPosition(
    position => {
      const {latitude, longitude} = position.coords;
      saveLocation(latitude, longitude);
    },
    error => console.error('Location error:', error),
    {enableHighAccuracy: true, interval: 30000, distanceFilter: 0},
  );
};

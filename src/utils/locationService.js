import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid, Platform} from 'react-native';

export const requestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
    ]);

    return (
      granted['android.permission.ACCESS_FINE_LOCATION'] === 'granted' &&
      granted['android.permission.ACCESS_BACKGROUND_LOCATION'] === 'granted'
    );
  }
  return true;
};

const saveLocation = async (latitude, longitude) => {
  const locationData = {
    latitude,
    longitude,
    timestamp: new Date().toISOString(),
  };

  let storedData = await AsyncStorage.getItem('locations');
  storedData = storedData ? JSON.parse(storedData) : [];
  storedData.push(locationData);

  await AsyncStorage.setItem('locations', JSON.stringify(storedData));
};

let watchId = null;
export const startForegroundTracking = async () => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) return console.warn('Location permission denied');

  watchId = Geolocation.watchPosition(
    position => {
      const {latitude, longitude} = position.coords;
      saveLocation(latitude, longitude);
      console.log('Foreground Location:', latitude, longitude);
    },
    error => console.error(error),
    {
      enableHighAccuracy: true,
      interval: 30000, // 30 seconds
      fastestInterval: 30000,
      distanceFilter: 0,
    },
  );
};

export const stopForegroundTracking = () => {
  if (watchId !== null) {
    Geolocation.clearWatch(watchId);
    watchId = null;
    console.log('Foreground tracking stopped');
  }
};

export const startBackgroundTracking = async () => {
  const hasPermission = await requestLocationPermission();
  if (!hasPermission) return console.warn('Location permission denied');

  Geolocation.getCurrentPosition(
    position => {
      const {latitude, longitude} = position.coords;
      saveLocation(latitude, longitude);
      console.log('Background Location:', latitude, longitude);
    },
    error => console.error(error),
    {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 30000,
    },
  );

  setInterval(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        saveLocation(latitude, longitude);
      },
      error => console.error(error),
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 30000,
      },
    );
  }, 30000);
};

export const stopBackgroundTracking = () => {
  clearInterval(startBackgroundTracking);
  console.log('Background tracking stopped');
};

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'locations';

export const saveLocation = async (latitude, longitude) => {
  const locationData = {
    latitude,
    longitude,
    timestamp: new Date().toISOString(),
  };
  let storedData = await AsyncStorage.getItem(STORAGE_KEY);
  storedData = storedData ? JSON.parse(storedData) : [];
  storedData.push(locationData);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
};

export const getLocations = async () => {
  const storedData = await AsyncStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
};

export const clearLocations = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};

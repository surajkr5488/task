import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLocations = async () => {
  const data = await AsyncStorage.getItem('locations');
  return data ? JSON.parse(data) : [];
};

export const clearLocations = async () => {
  await AsyncStorage.removeItem('locations');
};

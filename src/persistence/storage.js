import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMER_STORAGE_KEY = '@timers';
const LOG_STORAGE_KEY = '@logs';

export const saveTimers = async timers => {
  try {
    await AsyncStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(timers));
    console.log('Saved timers');
  } catch (error) {
    console.error('Error saving timers:', error);
  }
  console.log('first', JSON.stringify(first, null, 2));
};

export const loadTimers = async () => {
  try {
    const timers = await AsyncStorage.getItem(TIMER_STORAGE_KEY);
    return timers ? JSON.parse(timers) : [];
  } catch (error) {
    console.error('Error loading timers:', error);
    return [];
  }
};

export const saveLogs = async logs => {
  try {
    await AsyncStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error('Error saving logs:', error);
  }
};

export const loadLogs = async () => {
  try {
    const logs = await AsyncStorage.getItem(LOG_STORAGE_KEY);
    return logs ? JSON.parse(logs) : [];
  } catch (error) {
    console.error('Error loading logs:', error);
    return [];
  }
};

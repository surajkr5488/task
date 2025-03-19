import React, {useEffect, useState} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {
  startForegroundTracking,
  stopForegroundTracking,
  startBackgroundTracking,
  stopBackgroundTracking,
} from './src/utils/locationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {requestLocationPermission} from './src/utils/permissions';

const App = () => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    requestLocationPermission();
  }, []);
  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    let storedData = await AsyncStorage.getItem('locations');
    setLocations(storedData ? JSON.parse(storedData) : []);
  };

  const clearData = async () => {
    await AsyncStorage.removeItem('locations');
    setLocations([]);
  };

  return (
    <View style={{flex: 1, padding: 20}}>
      <Button
        title="Start Foreground Tracking"
        onPress={startForegroundTracking}
      />
      <Button
        title="Stop Foreground Tracking"
        onPress={stopForegroundTracking}
        color="red"
      />

      <Button
        title="Start Background Tracking"
        onPress={startBackgroundTracking}
      />
      <Button
        title="Stop Background Tracking"
        onPress={stopBackgroundTracking}
        color="red"
      />

      <Button title="Clear Stored Data" onPress={clearData} color="orange" />

      <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 20}}>
        Stored Locations:
      </Text>
      <FlatList
        data={locations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={{padding: 10, borderBottomWidth: 1}}>
            <Text>
              Lat: {item.latitude}, Lng: {item.longitude}
            </Text>
            <Text>Time: {item.timestamp}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default App;

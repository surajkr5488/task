import React from 'react';
import {View, Button} from 'react-native';
import {
  startForegroundTracking,
  startBackgroundTracking,
} from '../services/locationService';
import LocationTable from '../components/LocationTable';

const HomeScreen = () => {
  return (
    <View>
      <Button
        title="Start Foreground Tracking"
        onPress={startForegroundTracking}
      />
      <Button
        title="Start Background Tracking"
        onPress={startBackgroundTracking}
      />
      <LocationTable />
    </View>
  );
};

export default HomeScreen;

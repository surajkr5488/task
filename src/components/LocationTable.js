import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {getLocations} from '../services/storageService';

const LocationTable = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const loadLocations = async () => {
      const data = await getLocations();
      setLocations(data);
    };
    loadLocations();
  }, []);

  return (
    <View>
      <Text>Stored Locations</Text>
      <FlatList
        data={locations}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <View>
            <Text>{`Lat: ${item.latitude}, Lng: ${item.longitude}, Time: ${item.timestamp}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default LocationTable;

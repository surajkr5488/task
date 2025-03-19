import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import storageService from '../services/storageService';

const LocationGrid = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const loadLocations = async () => {
      const data = await storageService.getLocations();
      setLocations(data);
    };
    loadLocations();
  }, []);

  return (
    <FlatList
      data={locations}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <View style={styles.row}>
          <Text style={styles.cell}>{item.latitude}</Text>
          <Text style={styles.cell}>{item.longitude}</Text>
          <Text style={styles.cell}>{item.timestamp}</Text>
        </View>
      )}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.headerText}>Latitude</Text>
          <Text style={styles.headerText}>Longitude</Text>
          <Text style={styles.headerText}>Timestamp</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  row: {flexDirection: 'row', padding: 10, borderBottomWidth: 1},
  cell: {flex: 1, textAlign: 'center'},
  header: {flexDirection: 'row', padding: 10, backgroundColor: '#ddd'},
  headerText: {flex: 1, fontWeight: 'bold', textAlign: 'center'},
});

export default LocationGrid;

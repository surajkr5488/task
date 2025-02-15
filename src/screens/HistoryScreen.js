import React, {useContext} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import TimerContext from '../context/TimerContext';

const HistoryScreen = () => {
  const {state} = useContext(TimerContext);
  console.log('HistoryScreen', state.logs.timers);

  return (
    <View style={styles.container}>
      <FlatList
        data={state.timers}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <>
            {console.log(item, 'item')}
            <View style={styles.logItem}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.text}>Name: {item.name}</Text>
              <Text style={styles.text}>Category: {item.category}</Text>
              <Text style={styles.text}>Duration: {item.duration} mins</Text>
              <Text style={styles.text}>
                Remaining Time: {item.remainingTime} mins
              </Text>
              <Text style={styles.text}>Status: {item.status}</Text>
            </View>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  logItem: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  name: {fontSize: 16, fontWeight: 'bold'},
  time: {fontSize: 14, color: '#555'},
});

export default HistoryScreen;

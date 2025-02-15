import React, {useContext, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import TimerContext from '../context/TimerContext';
import TimerCard from '../components/TimerCard';

const HomeScreen = ({navigation}) => {
  const {state, dispatch} = useContext(TimerContext);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');

  const addTimer = () => {
    if (name && duration && category) {
      const newTimer = {
        id: Date.now(),
        name,
        duration: parseInt(duration, 10),
        category,
        remainingTime: parseInt(duration, 10),
        status: 'Paused',
      };
      dispatch({type: 'ADD_TIMER', payload: newTimer});
      setName('');
      setDuration('');
      setCategory('');
    }
  };

  const handleStart = id => {
    dispatch({type: 'UPDATE_TIMER', payload: {id, status: 'Running'}});
  };

  const handlePause = (id, remainingTime) => {
    dispatch({
      type: 'UPDATE_TIMER',
      payload: {id, remainingTime, status: 'Paused'},
    });
  };

  const handleReset = id => {
    const timer = state.timers.find(t => t.id === id);
    if (timer) {
      dispatch({
        type: 'UPDATE_TIMER',
        payload: {id, remainingTime: timer.duration, status: 'Paused'},
      });
    }
  };

  const handleComplete = id => {
    const timer = state.timers.find(t => t.id === id);
    if (timer) {
      dispatch({
        type: 'ADD_LOG',
        payload: {name: timer.name, completedAt: new Date().toLocaleString()},
      });
      dispatch({
        type: 'UPDATE_TIMER',
        payload: {id, status: 'Completed'},
      });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Duration (seconds)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={addTimer}>
        <Text style={styles.buttonText}>Add Timer</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => navigation.navigate('History')}>
        <Text style={styles.buttonText}>View History</Text>
      </TouchableOpacity>

      <FlatList
        data={state.timers}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TimerCard
            timer={item}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
            onComplete={() => handleComplete(item.id)}
          />
        )}
      />
    </View>
  );
};
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    width: '100%',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    width: width * 0.9,
    alignSelf: 'center',
  },
  secondaryButton: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    marginTop: 16,
  },
});

export default HomeScreen;

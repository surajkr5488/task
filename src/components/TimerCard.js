import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

const TimerCard = ({ timer, onStart, onPause, onReset, onComplete }) => {
  const [remainingTime, setRemainingTime] = useState(timer.remainingTime);
  const [intervalId, setIntervalId] = useState(null);
 
  useEffect(() => {
    setRemainingTime(timer.remainingTime);
  }, [timer.remainingTime]);

 
  useEffect(() => {
    if (timer.status === 'Running' && remainingTime > 0) {
      const id = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(id);
            setIntervalId(null);
            onComplete();  
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setIntervalId(id);
    }
    return () => clearInterval(intervalId);  
  }, [timer.status]);

 
  const handleStart = () => {
    if (!intervalId) {
      onStart(timer.id);  
    }
  };

  const handlePause = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      onPause(timer.id, remainingTime);  
    }
  };

  const handleReset = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setRemainingTime(timer.duration);
    onReset(timer.id);  
  };

  const progress = remainingTime / timer.duration;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{timer.name}</Text>
      <Progress.Bar
        progress={progress}
        width={200}
        color={progress < 0.5 ? 'orange' : 'green'}
        style={styles.progressBar}
      />
      <Text style={styles.timerText}>{remainingTime}s remaining</Text>
      <View style={styles.actions}>
        <Button title="Start" onPress={handleStart} />
        <Button title="Pause" onPress={handlePause} />
        <Button title="Reset" onPress={handleReset} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  progressBar: { marginVertical: 10 },
  timerText: { fontSize: 16, textAlign: 'center', marginBottom: 10 },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
});

export default TimerCard;

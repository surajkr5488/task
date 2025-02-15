import React, { createContext, useReducer, useEffect } from 'react';
import { loadTimers, saveTimers, loadLogs, saveLogs } from '../persistence/storage';

const TimerContext = createContext();

const initialState = {
  timers: [],  
  logs: [],    
};

const timerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TIMERS':
      return { ...state, timers: action.payload };
    case 'SET_LOGS':
      return { ...state, logs: action.payload };
    case 'ADD_TIMER':
      return { ...state, timers: [...state.timers, action.payload] };
    case 'UPDATE_TIMER':
      return {
        ...state,
        timers: state.timers.map(timer =>
          timer.id === action.payload.id ? { ...timer, ...action.payload } : timer
        ),
      };
    case 'ADD_LOG':
      return { ...state, logs: [...state.logs, action.payload] };
    default:
      return state;
  }
};

export const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(timerReducer, initialState);

  useEffect(() => {
    const loadData = async () => {
      const timers = await loadTimers();
      const logs = await loadLogs();
      dispatch({ type: 'SET_TIMERS', payload: timers || [] });
      dispatch({ type: 'SET_LOGS', payload: logs || [] });
    };
    loadData();
  }, []);

  useEffect(() => {
    saveTimers(state.timers);
  }, [state.timers]);

  useEffect(() => {
    saveLogs(state.logs);
  }, [state.logs]);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;

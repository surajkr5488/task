import React from 'react';
import { TimerProvider } from "./src/context/TimerContext";
import AppNavigator from "./src/navigation/AppNavigator";

 

const App = () => (
  <TimerProvider>
    <AppNavigator />
  </TimerProvider>
);
export default App;
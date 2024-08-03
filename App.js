// App.js
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Routes from './src/routes/Routes';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="white" />
      <Routes />
    </>
  );
}

/**
 * React Native App
 * Developed and maintained by capital numbers
 * 
 * @format
 */

import React from 'react';
import {
  StatusBar
} from 'react-native';

import LoaderView from './utils/loaderView';
import { NavigationStack } from './navigation'
import FlashMessage from "react-native-flash-message";

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationStack />
      <LoaderView/>
      <FlashMessage duration={3000} position="top" />
    </>
  );
};  

export default App;
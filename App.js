/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import AppNavigation from './app/navigations/AppNavigation'
import { Provider, connect } from "react-redux";
import configureStore from "./app/redux/";
import { PersistGate } from "redux-persist/lib/integration/react";

const {store, persister} = configureStore();

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f1c40f'
  }
}

const App: () => React$Node = () => {
  console.disableYellowBox = true;
  return (
    <Provider store={store}>
     <PaperProvider theme={theme}>
      <AppNavigation />
     </PaperProvider>
    </Provider>
  );
};

export default App;

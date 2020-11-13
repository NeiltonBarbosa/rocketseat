import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './config/ReactotronConfig';

import { store, persistor } from '~/store';

import App from './App';

export default function Index() {
  YellowBox.ignoreWarnings(['Warning: componentWillMount is deprecated']);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#7159C1" />
        <App />
      </PersistGate>
    </Provider>
  );
}

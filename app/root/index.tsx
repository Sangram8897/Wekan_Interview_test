import React from 'react'
import { Provider } from 'react-redux';
import { store } from '../store/configure_store';
import AppNavigation from './navigation';
import { LogBox } from 'react-native';


function App() {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

export default App;
import React from 'react'
import { Provider } from 'react-redux';
import { store } from '../store/configure_store';
import AppNavigation from './navigation';


function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}

export default App;
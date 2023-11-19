import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../containers/home';
import { Provider } from 'react-redux';
import { store } from '../../store/configure_store';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RestoInfo from '../../containers/home/resto_info';
import SignInScreen from '../../containers/auth/SignInScreen';
import LoginScreen from '../../containers/auth/LoginScreen';
import auth from '@react-native-firebase/auth';
import { navigationRef } from './root_navigation';
import BottomTab from './bottom_tab';

type RootStackParamList = {
  Home: undefined;
  RestoInfo: undefined;
  LoginScreen: undefined;
  Dashboard: undefined;
  SignInScreen: undefined;
  Account: { userId: string };
};

export type Props = NativeStackScreenProps<RootStackParamList>;

const RootStack = createNativeStackNavigator<RootStackParamList>();

function AppNavigation() {

  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();

  // // Handle user state changes
  // function onAuthStateChanged(user: any) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  return (

    <Provider store={store}>
      {/* <GestureHandlerRootView> */}
      <NavigationContainer 
     ref={navigationRef}
      >
        <RootStack.Navigator initialRouteName={'LoginScreen'}>
          <RootStack.Screen name="Dashboard" component={BottomTab} />
          <RootStack.Screen name="RestoInfo" component={RestoInfo} />
          <RootStack.Screen name="LoginScreen" component={LoginScreen} />
          <RootStack.Screen name="SignInScreen" component={SignInScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
      {/* </GestureHandlerRootView> */}
    </Provider>
  );
}

export default AppNavigation;
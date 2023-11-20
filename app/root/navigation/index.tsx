import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useSelector } from 'react-redux';
import { store } from '../../store/configure_store';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RestoInfo from '../../containers/home/task_info';
import SignInScreen from '../../containers/auth/SignInScreen';
import LoginScreen from '../../containers/auth/LoginScreen';
import { navigationRef } from './root_navigation';
import BottomTab from './bottom_tab';
import CreateProfile from '../../containers/profile/create_user_profile';
import AddTask from '../../containers/home/add_task';

type RootStackParamList = {
  Home: undefined;
  TaskInfo: undefined;
  AddTask: undefined;
  LoginScreen: undefined;
  Dashboard: undefined;
  SignInScreen: undefined;
  CreateProfile: undefined;
  Account: { userId: string };
};

export type Props = NativeStackScreenProps<RootStackParamList>;

const RootStack = createNativeStackNavigator<RootStackParamList>();

function AppNavigation() {
  const user_data = useSelector(state => state.auth.user);
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
    <NavigationContainer
      ref={navigationRef}
    >

      <RootStack.Navigator>
        {
          !user_data ?
            <>
              <RootStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerTitle: "Log In" }} />
              <RootStack.Screen name="SignInScreen" component={SignInScreen} options={{ headerTitle: "Create Account" }} />
            </> :
            <>
              <RootStack.Screen name="Dashboard" component={BottomTab} options={{ headerShown: false }} />
              <RootStack.Screen name="TaskInfo" component={RestoInfo} options={{ headerTitle: 'Task Details' }} />
              <RootStack.Screen name="AddTask" component={AddTask} />
              <RootStack.Screen name="CreateProfile" component={CreateProfile} />
            </>
        }

      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
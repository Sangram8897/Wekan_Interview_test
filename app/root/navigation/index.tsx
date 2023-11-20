import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {  useSelector } from 'react-redux';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { navigationRef } from './root_navigation';
import BottomTab from './bottom_tab';

import CreateProfile from 'containers/profile/create_user_profile';
import AddTask from 'containers/home/add_task';
import TaskInfo from 'containers/home/task_info';

import SignInScreen from 'containers/auth/SignInScreen';
import LoginScreen from 'containers/auth/LoginScreen';
import ResetPasswordScreen from 'containers/auth/ResetPasswordScreen';

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
              <RootStack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{ headerTitle: "Reset Password" }} />
            </> :
            <>
              <RootStack.Screen name="Dashboard" component={BottomTab} options={{ headerShown: false }} />
              <RootStack.Screen name="TaskInfo" component={TaskInfo} options={{ headerTitle: 'Task Details' }} />
              <RootStack.Screen name="AddTask" component={AddTask} />
              <RootStack.Screen name="CreateProfile" component={CreateProfile} />
            </>
        }
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
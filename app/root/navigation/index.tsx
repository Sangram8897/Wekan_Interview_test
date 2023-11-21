import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { navigationRef } from './root_navigation';
import BottomTab from './bottom_tab';

import CreateProfile from 'containers/profile/create_user_profile';
import AddTask from 'containers/home/add_task';
import TaskInfo from 'containers/home/task_info';

import SignIn from 'containers/auth/sign_in';
import Login from 'containers/auth/login';
import ResetPassword from 'containers/auth/reset_password';

import AppUserState from '../app_user_state';
import AppStartScreen from 'root/start_screen';
import { RootState } from 'store/configure_store';

type RootStackParamList = {
  Login: undefined;
  SignIn: undefined;
  ResetPassword: undefined;

  AppUserState: undefined;

  Home: undefined;
  TaskInfo: undefined;
  AddTask: { item: any };
  Dashboard: undefined;
  CreateProfile: { item: object };
  AppStartScreen: undefined;
  Account: { userId: string };
};

export type Props = NativeStackScreenProps<RootStackParamList>;

const RootStack = createNativeStackNavigator<RootStackParamList>();

function AppNavigation() {
  const user_data = useSelector((state: RootState) => state.auth.user);
  return (
    <NavigationContainer
      ref={navigationRef}
    >
      <RootStack.Navigator>
        {/* <RootStack.Screen name="AppStartScreen" component={AppStartScreen} options={{ headerShown: false }} /> */}
        {
          !user_data ?
            <>
              <RootStack.Screen name="Login" component={Login} options={{ headerTitle: "Log In" }} />
              <RootStack.Screen name="SignIn" component={SignIn} options={{ headerTitle: "Create Account" }} />
              <RootStack.Screen name="ResetPassword" component={ResetPassword} options={{ headerTitle: "Reset Password" }} />
            </> :
            <>

              <RootStack.Screen name="AppUserState" component={AppUserState} options={{ headerShown: false }} />
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
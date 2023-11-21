import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import IsEmpty from 'utils/IsEmpty';

const AppUserState = ({ navigation }) => {
  const user_data = useSelector(state => state.auth.user);
  const profile_data = useSelector(state => state.profile.profile);

  if (!IsEmpty(profile_data) && !IsEmpty(user_data)) {
    navigation.replace('Dashboard')
  } else if (user_data) {
    navigation.replace('CreateProfile')
  }
  return (
    <View>
      <Text>AppState</Text>
    </View>
  )
}

export default AppUserState

const styles = StyleSheet.create({})
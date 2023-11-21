import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

const AppUserState = ({ navigation }) => {
  const user_data = useSelector(state => state.auth.user);
  const profile_data = useSelector(state => state.profile.profile);

  if (profile_data && user_data) {
    navigation.navigate('Dashboard')
  } else if (user_data) {
    navigation.navigate('CreateProfile', { item: null })
  }
  return (
    <View>
      <Text>AppState</Text>
    </View>
  )
}

export default AppUserState

const styles = StyleSheet.create({})
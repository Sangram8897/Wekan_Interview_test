import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Props } from '../../root/navigation'

const Profile = ({ navigation }: Props) => {
  return (
    <View>
      <Text onPress={() => navigation.goBack()}>Account</Text>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})
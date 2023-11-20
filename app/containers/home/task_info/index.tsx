import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RestoDescription from './description'
import RestoFood from './food'

const RestoInfo = () => {
  return (
    <View style={{ flex: 1 }}>
      <RestoDescription />
      <RestoFood/>
    </View>
  )
}

export default RestoInfo

const styles = StyleSheet.create({})
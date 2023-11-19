import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FoodList from './food_list'

const RestoFood = () => {
  return (
    <View style={{ flex: 2, backgroundColor: 'blue' }}>
      <FoodList />
    </View>
  )
}

export default RestoFood

const styles = StyleSheet.create({})
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Fontisto from 'react-native-vector-icons/Fontisto';
const NotFound = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Fontisto name={'snows'} size={50} color={'gray'} />
            <Text style={{
                fontFamily: 'Poppins-Medium',
                textAlign: 'center', padding: 16
            }}>{'Current you dont have task in your list, start by adding new Task in your profile :)'}</Text>
        </View>
    )
}

export default NotFound

const styles = StyleSheet.create({})
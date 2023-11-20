import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FieldStateNotifier = ({ text = 'this is test sample nofication', color = 'black' }) => {
    return (
        <Text style={[{ color: color }]}>{text}</Text>
    )
}

export default FieldStateNotifier

const styles = StyleSheet.create({})
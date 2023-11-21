import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

const NotFound: React.FC = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Fontisto name={'snows'} size={50} color={'gray'} />
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          textAlign: 'center',
          padding: 16,
        }}
      >
        {'Currently, you don\'t have tasks in your list. Start by adding new tasks in your profile :)'}
      </Text>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({});
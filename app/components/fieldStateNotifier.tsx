import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface FieldStateNotifierProps {
  text?: string;
  color?: string;
}

const FieldStateNotifier: React.FC<FieldStateNotifierProps> = ({
  text = 'This is a test sample notification',
  color = 'black',
}) => {
  return <Text style={[{ color: color }]}>{text}</Text>;
};

export default FieldStateNotifier;

const styles = StyleSheet.create({});
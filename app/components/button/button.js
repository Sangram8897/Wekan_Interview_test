import React from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  Appearance,
  useColorScheme,
} from "react-native";

export default function Button({
  onPress = () => { },
  label = "welcome",
  textColor = 'black',
  backgroundColor='pink',
  borderColor,
  style,
  textStyle,
  borderWidth = 0,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{
         width:'100%',

        // width: '100%',
        alignSelf: 'center',
        paddingVertical: 15,
        marginVertical:4,
        borderWidth: borderWidth,
        borderColor: borderColor,
        overflow: 'hidden',
        backgroundColor: backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
      }, style]}
    >

      <Text
        style={[{ fontSize: 16, color: textColor }, textStyle]}//fontFamily: "RobotoCondensed-Bold"
      >
        {label}
      </Text>

    </TouchableOpacity>
  );
}

import React from "react";
import {
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../styles/colors";

export default function Button({
  onPress = () => { },
  label = "welcome",
  textColor = 'black',
  backgroundColor = 'pink',
  borderColor,
  style,
  textStyle,
  disabled = false,
  borderWidth = 0,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
     // disabled={disabled}
      style={[{
        width: '90%',
        // width: '100%',
        alignSelf: 'center',
        marginVertical: 16,
        paddingVertical: 15,
        borderWidth: borderWidth,
        borderColor: borderColor,
        overflow: 'hidden',
        backgroundColor: disabled ? Colors.GRAY_G2 : backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
      }, style]}
    >

      <Text
        style={[{ fontSize: 16, color: textColor, fontFamily: "Montserrat-ExtraBold" }, textStyle]}
      >
        {label}
      </Text>

    </TouchableOpacity>
  );
}

/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native'
import { Colors } from './colors'

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */

export const FontSize = {
  extraTiny: 12,
  tiny:14,
  small: 16,
  regular: 20,
  medium: 30,
  large: 40,
}

export default function () {
  return StyleSheet.create({
    textExtraTiny: {
      fontSize: FontSize.extraTiny,
      color: Colors.text,
      fontFamily: 'Rubik-Regular'
    },
    textTiny: {
      fontSize: FontSize.tiny,
      color: Colors.text,
      fontFamily: 'Rubik-Regular'
    },
    textSmall: {
      fontSize: FontSize.small,
      color: Colors.text,
    //  fontFamily: 'Rubik-Regular'
    },
    textRegular: {
      fontSize: FontSize.regular,
      color: Colors.text,
      fontFamily: 'Rubik-Regular'
    },
    textMedium: {
      fontSize: FontSize.medium,
      color: Colors.text,
      fontFamily: 'Rubik-Regular'
    },
    textLarge: {
      fontSize: FontSize.large,
      color: Colors.text,
      fontFamily: 'Rubik-Regular'
    },

    subtitleSmall: {
      fontSize: FontSize.small,
      fontWeight: '500',
      color: Colors.text,
      fontFamily: 'Rubik-Regular'
    },
    subtitleMediumSmall: {
      fontSize: FontSize.small * 1.5,
      fontWeight: '500',
      color: Colors.text,
      fontFamily: 'Rubik-Regular'
    },
    subtitleMedium: {
      fontSize: FontSize.small * 2,
      fontWeight: '500',
      color: Colors.text,
      fontFamily: 'Rubik-Regular'
    },
    subtitleRegular: {
      fontSize: FontSize.regular,
      fontWeight: '500',
      color: Colors.text,
      fontFamily: 'Rubik-Regular'
    },

    titleTiny: {
      fontSize: FontSize.tiny,
      fontWeight: 'bold',
      color: Colors.text,
      fontFamily: 'Rubik-Bold'
    },
    titleSmall: {
      fontSize: FontSize.small,
      fontWeight: 'bold',
      color: Colors.text,
      fontFamily: 'Rubik-Bold'
    },
    titleMediumSmall: {
      fontSize: FontSize.small * 1.5,
      fontWeight: 'bold',
      color: Colors.text,
      fontFamily: 'Rubik-Bold'
    },
    titleMedium: {
      fontSize: FontSize.small * 2,
      fontWeight: 'bold',
      color: Colors.text,
    },
    titleRegular: {
      fontSize: FontSize.regular * 2,
      fontWeight: 'bold',
      color: Colors.text,
      fontFamily: 'Rubik-Bold'
    },
    titleLarge: {
      fontSize: FontSize.large * 2,
      fontWeight: 'bold',
      color: Colors.text,
      fontFamily: 'Rubik-Bold'
    },

    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
  })
}

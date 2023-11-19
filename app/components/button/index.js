import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../../style/colors'

const AppButton = ({
    label,
    size = 'SMALL',
    disabled = false,
    buttonBackgroundColor,
    onPress = () => { },
    bordered = false
}) => {
    const primaryColorButton = disabled ? Colors.GRAY_G2 :
        (buttonBackgroundColor ? buttonBackgroundColor : Colors.BLUE_B1)
    const secondaryColorButton = disabled ? (bordered ? Colors.WHITE : Colors.GRAY_G3) : Colors.WHITE

    return (
        <TouchableOpacity
            onPress={disabled ? () => { } : onPress}
            style={[ContainerStyles.center, ContainerStyles[size], {maxWidth:120, backgroundColor: bordered ? secondaryColorButton : primaryColorButton, borderColor: primaryColorButton, borderWidth: 2 }]}>
            <Text style={[textStyles[size], { color: bordered ? primaryColorButton : secondaryColorButton }]}>{label}</Text>
        </TouchableOpacity>
    )
}

const ContainerStyles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    TINY: {
        borderRadius: 4,
        padding: 5,
    },
    SMALL: {
        borderRadius: 4,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    MEDIUM: {
        borderRadius: 8,
        paddingVertical: 13, paddingHorizontal: 24,
    },
    LARGE: {
        borderRadius: 10,
        paddingVertical: 21, paddingHorizontal: 32,
    },
    WRAP: {
        width: '100%',
        alignSelf: 'center',
        borderRadius: 5,
        paddingVertical: 13, paddingHorizontal: 24
    },
})
const textStyles = StyleSheet.create({
    TINY: {
        fontSize: 14
    },
    SMALL: {
        fontSize: 14, fontWeight: '500'
    },
    MEDIUM: {
        fontSize: 18, fontWeight: 'bold'
    },
    LARGE: {
        fontSize: 22, fontWeight: 'bold'
    },
    WRAP: {
        fontSize: 18, fontWeight: 'bold'
    },
})
export default AppButton;


/**
 * Testing examples
 *    <AppButton label={'Verify'} size={'TINY'} />
      <AppButton label={'AppButton Size'} size={'SMALL'} bordered={true} disabled={true} />
      <AppButton label={'AppButton Size'} size={'SMALL'} bordered={true}  />
      <AppButton label={'AppButton Size'} size={'MEDIUM'} disabled={true} />
      <AppButton label={'AppButton Size'} size={'LARGE'} />
      <AppButton label={'Button Size'} size={'WRAP'} />
 */
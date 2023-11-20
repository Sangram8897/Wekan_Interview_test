import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
export const Common = {
    componentHeight: 50,
    borderwidth: 1,
    borderRedius: 5,
    borderColor: 'skyblue',
}

const AppStyles = StyleSheet.create({
    componentContainer: {
        margin: 5,
    },
    componentInnerContainer: {

        // minHeight: Common.componentHeight,
        borderWidth: Common.borderwidth,
        borderRadius: Common.borderRedius,
        borderColor: Common.borderColor,
        justifyContent: 'center',
        padding: 10
    },
    componentInnerContainerTemp: {

        minHeight: Common.componentHeight,
        borderWidth: Common.borderwidth,
        borderRadius: Common.borderRedius,
        borderColor: Common.borderColor,
        justifyContent: 'center',
        padding: 10
    },
    title: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
    },
    sub_title: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    },
    textInput: {
        // minHeight: Common.componentHeight,
        // height: 40,
        // borderWidth: Common.borderwidth,
        // borderRadius: Common.borderRedius,
        // borderColor: Common.borderColor,
        justifyContent: 'center',
        marginHorizontal: 10,

       //textAlignVertical: 'top',

        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    },
    fieldLabelText: {
        fontSize: 12,
        // margin: 5,
        // marginBottom: 5,
       // fontFamily: 'Montserrat-SemiBold'
    },
    fieldValueText: {
        fontSize: 16,
        fontFamily: 'Montserrat-Medium',
    },
    errorText: {
        fontSize: 12,
        color: 'red'
    }

})

export default AppStyles;
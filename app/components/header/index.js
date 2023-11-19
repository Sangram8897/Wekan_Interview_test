import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../style/colors';

const _headerTextStyle = {
    fontSize: 18,
    fontFamily: "Montserrat-Medium"
}

export default function Header({
    hasBackButton = true,
    onBackbuttonPress = () => { },
    backgroundcolor = Colors.primary,
    headerTitle = 'Header',
    headerTextStyle = _headerTextStyle,
    showRightIcon,
    onRightIconPress
}) {
    return (
        <View style={{ height:50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: backgroundcolor }}>
            {
                hasBackButton == true && <Icon onPress={onBackbuttonPress} name={'arrow-back'} color={'white'} size={30} style={{ alignSelf: 'center', paddingHorizontal: 8, marginTop: 4 }} />
            }
            <View style={{ flex: 1, paddingHorizontal: hasBackButton == true ? 10 : 16 }}>

                <Text
                    numberOfLines={1}
                    style={[{color:'white'},headerTextStyle]}>{headerTitle}</Text>
            </View>
            {/* <Icon name={'notifications'} color={'gray'} size={25} style={{ alignSelf: 'center', paddingHorizontal: 8 }} /> */}
            {showRightIcon && <Icon onPress={onRightIconPress} name={'home'} color={'white'} size={22} style={{ alignSelf: 'center', paddingHorizontal: 8 }} />}
        </View>
    )
}

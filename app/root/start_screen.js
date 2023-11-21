import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { getUserData } from 'utils/keychain';

const AppStartScreen = ({ navigation }) => {
    const user_data = useSelector(state => state.auth.user);
    const profile_data = useSelector(state => state.profile.profile);

    useEffect(() => {
        let userData = getUserData()
        console.log('userData', userData);
    }, [])
    //   if (profile_data && user_data) {
    //     navigation.navigate('Dashboard')
    //   } else if (user_data) {
    //     navigation.navigate('CreateProfile', { item: null })
    //   }
    return (
        <View>
            <Text>User State</Text>
        </View>
    )
}

export default AppStartScreen

const styles = StyleSheet.create({})
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from 'store/constants/authActions';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Container } from 'components';
import { ScreensRoutes } from 'root/navigation/Screens';
import { Strings } from 'config/strings';
import { Colors } from 'styles/colors';

const { width, height } = Dimensions.get('window')

const Profile = ({ navigation }) => {

  const dispatch = useDispatch()
  const profile_data = useSelector(state => state.profile.profile);

  const logout = () => {
    dispatch(logoutRequest())
  }
  return (
    <Container>
      <View style={{ backgroundColor: Colors.PRIMARY, alignItems: 'center' }}>
        <View style={{ marginVertical: 16, alignItems: 'center' }}>
          <Text style={{ color: '#FFF', fontFamily: 'Montserrat-Bold', fontSize: 20, }}>{profile_data?.name}</Text>
          <Text style={{ color: '#FFF', fontFamily: 'Montserrat-Medium', fontSize: 14 }}>{Strings.PROFILE_MOB} : +91 {profile_data?.mobile_number}</Text>
          <Text style={{ color: '#FFF', fontFamily: 'Montserrat-Medium', fontSize: 14 }}> {profile_data?.address}</Text>
        </View>

        <View style={styles.profile_icon}>
          <FontAwesomeIcon name={'user-tie'} size={50} color={'gray'} />
        </View>

      </View>
      <View style={{ height: 60, }} />
      <View style={{ flex: 1, alignItems: 'center' }}>

        <TouchableOpacity
          onPress={() => navigation.navigate(ScreensRoutes.CREATE_PROFILE, profile_data)}
          style={styles.box}
        >
          <FontAwesome5 name={'user-edit'} size={20} color={'gray'} />
          <Text style={styles.boxText}>{Strings.PROFILE_UPDATE}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          disabled={true}
          style={styles.box}
        >
          <MaterialCommunityIcons name={'email-outline'} size={22} color={'gray'} />
          <Text style={styles.boxText} numberOfLines={1}>{profile_data?.email}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(ScreensRoutes.ADD_TASK)}
          style={styles.box}
        >
          <AntDesign name={'addfile'} size={22} color={'gray'} />
          <Text style={styles.boxText}>{Strings.CREATE_TASK}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={logout}
          style={styles.box}
        >
          <AntDesign name={'logout'} size={22} color={'red'} />
          <Text style={[styles.boxText, { color: 'red' }]}>{Strings.LOGOUT}</Text>
        </TouchableOpacity>

      </View>
    </Container>
  )
}

export default Profile

const styles = StyleSheet.create({
  profile_icon: {
    height: 100,
    width: 100,
    marginBottom: -50,
    borderRadius: 50,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    flexDirection: 'row',
    padding: 16,
    marginVertical: 8,
    width: '92%',
    backgroundColor: '#FFF',
    borderRadius: 4
  },
  boxText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginLeft: 16,
    color: Colors.BLACK
  }
})
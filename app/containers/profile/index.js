import { Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Props } from '../../root/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../store/sagas/authActions';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DropdownComponent from '../../components/dropdown';

const { width, height } = Dimensions.get('window')

const Profile = ({ navigation }) => {
  const dispatch = useDispatch()
  const profile_data = useSelector(state => state.profile.profile);
  const user_data = useSelector(state => state.auth.user);
  console.log('profile_data', profile_data, user_data);

  const logout = () => {
    dispatch(logoutRequest())
    //navigation.replace('LoginScreen')

  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: 'blue', alignItems: 'center' }}>
        <View style={{ marginVertical: 16, alignItems: 'center' }}>
          <Text style={{ color: '#FFF', fontFamily: 'Montserrat-Bold', fontSize: 20, }}>{profile_data?.name}</Text>
          <Text style={{ color: '#FFF', fontFamily: 'Montserrat-Medium', fontSize: 14 }}>Mob : {profile_data?.mobile_number}</Text>
          <Text style={{ color: '#FFF', fontFamily: 'Montserrat-Medium', fontSize: 14 }}> {profile_data?.address}</Text>
        </View>

        <View style={{
          height: 100,
          width: 100,
          marginBottom: -50,
          borderRadius: 50,
          backgroundColor: '#FFF',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <FontAwesomeIcon name={'user-tie'} size={50} color={'gray'} />
        </View>
      </View>
      <View style={{ height: 60, }} />
      <View style={{ flex: 1, alignItems: 'center' }}>

        <TouchableOpacity
          onPress={() => navigation.navigate('CreateProfile', { item: profile_data })}
          style={styles.box}
        >
          <FontAwesome5 name={'user-edit'} size={20} color={'gray'} />
          <Text style={styles.boxText}>Update Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          disabled={true}
          style={styles.box}
        >
          <MaterialCommunityIcons name={'email-outline'} size={24} color={'gray'} />
          <Text style={styles.boxText} numberOfLines={1}>{profile_data?.email}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('AddTask', { item: null })}
          style={styles.box}
        >
          <AntDesign name={'addfile'} size={22} color={'gray'} />
          <Text style={[styles.boxText, { color: 'gray' }]}>Add Task</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={logout}
          style={styles.box}
        >
          <AntDesign name={'logout'} size={20} color={'red'} />
          <Text style={[styles.boxText, { color: 'red' }]}>Logout</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({
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
    marginLeft: 16
  }
})


// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { Props } from '../../root/navigation'
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutRequest } from '../../store/sagas/authActions';

// const Profile = ({ navigation }) => {
//   const dispatch = useDispatch()
//   const profile_data = useSelector(state => state.profile.profile);
//   console.log('profile_data', profile_data);
//   return (
//     <View>
//       <Text style={{ color: 'blue' }}
//         onPress={() => navigation.navigate('CreateProfile')}
//       >Edit profile</Text>

//       <Text onPress={() => navigation.goBack()}>{profile_data?.name}</Text>
//       <Text onPress={() => navigation.goBack()}>{profile_data?.mobile_number}</Text>
//       <Text onPress={() => navigation.goBack()}>{profile_data?.address}</Text>
//       <Text onPress={() => navigation.goBack()}>{profile_data?.age}</Text>

//       <Text style={{ color: 'blue' }}
//         onPress={() => {
//           dispatch(logoutRequest())
//           navigation.replace('LoginScreen')
//         }}
//       >logout</Text>
//     </View>
//   )
// }

// export default Profile

// const styles = StyleSheet.create({})
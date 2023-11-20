import { Dimensions, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Props } from '../../root/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest } from '../../store/sagas/authActions';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width, height } = Dimensions.get('window')

const Profile = ({ navigation }) => {
  const dispatch = useDispatch()
  const profile_data = useSelector(state => state.profile.profile);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: 'blue', alignItems: 'center' }}>
        <Text style={{ color: '#FFF', fontFamily: 'Montserrat-Bold', fontSize: 20, marginVertical: 16 }}>{profile_data?.name}</Text>
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
          style={styles.box}
        >
          <AntDesign name={'logout'} size={20} color={'gray'} />
          <Text style={styles.boxText}>Logout</Text>
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
import { StyleSheet, SafeAreaView, Text, View, Button, ScrollView } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../store/reducer/counter'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import firestore from '@react-native-firebase/firestore';
import { Props } from '../../root/navigation'
import SectionIII from './resto_list/sectionIII'
import SectionI from './resto_list/sectionI'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import SectionII from './resto_list/sectionII'

/**
 * 
 * @param param0 
 * interface FoodDetailProps{ 
    onUpdateCart: Function,
    navigation: { getParam: Function, goBack: Function}
    userReducer: UserState,
 }
 * @returns 
 */

interface MyObject {
  id: string;
  age: number;
  name: string;
}

const Home = ({ navigation }: Props) => {
  const dispatch = useAppDispatch()
  const [resto_list, set_resto_list]=useState<MyObject[]>([])

  //const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')

  useEffect(() => {
   
    getRestosData()
  }, [])

  const getRestosData = async () => {
    try {
      firestore()
        .collection('Users')
        // .doc(subject_id)
        // .collection("modules")
        .get()
        .then(async querySnapshot => {
          // console.log('User ID: ', querySnapshot.id,);
          const packages_list: MyObject[] = [];
          querySnapshot.forEach(documentSnapshot => {
            let data = documentSnapshot.data()
            //var obj: { id: string, name: string, age: number };
            data.id = documentSnapshot.id
            //   console.log('packages_list data ', data);
            packages_list.push(data)
          });
          console.log('packages_list', packages_list);
          set_resto_list(packages_list)
          //  dispatch({ type: 'PACKAGE_LIST_SUCCESS', payload: packages_list });
        });
      return null;
    } catch (err) {
      console.log(err)
    }

  }
  const AddRestoData = async () => {
  await firestore()
    .collection('Users')
    .add({
      name: 'Ada Lovelace',
      age: 30,
    })
    .then(() => {
      console.log('User added!');
    })
    .catch((err)=>console.log(err)
    )
    getRestosData()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button title='Add' onPress={AddRestoData} />
      <ScrollView>
        {/* <GestureHandlerRootView>
          <SectionI />
        </GestureHandlerRootView>
        <SectionII /> */}
        <SectionIII navigation={navigation} resto_list={resto_list}/>

      </ScrollView>

      {/* {
        error ? <Text>Oh no, there was an error </Text> :
          isLoading ? <Text>Loading...</Text> :
            data ? <Text>{data.species.name} </Text> : null
      } */}

    </SafeAreaView>
  )
}

export default Home

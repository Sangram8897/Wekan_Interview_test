import { StyleSheet, SafeAreaView, Text, View, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../store/reducer/counter'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import firestore from '@react-native-firebase/firestore';
import { Props } from '../../root/navigation'
import SectionIII from './task_list/sectionIII'
import SectionI from './task_list/sectionI'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import SectionII from './task_list/sectionII'
import { taskListRequest } from '../../store/sagas/tasksActions'

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
  const [resto_list, set_resto_list] = useState<MyObject[]>([])
  const user_data = useSelector(state => state.auth.user);
  const task_list = useSelector(state => state.tasksReducer.tasks);

  useEffect(() => {
    dispatch(taskListRequest())
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text
        onPress={() => navigation.navigate('AddTask')}
        style={{
          fontSize: 14,
          fontFamily: 'Poppins-Bold',
          color: 'blue',
          padding: 8,
          paddingHorizontal: 12,
          alignSelf:'flex-end'
        }}
      >Add Task</Text>

      <ScrollView>
        {/* <GestureHandlerRootView>
          <SectionI />
        </GestureHandlerRootView>
        <SectionII /> */}
        <SectionIII navigation={navigation} resto_list={task_list} />

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

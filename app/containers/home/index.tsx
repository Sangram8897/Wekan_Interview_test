import { StyleSheet, SafeAreaView, TouchableOpacity, Text, View, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../store/reducer/counter'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import firestore from '@react-native-firebase/firestore';
import { Props } from '../../root/navigation'
import TaskList from './task_list'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { taskListRequest } from '../../store/constants/tasksActions'
import NotFound from '../../components/notfound'
import AntDesign from 'react-native-vector-icons/AntDesign';

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
  const profile_data = useSelector(state => state.profile.profile);

  console.log('user_data9999999', user_data);
  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddTask', { item: null })}
          style={{ marginRight: 10 }}>
          <AntDesign name={'addfile'} size={22} color={'blue'} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // useEffect(() => {
  //   if (!profile_data) {
  //     navigation.replace('CreateProfile', { item: null })
  //   }
  // }, [profile_data])

  useEffect(() => {
    dispatch(taskListRequest())
  }, [])

  if (profile_data) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {(task_list && task_list.length > 0) ?
          <TaskList navigation={navigation} resto_list={task_list} />
          : <NotFound />
        }

      </SafeAreaView>
    )
  }
  return <></>
}

export default Home
/**
 *  <ScrollView>
          {/* <GestureHandlerRootView>
          <SectionI />
        </GestureHandlerRootView>
        <SectionII /> //
        <TaskList navigation={navigation} resto_list={task_list} />

        </ScrollView>
 */
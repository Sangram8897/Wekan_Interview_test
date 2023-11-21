import { StyleSheet, SafeAreaView, TouchableOpacity, Text, View, Button, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { taskListRequest } from 'store/constants/tasksActions'
import NotFound from 'components/notfound'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Props } from '../../root/navigation'
import TaskList from './task_list'

import { RootState } from 'store/configure_store'
import Container from 'components/container'
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
  const dispatch = useDispatch()
  const user_data = useSelector((state: RootState) => state.auth.user);
  const task_list = useSelector((state: RootState) => state.tasksReducer.tasks);
  const profile_data = useSelector((state: RootState) => state.profile.profile);

  console.log('profile_data 9999999', profile_data);

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('AddTask', { item: {} })}
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
      <Container>
        {(task_list && task_list.length > 0) ?
          <TaskList navigation={navigation} resto_list={task_list} />
          : <NotFound />
        }

      </Container>
    )
  }
  return <></>
}

export default Home
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import useTheme from 'styles/hooks/useTheme'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { task_status_colors, task_status_obj } from 'config/variables';
import { deleteTaskRequest, taskListRequest } from 'store/constants/tasksActions';
import { useDispatch } from 'react-redux';
import Container from 'components/container';

const TaskInfo = ({ route, navigation, }: any) => {
  const { item } = route?.params;
  const dispatch = useDispatch()
  const { Layout, Fonts } = useTheme()

  const deleteTask = async (id: String) => {
    await dispatch(deleteTaskRequest(id))
    dispatch(taskListRequest())
    navigation.goBack()
  }

  return (
    <Container>
      <View style={[Layout.fill, { margin: 12, padding: 12, backgroundColor: '#FFF' }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <Text style={[styles.taskStatusText, {
            color: task_status_colors[item?.status]
          }]}>{item?.status ? task_status_obj[item?.status] : 'DRAFT'}</Text>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('AddTask', item) }}
              style={{ height: 20, width: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
              {/* <Text>4.4 * </Text> */}
              <AntDesignIcon name={'edit'} size={20} color={'skyblue'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteTask(item.id)}
              style={{ height: 20, width: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
              <AntDesignIcon name={'delete'} size={20} color={'red'} />
            </TouchableOpacity>
          </View>
        </View>


        <Text style={[styles.title]}>{item.title}</Text>


        <Text style={[styles.descTitleText]}>{'Description : '}</Text>
        <Text style={[Fonts.textSmall, styles.desc]}>{item?.description}</Text>
      </View>
    </Container>
  )
}

export default TaskInfo

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: 'black'
  },
  desc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14
  },
  taskStatusText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    marginVertical: 4
  },
  descTitleText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'gray'
  },
})
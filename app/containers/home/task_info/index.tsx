import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import useTheme from 'styles/hooks/useTheme'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { task_status_colors, task_status_obj } from 'config/variables';
import { deleteTaskRequest, taskListRequest } from 'store/constants/tasksActions';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'components/container';
import { RootState } from 'store/configure_store';
import moment from 'moment';
import { Colors } from 'styles/colors';
import { alertHandler } from 'config/message';
import { async } from 'validate.js';
import { Strings } from 'config/strings';

const TaskInfo = ({ route, navigation, }: any) => {
  const { item } = route?.params;
  const { Layout, Fonts } = useTheme()
  const dispatch = useDispatch()
  const user_data = useSelector((state: RootState) => state.auth.user);


  const deletePopup = () => {
    alertHandler(Strings.DELETE_TASK_POPUP_MSG, deleteTask)
  }

  const deleteTask = async () => {
    await dispatch(deleteTaskRequest(item.id))
    dispatch(taskListRequest(user_data.uid))
    navigation.goBack()
  }

  return (
    <Container>
      <View style={[Layout.fill, { margin: 12, padding: 12, backgroundColor: '#FFF' }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <Text style={[styles.taskStatusText, {
            color: task_status_colors[item?.status]
          }]}>{item?.status ? task_status_obj[item?.status] : ''}</Text>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => { navigation.navigate('AddTask', item) }}
              style={{ height: 20, width: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
              {/* <Text>4.4 * </Text> */}
              <AntDesignIcon name={'edit'} size={20} color={'skyblue'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deletePopup()}
              style={{ height: 20, width: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
              <AntDesignIcon name={'delete'} size={20} color={'red'} />
            </TouchableOpacity>
          </View>
        </View>


        <Text style={[styles.title]}>{item.title}</Text>

        <Text style={[styles.DueDateTitleText]}>{'Due Date : '}
          {item?.due_date && <Text style={styles.dueDateText}>
            {moment(item?.due_date).format('DD-MMM')}
          </Text>}
        </Text>

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
    marginTop: 16,
    color: 'black'
  },
  desc: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginTop: 8,
  },
  taskStatusText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    marginVertical: 4
  },
  descTitleText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginTop: 12,
    color: 'gray'
  },
  dueDateText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Bold',
    color: Colors.BLACK
  },
  DueDateTitleText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    color: Colors.GRAY_G3
  },
})
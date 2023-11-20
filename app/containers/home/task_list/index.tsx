import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { NavigationProp } from "@react-navigation/native";
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useAppDispatch } from '../../../store/hooks';
import { deleteTaskRequest, taskListRequest } from '../../../store/constants/tasksActions';
import { task_status_colors, task_status_obj } from '../../../config/variables';

interface RouterProps {
  navigation: NavigationProp<any, any>;
  resto_list: object
}

type ItemProps = { title: string };

const TaskList = ({ navigation, resto_list }: RouterProps) => {
  const dispatch = useAppDispatch()

  const deleteTask = async (id: String) => {
    await dispatch(deleteTaskRequest(id))
    dispatch(taskListRequest())

  }
  const Item = ({ item }: any) => {
    console.log('88897', item);

    return (<TouchableOpacity
      onPress={() => navigation.navigate('TaskInfo', { item: item })}
      style={styles.item}>

      <View style={{ padding: 12 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text style={styles.title}>{item?.title}</Text>

            <Text style={[styles.taskStatusText, {
              color: task_status_colors[item?.status]
            }]}>{item?.status ? task_status_obj[item?.status] : 'DRAFT'}</Text>

          </View>
          <TouchableOpacity
            onPress={() => { navigation.navigate('AddTask', item) }}
            style={{ height: 20, width: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
            {/* <Text>4.4 * </Text> */}
            <AntDesignIcon name={'edit'} size={20} color={'gray'} />
          </TouchableOpacity>

        </View>

        <Text style={styles.description} numberOfLines={4}>{item?.description}</Text>
      </View>
    </TouchableOpacity>)
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={{ paddingVertical: 8 }}
        scrollEnabled={false}
        data={resto_list}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 8,
    shadowColor: '#CCC',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: 'black'
  },
  taskStatusText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
  },
  description: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
  }
});

export default TaskList;

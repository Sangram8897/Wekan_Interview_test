import React from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { NavigationProp } from "@react-navigation/native";
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

import { task_status_colors, task_status_obj } from 'config/variables';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Colors } from 'styles/colors';
import { ScreensRoutes } from 'root/navigation/Screens';
import { Strings } from 'config/strings';

interface RouterProps {
  navigation: NavigationProp<any, any>;
  resto_list: object[]
}

const TaskList = ({ navigation, resto_list }: RouterProps) => {

  const Item = ({ item }: any) => {
    return (<TouchableOpacity
      onPress={() => navigation.navigate(ScreensRoutes.TASK_INFO, { item: item })}
      style={styles.item}>

      <View style={{ padding: 12 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', flex: 1 }}>

            <Text style={[styles.taskStatusText, {
              color: task_status_colors[item?.status]
            }]}>{item?.status ? task_status_obj[item?.status] : ''}</Text>

            <Text style={styles.title}>{item?.title}</Text>

            <Text style={[styles.DueDateTitleText]}>{Strings.VIEW_DUE_DATE+"  "}
              {item?.due_date && <Text style={styles.dueDateText}>
                {moment(item?.due_date).format('DD-MMM')}
              </Text>}
            </Text>

          </View>
          <TouchableOpacity
            onPress={() => { navigation.navigate(ScreensRoutes.ADD_TASK, item) }}
            style={{ height: 20, width: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
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
        data={resto_list}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={()=> <View style={{height:50}}/>}
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
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    marginTop:8,
    marginBottom:4,
  },
  taskStatusText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
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
  description: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#555555',
    marginVertical:4,
  }
});

export default TaskList;

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

interface RouterProps {
  navigation: NavigationProp<any, any>;
  resto_list: object
}

type ItemProps = { title: string };

const SectionIII = ({ navigation, resto_list }: RouterProps) => {

  const Item = ({ title }: ItemProps) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('RestoInfo')}
      style={styles.item}>
      <Image
        style={{ width: '100%', height: 170, resizeMode: 'cover' }}
        source={require('./../../../../assets/images/image2.jpg')} />
      <View style={{ padding: 12 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text style={styles.title}>{'ITR Master Chef Creation'}</Text>
            <Text style={styles.sub_title}>{'North Indian'}</Text>
            <Text style={styles.sub_title}>{'45 - 55 min . 2km'}</Text>
          </View>
          <View
            style={{ height: 20, width: 50, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
            <Text>4.4 * </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'row', flex: 2 }}>
            <Text style={styles.sub_title}>{'Extra 10% off'}</Text>
          </View>
          <View style={{ flexDirection: 'row', flex: 3 }}>
            <Text style={styles.sub_title}>{'50% off upto 100'}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={{ paddingVertical: 8 }}
        scrollEnabled={false}
        data={resto_list}
        renderItem={({ item }) => <Item title={item.title} />}
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
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color:'black'
  },
  sub_title: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
});

export default SectionIII;

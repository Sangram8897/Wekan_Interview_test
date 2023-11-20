import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Fi',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Sec',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Th',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed59-3ad53abb28ba',
    title: 'Fi',
  },
  {
    id: '3ac68afc-c605j-48d3-a4f8-fbd91aa97f63',
    title: 'Sec',
  },
  {
    id: '58694a0f-3da1-471f00-bd96-145571e29d72',
    title: 'Th',
  },
];

type ItemProps = { title: string };

const Item = ({ title }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const SectionII = () => {
  return (
    <View style={styles.container}>
      <FlatList
      horizontal={true}
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   // flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    width:100,
    height:150,
    marginVertical: 4,
    marginHorizontal: 4,
  },
  title: {
    fontSize: 32,
  },
});

export default SectionII;

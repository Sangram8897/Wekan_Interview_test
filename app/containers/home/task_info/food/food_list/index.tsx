import React from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import { NavigationProp } from "@react-navigation/native";

interface RouterProps {
    navigation: NavigationProp<any, any>;
}

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed59-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605j-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f00-bd96-145571e29d72',
        title: 'Third Item',
    },
];

type ItemProps = { title: string };



const FoodList = () => {

    const Item = ({ title }: ItemProps) => (
        <View
            style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                // scrollEnabled={false}
                data={DATA}
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
        backgroundColor: '#f9c2ff',
        padding: 70,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default FoodList;
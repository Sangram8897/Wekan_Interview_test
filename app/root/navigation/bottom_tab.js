import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../../containers/profile';
import Home from '../../containers/home';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { View, Text, TouchableOpacity, Button, Alert } from 'react-native';

const Tab = createBottomTabNavigator();

function BottomTab() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Profile') {
                        iconName = focused
                            ? 'user'
                            : 'user-o';
                    } else if (route.name === 'Home') {
                        iconName = focused ? 'layers' : 'layers-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    }

                    // You can return any component that you like here!
                    return <FontAwesome name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
            
            />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

export default BottomTab;
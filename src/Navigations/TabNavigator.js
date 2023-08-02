import { StyleSheet, useWindowDimensions } from 'react-native'
import React, {useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Avatar, Box, Center, Icon, Pressable, Text,  Modal, HStack} from 'native-base';
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useRoute } from '@react-navigation/native';
import Home from '../screens/Op';
import About from '../screens/Profile';

import Profile from '../screens/Profile';
import Online from '../screens/Online';
import CustomHeader from '../components/CustomHeader';
import ProfileNavigation from './ProfileNavigation';
import Op from '../screens/Op';
import OpNavigation from './OpNavigation';
import OnlineNavigation from './OnlineNavigation';
import ReportNavigation from './ReportNavigation';

const Tab = createBottomTabNavigator();

const TabNavigator = ({navigation}) => {

    const { width, height } = useWindowDimensions()

    
    return (
        <>
            <CustomHeader/>
            <Tab.Navigator 
                initialRouteName='opNav'
                
                screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarHideOnKeyboard:true,
                tabBarStyle :{ height:  70 },
                tabBarItemStyle: { justifyContent: 'center', height: 65 },
                tabBarIcon: ({ focused, color, size, bgColor }) => {
                    let iconName;
                    color = focused ? '#1A73BA' : '#504848'
                    bgColor = focused ? "blue.100" : "#fff"
                    if (route.name === 'opNav') {
                        iconName = 'home'
                        return <Box 
                        w={'70%'} bg={bgColor} alignItems={'center'} 
                        h={'70%'} justifyContent='center' borderRadius={10}
                    >
                        <MaterialIcons name={iconName} size={38} color={color}/>
                    </Box> ;
                    } else if (route.name === 'OnlineNavigation') {
                        iconName = 'note-add';
                        return <Box 
                        w={'70%'} bg={bgColor} alignItems={'center'} 
                        h={'70%'} justifyContent='center' borderRadius={10}
                    >
                        <MaterialIcons name={iconName} size={34} color={color}/>
                    </Box>;
                    } 
                    
                    // else if (route.name === 'ReportNavigation') {
                    //     iconName = 'chat-processing';
                    //     return <Box 
                    //     w={'70%'} bg={bgColor} alignItems={'center'} 
                    //     h={'70%'} justifyContent='center' borderRadius={10}
                    // >
                    //     <MaterialCommunityIcons name={iconName} size={38} color={color}/>
                    // </Box>;
                    // } 
                    
                    else if (route.name === 'Profile') {
                        iconName = 'person-circle-outline';
                        return <Box 
                        w={'70%'} bg={bgColor} alignItems={'center'} 
                        h={'70%'} justifyContent='center' borderRadius={10}
                    >
                        <Ionicons name={iconName} size={38} color={color}/>
                    </Box>;
                    }
                  
                },
                
                headerShown: false,
                
            })}
            >
                <Tab.Screen name="opNav" component={OpNavigation} />
                <Tab.Screen name="OnlineNavigation" component={OnlineNavigation} />
                {/* <Tab.Screen name="ReportNavigation" component={ReportNavigation}/> */}
                <Tab.Screen name="Profile" component={ProfileNavigation}/>
         
            </Tab.Navigator>
            </>
    )
}

export default TabNavigator

const styles = StyleSheet.create({
    top: {
        marginBottom: "auto",
        marginTop: 0
      },
      bottom: {
        marginBottom: 85,
        marginTop: "auto"
      },
      left: {
        marginLeft: 0,
        marginRight: "auto"
      },
      right: {
        marginLeft: "auto",
        marginRight: 0
      },
      center: {}
})
import { StyleSheet } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Box } from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Octicons from 'react-native-vector-icons/Octicons'
import CustomHeader from '../components/CustomHeader';
import ProfileNavigation from './ProfileNavigation';
import Op from '../screens/Home/Op';
import Online from '../screens/Home/Online';
import Reportview from '../screens/Home/ReportView';

const Tab = createBottomTabNavigator();

const TabNavigator = ({navigation}) => {


    
    
    return (
        <>
            <CustomHeader/>
            <Tab.Navigator 
                initialRouteName={"opNav"}
                screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarHideOnKeyboard:true,
                tabBarStyle :{ height:  60 },
                tabBarItemStyle: { justifyContent: 'center', height: 50 },
                tabBarIcon: ({ focused, color, size, bgColor }) => {
                    let iconName;
                    color = focused ? '#1A73BA' : '#504848'
                    bgColor = focused ? "blue.100" : "#fff"
                    if (route.name === 'opNav') {
                        iconName = 'clinic-medical'
                        return <Box 
                        w={'70%'} bg={bgColor} alignItems={'center'} 
                        h={'70%'} justifyContent='center' borderRadius={10}
                    >
                        <FontAwesome5 name={iconName} size={size} color={color}/>
                    </Box> ;
                    } else if (route.name === 'OnlineNavigation') {
                        iconName = 'laptop-medical';
                        return <Box 
                        w={'70%'} bg={bgColor} alignItems={'center'} 
                        h={'70%'} justifyContent='center' borderRadius={10}
                    >
                      <FontAwesome5 name={iconName} size={size} color={color}/>
                    </Box>;
                    } else if (route.name === 'ReportNavigation') {
                        iconName = 'notes-medical'                        
                        return <Box 
                        w={'72%'} bg={bgColor} alignItems={'center'} 
                        h={'72%'} justifyContent='center' borderRadius={10}
                    >
                         <FontAwesome5 name={iconName} size={size} color={color}/>
                    </Box>;
                    } else if (route.name === 'Profile') {
                        iconName = 'feed-person';
                        return <Box 
                        w={'70%'} bg={bgColor} alignItems={'center'} 
                        h={'70%'} justifyContent='center' borderRadius={10}
                    >
                        <Octicons name={iconName} size={28} color={color}/>
                    </Box>;
                    }
                  
                },
                
                headerShown: false,
                
            })}
            >
                <Tab.Screen name="opNav" component={Op} />
                <Tab.Screen name="OnlineNavigation" component={Online} />
                <Tab.Screen name="ReportNavigation" component={Reportview}/>
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
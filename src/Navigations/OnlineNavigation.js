import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Online from '../screens/Online';
import Booking from '../screens/Online/Booking';
import DoctorDetails from '../screens/Drawer/ReportReview/Departments/DoctorDetails';

const Stack = createNativeStackNavigator();

const OnlineNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='Online'  screenOptions={{ headerShown: false }}> 
            <Stack.Screen name="Online" component={Online}/>
            <Stack.Screen name="Booking" component={Booking}/>
         
        </Stack.Navigator>
    )
}

export default OnlineNavigation

const styles = StyleSheet.create({})
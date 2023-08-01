import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Op from '../screens/Op';
import PatientBookingDetails from '../screens/Home/PatientBookingDetails/index.js';
import PatientHistory from '../screens/Home/PatientBookingDetails/PatientHistory';
import ReferService from '../screens/Home/PatientBookingDetails/ReferService';
import ReferProcedure from '../screens/Home/PatientBookingDetails/ReferProcedure';

const Stack = createNativeStackNavigator();

const OpNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='Op'  screenOptions={{ headerShown: false }}> 
            <Stack.Screen name="Op" component={Op}/>
            <Stack.Screen name="PatientBookingDetails" component={PatientBookingDetails}/>
            <Stack.Screen name="ReferService" component={ReferService}/>
            <Stack.Screen name="ReferProcedure" component={ReferProcedure}/>
            <Stack.Screen name="PatientHistory" component={PatientHistory}/>  

        </Stack.Navigator>
    )
}

export default OpNavigation

const styles = StyleSheet.create({})
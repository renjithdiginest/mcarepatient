import { StyleSheet, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PatientBookingDetails from '../screens/Home/PatientBookingDetails/index.js';
import PatientHistory from '../screens/Home/PatientBookingDetails/PatientHistory';
import ReferService from '../screens/Home/PatientBookingDetails/ReferService';
import ReferProcedure from '../screens/Home/PatientBookingDetails/ReferProcedure';
import Reportview from '../screens/Reportview/index.js';

const Stack = createNativeStackNavigator();

const ReportNavigation = () => {
    return (
        <Stack.Navigator initialRouteName='Reportview'  screenOptions={{ headerShown: false }}> 
            <Stack.Screen name="Reportview" component={Reportview}/>
            <Stack.Screen name="PatientBookingDetails" component={PatientBookingDetails}/>
            <Stack.Screen name="ReferService" component={ReferService}/>
            <Stack.Screen name="ReferProcedure" component={ReferProcedure}/>
            <Stack.Screen name="PatientHistory" component={PatientHistory}/>    
        </Stack.Navigator>
    )
}

export default ReportNavigation

const styles = StyleSheet.create({})
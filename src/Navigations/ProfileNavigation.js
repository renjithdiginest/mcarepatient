import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Box, Text } from 'native-base';
import Profile from '../screens/Profile';
import TimeManagement from '../screens/Profile/TimeManagement';
import LeaveManagement from '../screens/Profile/LeaveManagement';
import AddLeave from '../screens/Profile/LeaveManagement/AddLeave';
import EditProfile from '../screens/Profile/EditProfile';
import Consultaions from '../screens/Profile/Consultation';
import Blogs from '../screens/Profile/Blogs';
import BlogSingleView from '../screens/Profile/Blogs/BlogView';
import PatientBookingDetails from '../screens/Home/PatientBookingDetails';
const Stack = createNativeStackNavigator();
const ProfileNavigation = () => {
  return (
  
        <Stack.Navigator initialRouteName={'Profiles'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="profiles" component={Profile}/>
            <Stack.Screen name="timeManagement" component={TimeManagement}/>
            <Stack.Screen name="leaveManagement" component={LeaveManagement}/>
            <Stack.Screen name="AddLeave" component={AddLeave}/>
            <Stack.Screen name="editProfile" component={EditProfile}/>
            <Stack.Screen name="consultaions" component={Consultaions}/>
            <Stack.Screen name='blogs' component={Blogs}/>
            <Stack.Screen name="PatientBookingDetails" component={PatientBookingDetails}/>

{/* 
            <Stack.Screen name="AddLeave" component={AddLeave} options={{
                presentation: 'containedTransparentModal'
            }} /> */}

        </Stack.Navigator>
      
  )
}

export default ProfileNavigation

const styles = StyleSheet.create({})
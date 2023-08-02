import { StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Box, Text } from 'native-base';
import Profile from '../screens/Profile';

const Stack = createNativeStackNavigator();
const ProfileNavigation = () => {
  return (
  
        <Stack.Navigator initialRouteName={'Profiles'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="profiles" component={Profile}/>
        </Stack.Navigator>
      
  )
}

export default ProfileNavigation

const styles = StyleSheet.create({})
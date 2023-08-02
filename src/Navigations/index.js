import { StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Box, Spinner, Text } from 'native-base';
import Login from '../screens/auth';
import Forget from '../screens/auth/forget';
import Home from '../screens/Op';
import TabNavigator from './TabNavigator';
import { navigationRef } from './RootNavigation';
import Otp from '../screens/auth/Otp';
import reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { BASE_IMAGE_URL, LOGIN_SUCCESS, PRIVATE_USER } from '../Redux/constants/authConstants';
import { getProfile } from '../Redux/actions/profileActions';

import Register from '../screens/auth/Register';
import BlogSingleView from '../screens/Op/BlogView';
import Menu from './Menu';
import ViewPdf from '../screens/ViewPdf';
import SplashScreen from 'react-native-splash-screen'
import Notifications from '../screens/Notifications';
import { CallScreen } from '../screens/call-screen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [loading, setLoading] = useState(true)
  const [initial, setInitial] = useState(null)

  const dispatch = useDispatch();


  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("token");
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    const privateD = JSON.parse(await AsyncStorage.getItem('private'))
    const BaseImageUrl = JSON.parse(await AsyncStorage.getItem('baseImageUrl'))


    try {
      if (user) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: user
        })

        dispatch({
          type: PRIVATE_USER,
          payload: privateD
        })

        dispatch({
          type: BASE_IMAGE_URL,
          payload: BaseImageUrl
        })


        setInitial('Menu')
       
        setLoading(false)
        dispatch(getProfile(user?._id))
        SplashScreen.hide();
      } else {
        setInitial('login')
        
        setLoading(false)
        SplashScreen.hide();
      }
    }
    catch (e) {
      setInitial('login')
      
      setLoading(false)
      SplashScreen.hide();
    }
  }


  useEffect(() => {
    checkLogin()
  }, [])

  if (loading) {
    return (
      <Box><Spinner /></Box>
    )
  }

  return (
    <Box flex={1} safeArea>
      <NavigationContainer
        ref={navigationRef}
      >
        <Stack.Navigator
          initialRouteName={initial}
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="forget" component={Forget} />
          <Stack.Screen name="otp" component={Otp} />
          <Stack.Screen name="register" component={Register} />
          <Stack.Screen name="Menu" component={Menu} />
          <Stack.Screen name="viewpdf" component={ViewPdf}/> 
          <Stack.Screen name="notifications" component={Notifications}/> 
          <Stack.Screen name="Call" component={CallScreen} options={{ headerShown: false }}
      />
        </Stack.Navigator>
      </NavigationContainer>
    </Box>
  )
}

export default Navigation

const styles = StyleSheet.create({})
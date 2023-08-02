import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import CustomLogo from './CustomLogo'
import { Box, HStack, Pressable, StatusBar } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'

const CustomBlogHeader = () => {
  return (
    <>
        <StatusBar hidden={false} translucent={true} barStyle="default" />
        <HStack
            px={3}  
            alignItems='center'
        >   
            <Pressable flex={0.45} >
                {/* <Ionicons name={"menu-sharp"} size={23} color={"#057EC1"}/> */}
            </Pressable>
            <Box  mt={2} flex={0.55}>
              <CustomLogo size={60}/>
            </Box>
            <Pressable>
                <Ionicons name={"ios-notifications-sharp"} size={22} color={"#057EC1"}/>
            </Pressable>
        </HStack>
     
        </>
  )
}

export default memo(CustomBlogHeader) 

const styles = StyleSheet.create({})
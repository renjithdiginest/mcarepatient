import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Pressable, Text } from 'native-base'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

const AuthBtn = ({ onPress, width, height, mt, bg, ml, label }) => {
    return (
        <Pressable 
            onPress={onPress}
      
            borderRadius={8}
            mt={mt}
            alignItems={'center'} justifyContent='center'
            bg={'#fff'}
        >
            <Text 
                color={'#057DC1'} fontWeight={500} fontFamily="body" fontSize={13} py={1} px={4}
            >{label}
            </Text>

        </Pressable>
    )
}

export default AuthBtn

const styles = StyleSheet.create({})
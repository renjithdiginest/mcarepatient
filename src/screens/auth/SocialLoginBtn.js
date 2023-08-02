import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Pressable, Image, Icon } from 'native-base'
import EvilIcons from 'react-native-vector-icons/EvilIcons'

const SocialLoginBtn = ({ onPress, width, height, mt, bg, ml, iconName }) => {
    return (
        <Pressable 
            onPress={onPress}
            shadow={5}
            borderRadius={10}
            mt={mt}
            ml={ml}
            alignItems={'center'} justifyContent='center'
            height={42} width={42}
            bg={bg ? bg : '#fff'}
        >
            {iconName ? 
            <Icon as={<EvilIcons/>} name={iconName} size={35} color='#fff' ml={0.5}/>  :
            <Image 
                size={6}
                source={require('../../images/google.png')}
                alt="image" resizeMode='contain' alignSelf='center' 
            />}

        </Pressable>
    )
}

export default SocialLoginBtn

const styles = StyleSheet.create({})
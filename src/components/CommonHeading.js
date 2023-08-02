import { StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { HStack, Text, Pressable, Image } from 'native-base'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const CommonHeading = ({label, goBack, px}) => {
    return (
        <HStack alignItems={'center'} px={px} >
            {goBack&&<Pressable
                onPress={goBack}
                alignItems={'center'} justifyContent='center' borderRadius={8} bg='#fff' width={10} height={10} mr={1} shadow={1}> 
                <Image source={require('../images/left.png')} alt='img' mr={1.5}/>
            </Pressable>}
            <Text color={'#444444'} fontFamily='body' fontWeight={600} letterSpacing={1} fontSize={22} >{label}</Text>
        </HStack>
    )
}

export default memo(CommonHeading)

const styles = StyleSheet.create({})
import { StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { Box, HStack, Icon, Pressable, ScrollView, Text, View } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'

const AddedItemCard = ({label, onPress, removeItem,  }) => {

    const { width, height } = useWindowDimensions()

    // reactotron.log({label})

    return (
        <HStack
            my={1.5} alignItems='center'  bg='#EFEFEF'  
            borderRadius={15} justifyContent={'space-between'} px={3}
        >
            <Text fontSize={14} fontWeight={600}  color='#000' py={3}>{label}</Text>
            {removeItem&&<Icon as={<Ionicons/>} name='close' color={'#FF0000'} size={21} onPress={removeItem}/>}
        </HStack>
    )
}

export default AddedItemCard

const styles = StyleSheet.create({})
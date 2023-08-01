import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Box, HStack, Text, Pressable, useToast, FlatList, Icon,  } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'

const SelectProcedureCard = ({selected, onChanged, item}) => {

    const { width, height } = useWindowDimensions()

    return (
        <HStack   mt={2} mx={3} justifyContent='space-between'  width={width/1.5} alignSelf='center' alignItems={'center'}>

            <Text color={'#000000'} fontFamily='body' fontWeight={600} fontSize={13} >{item?.name}</Text>
            <Icon 
                onPress={onChanged} 
                as={<Ionicons name={ selected === item?._id ? "ios-checkmark-circle" : "ellipse-outline"} />} 
                color={ selected === item?._id ? "#005EAA" : 'gray.500'}
                size={25}
            />

        </HStack>
    )
}

export default SelectProcedureCard

const styles = StyleSheet.create({})
import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Box, HStack, Text, Icon, Image } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'


const Divider = () => {
    return (
        <HStack justifyContent={'space-between'} alignItems='center' mt={4} mx={2}>
            <Box height={0.4} bg='#047BC2' width={'45%'}>

            </Box>
            <Icon 
                as={<Ionicons/>} 
                name='ellipse' 
                size={3} color='#047BC2'
            />
            <Box height={0.4} bg='#047BC2'  width={'45%'} >

            </Box>

        </HStack>
    )
}

export default Divider

const styles = StyleSheet.create({})
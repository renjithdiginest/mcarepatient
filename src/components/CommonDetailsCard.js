import { StyleSheet, useWindowDimensions } from 'react-native'
import React, {useState} from 'react'
import { Box, Text, HStack, Pressable, Icon, Image, useToast, Modal, ScrollView, Avatar } from 'native-base'

const CommonDetailsCard = ({label, data, mt}) => {
  return (
    <Box mt={mt} >
        <Text 
            color={'#444444'} fontWeight={700} fontFamily="body" fontSize={17} 
        >{label}</Text>
        <Box  
            borderRadius={10} bg='#EFEFEF' justifyContent={'center'} minH={43}
        >
            <Text 
                color={'#444444'} fontWeight={600} fontFamily="body" fontSize={14} ml={3}
            >{data}</Text>
        </Box>
    </Box>
  )
}

export default CommonDetailsCard

const styles = StyleSheet.create({})
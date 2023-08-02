import { StyleSheet, useWindowDimensions } from 'react-native'
import React, {memo, useState} from 'react'
import { Box, Text, HStack, Pressable, Icon, Image, useToast, Modal, ScrollView, Avatar } from 'native-base'

const CommonDetailsCard = ({label, data, mt, bg, textColor}) => {
  return (
    <Box mt={mt} >
        <Text 
            color={'#444444'} fontWeight={700} fontFamily="body" fontSize={16} 
        >{label}</Text>
        <Box  
            borderRadius={10} bg={bg ? bg : '#FAFAFA'} justifyContent={'center'} minH={43}
        >
            <Text 
                color={ textColor ? textColor : '#444444'} fontWeight={600} fontFamily="body" fontSize={12} ml={3}
            >{data}</Text>
        </Box>
    </Box>
  )
}

export default memo(CommonDetailsCard) 

const styles = StyleSheet.create({})
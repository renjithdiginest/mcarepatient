

import { StyleSheet, Switch } from 'react-native'
import React, { memo } from 'react'
import { Box, HStack, Text, Image, Pressable, Icon } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ListItem = ({ label, size, onPress, onValueChange, value }) => {
  return (

    <TouchableOpacity onPress={onPress} >
      <Box px={5}>
        <HStack
     
          borderBottomWidth={1}
          borderBottomColor='#0000000D' py={3}
          justifyContent='space-between'
          alignItems='center'
        >

          <Text color={'#444444'} fontWeight={600} fontSize={19} letterSpacing={0.5}>{label}</Text>
          <Image source={require('../images/right.png')} alt='img' />

        </HStack>
      </Box>

    </TouchableOpacity>
  )
}

export default memo(ListItem) 

const styles = StyleSheet.create({})
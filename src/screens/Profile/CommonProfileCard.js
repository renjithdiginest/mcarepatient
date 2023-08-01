import { StyleSheet, Switch, TouchableOpacity } from 'react-native'
import React from 'react'
import { Box, HStack, Text, Image, Pressable, Icon } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'

const CommonProfileCard = ({ label, size, onPress, onValueChange, value }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <HStack
        px={5}
        borderBottomWidth={1}
        borderBottomColor='#0000000D' py={3}
        justifyContent='space-between'
        alignItems='center'
      >

        <Text color={'#444444'} fontWeight={600} fontSize={18} letterSpacing={0.5}>{label}</Text>
        <Image source={require('../../images/right.png')} alt='img' />

      </HStack>
    </TouchableOpacity>
  )
}

export default CommonProfileCard

const styles = StyleSheet.create({})
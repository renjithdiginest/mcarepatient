import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { Image } from 'native-base'

const CustomLogo = ({size, mt}) => {
  return (
    <Image 
        source={require('../images/hlogo.png')} 
        alt="image" resizeMode='contain' size={size} 
    />
  )
}

export default memo(CustomLogo) 

const styles = StyleSheet.create({})
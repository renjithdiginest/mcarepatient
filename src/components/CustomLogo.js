import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'native-base'

const CustomLogo = ({size, mt}) => {
  return (
    <Image 
        source={require('../images/hlogo.png')} 
        alt="image" resizeMode='contain' size={size} 
    />
  )
}

export default CustomLogo

const styles = StyleSheet.create({})
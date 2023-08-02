import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { memo } from 'react'

const CustomBackground = ({children}) => {


  return (
    <ImageBackground source={require('../images/homebg.png')} style={styles.image}>
      {children}
    </ImageBackground>
  )
}

export default memo(CustomBackground) 

const styles = StyleSheet.create({
 
  image: {
    flex: 1,
  }
})
import { StyleSheet, useWindowDimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Box, HStack, Text, Image, Pressable, Icon, Avatar, FlatList, Modal } from 'native-base'
import LottieView from 'lottie-react-native';

const LoaderLottie = ({isVisible}) => {
  return (
    <Modal isOpen={isVisible} >
        <Box bg={'#333333'} borderRadius={30} alignItems='center'>
            <LottieView
                source={require('../Lottie/download.json')}
                autoPlay
                style={{height:90, width:90}}
            />
            {/* <Text fontWeight={600} color={'#fff'} fontSize={13} px={10} pb={5}>Uploading Image</Text> */}
        </Box>
    </Modal>
  )
}

export default LoaderLottie

const styles = StyleSheet.create({})
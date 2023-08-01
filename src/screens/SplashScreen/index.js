import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Box, Image, VStack } from 'native-base'
import backgroundImage from "../../images/maskgroup.png"
const SplashScreen = () => {
    return (
        <ImageBackground source={require('../../images/maskgroup.png')} resizeMode="cover" style={styles.image}>
            {/* <Box flex={.5}> */}
{/* 
            </Box> */}
            {/* <VStack flex={.5} justifyContent={'space-around'} alignItems={'center'}> */}
                {/* <Image
                    source={require('../../images/hlogo.png')}
                    alt="image" resizeMode='contain'
                />
                   <Image
                    source={require('../../images/doctor-svgrepo-com.png')}
                    alt="image" resizeMode='contain' 
                /> */}
{/* 
            </VStack> */}

        </ImageBackground >
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    image: {
		flex: 1,
		justifyContent: "center"
	},
})
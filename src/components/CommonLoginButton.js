import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Box, Pressable, Image } from 'native-base'

const CommonLoginButton = ({ onPress, width,mt }) => {
    return (
        <TouchableOpacity onPress={onPress}
        >
            <Box borderRadius={10}
               mt={mt}
                alignItems={'center'} justifyContent='center'
                height={55} width={width ? width : 55}
                bg={{
                    linearGradient: {
                        colors: ['#0E9DAB', '#047AC3'],
                        start: [0, 1],
                        end: [1, 1]
                    }
                }}>
                <Image source={require('../images/login-svgrepo-com.png')}
                    alt="image" resizeMode='contain' alignSelf='center' />
            </Box>
        </TouchableOpacity>
    )
}

export default CommonLoginButton

const styles = StyleSheet.create({})
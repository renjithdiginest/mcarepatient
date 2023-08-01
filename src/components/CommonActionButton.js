import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Box, Icon, Pressable } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
const CommonActionButton = ({onPress, children, width, mt, alignSelf, my, height, position,disable}) => {
    return (
        <TouchableOpacity onPress={onPress} disabled={disable} >
            <Box mt={mt} shadow={8} alignSelf={alignSelf} my={my}>
            <Box
                borderRadius={10}
                alignItems={'center'} justifyContent='center' 
                height={height ? height : 45} width={width ? width : 45} 
                bg={{
                    linearGradient: {
                        colors: ['#0E9DAB', '#047AC3'],
                        start: [1, 0],
                        end: [1, 1]
                    }
                }}
            >
                {children}
            </Box>
        </Box>
        </TouchableOpacity>
        
    )
}

export default CommonActionButton

const styles = StyleSheet.create({})
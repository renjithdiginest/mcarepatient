import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { Box, Icon, Pressable } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { background } from 'native-base/lib/typescript/theme/styled-system'
const CommonActionButton = ({onPress, children, width, mt, alignSelf, my, height, bg, mb, disabled}) => {
    return (
        
            <Box mt={mt} shadow={1} alignSelf={alignSelf} onPress={onPress} my={my} mb={mb}>
                <TouchableOpacity onPress={onPress} disabled={disabled}>
                <Box
                    borderRadius={10}
                    alignItems={'center'} justifyContent='center' 
                    height={height ? height : 45} width={width ? width : 45} 
                    bg={ bg ? bg : {
                        linearGradient: {
                            colors: ['#0E9DAB', '#047AC3'],
                            start: [1, 0],
                            end: [1, 1]
                        }
                    }}
                >
                    {children}
                </Box>
                </TouchableOpacity>
            </Box>
    )
}

export default memo(CommonActionButton) 

const styles = StyleSheet.create({})
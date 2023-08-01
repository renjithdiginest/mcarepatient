import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Box, Icon, Pressable } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
const LogoutButton = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Box shadow={5} alignSelf='center' >
                <Box
                    mb={20} mt={10} borderRadius={10}
                    alignItems={'center'} justifyContent='center'
                    height={45} width={45}
                    bg={{
                        linearGradient: {
                            colors: ['#0E9DAB', '#047AC3'],
                            start: [1, 0],
                            end: [1, 1]
                        }
                    }}
                >
                    <Icon as={<Ionicons />} name='power-sharp' color={'#fff'} size={25} />
                </Box>
            </Box>
        </TouchableOpacity>

    )
}

export default LogoutButton

const styles = StyleSheet.create({})
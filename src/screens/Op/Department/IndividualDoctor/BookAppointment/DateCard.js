import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Icon, Pressable, Text } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
const DateCard = ({onPress,  mt, my, item, onChanged, selected }) => {
    return (
        <Pressable mt={mt} shadow={8} onPress={onChanged}  my={my} mr={2}>
            <Box
                borderRadius={10}
                alignItems={'center'} justifyContent='center' 
                height={20} width={60} 
                bg={ selected=== item?.id ? {
                    linearGradient: {
                        colors: ['#0E9DAB', '#047AC3'],
                        start: [1, 0],
                        end: [1, 1]
                    }
                } : 'blue.50' }
            >
                <Box alignItems={'center'} my={2}>
                    <Text color={selected=== item?.id ? '#fff' : '#000'} fontWeight={600} letterSpacing={1} fontSize={18}>{item?.day}</Text>
                    <Text color={selected=== item?.id ? '#fff' : '#000'} fontWeight={600} letterSpacing={1} fontSize={17} >{item?.datee}</Text>
                </Box>
            </Box>
        </Pressable>
    )
}

export default DateCard

const styles = StyleSheet.create({})
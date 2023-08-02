import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, HStack, Icon, Pressable, Text } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
const TimeCard = ({onChanged,  mt, my, item, selectedTime}) => {
    return (
        <Pressable  shadow={2} onPress={onChanged} flex={0.33} my={my} m={1} >
            <Box
                borderRadius={10}
                alignItems={'center'} justifyContent='center' 
                 width={100} 
                 bg={ selectedTime=== item?.time ? {
                    linearGradient: {
                        colors: ['#0E9DAB', '#047AC3'],
                        start: [1, 0],
                        end: [1, 1]
                    }
                } : 'blue.50' }
            >
                <HStack alignItems={'center'}>
                    <Icon color={selectedTime=== item?.time ? '#fff' : '#000'} as={<Ionicons/>} name='alarm' size={4}/>
                    <Text color={selectedTime=== item?.time ? '#fff' : '#000'} fontWeight={600} letterSpacing={1} fontSize={12} my={2} ml={1}>{moment(item?.time, "HH:mm").format("hh:mm A") }</Text>
                </HStack>
            </Box>
        </Pressable>
    )
}

export default TimeCard

const styles = StyleSheet.create({})
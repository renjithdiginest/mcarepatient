import { StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { Box, HStack, Icon, Pressable, Text } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import reactotron from '../../../ReactotronConfig'

const LeaveCard = ({item}) => {

    return (
        <HStack bg='#fff' mt={3} borderRadius={20} py={2} px={4} shadow={1} m={1}>
            <Box alignItems={'center'} justifyContent='center'>
                <Icon as={<Ionicons/>} name='calendar' color='#047CC1' size={45}/>
            </Box>

            <Box ml={3}>
                <HStack alignItems={'center'}>
                    <Text color={'#444444'} fontFamily='body' fontWeight={500}  fontSize={15} >Consultations : </Text>
                    <Text color={'#444444'} fontFamily='body' fontWeight={500}  fontSize={13} >{item?.type.length===3 ? "ALL" : item?.type.join(', ')} </Text>
                </HStack>
                
                <Text color={'#524A4A'} fontFamily='body' fontWeight={400}  fontSize={13} >Date : {item?.leave_days}</Text>
                {item?.status=='approved'&&<HStack  alignItems='center'>
                    <Icon 
                        as={<Ionicons/>} 
                        name='ellipse' 
                        size={2} color='#D8921C'
                    />
                    <Text 
                        color={'#D8921C'} fontWeight={500} fontFamily="body" fontSize={16} ml={2} 
                    >{item?.status}</Text>
                </HStack>}
                {item?.status=='pending'&&<HStack  alignItems='center'>
                    <Icon 
                        as={<Ionicons/>} 
                        name='ellipse' 
                        size={2} color='#D8921C'
                    />
                    <Text 
                        color={'#D8921C'} fontWeight={500} fontFamily="body" fontSize={16} ml={2} 
                    >{item?.status}</Text>
                </HStack>}
                {item?.status === 'Completed' && <HStack  alignItems='center'>
                    <Icon 
                        as={<Ionicons/>} 
                        name='ellipse' 
                        size={2} color='#109F00'
                    />
                    <Text 
                        color={'#109F00'} fontWeight={500} fontFamily="body" fontSize={16} ml={2} 
                    >{item?.status}</Text>
                </HStack>}
                {item?.status === 'Rejected' && <HStack  alignItems='center'>
                    <Icon 
                        as={<Ionicons/>} 
                        name='ellipse' 
                        size={2} color='#FF0000'
                    />
                    <Text 
                        color={'#FF0000'} fontWeight={500} fontFamily="body" fontSize={16} ml={2} 
                    >{item?.status}</Text>
                </HStack>}
            </Box>
        </HStack>
    )
}

export default LeaveCard

const styles = StyleSheet.create({})
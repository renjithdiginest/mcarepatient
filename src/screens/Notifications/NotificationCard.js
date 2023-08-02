import { StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Box, HStack, Icon, Pressable, Text, VStack } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

const NotificationCard = ({item, updateNotificationStatus}) => {

    const [show, setShow] = useState(false)


    return (
        <TouchableOpacity onPress={() => {
            updateNotificationStatus(item?._id)
            setShow(!show)
            }}>
        <HStack bg='#fff' mt={3} borderRadius={20} py={2} px={4} shadow={1} >
            <Box alignItems={'center'} justifyContent='center'>
                <Icon as={<Ionicons/>} name='calendar' color='#047CC1' size={45}/>
            </Box>
            <Box ml={3}>
                <VStack>
                    <Text color={'#444444'} fontFamily='body' fontWeight={700}  fontSize={15} >Consultations : </Text>
                    <Text color={'#444444'} fontFamily='body' fontWeight={500}  fontSize={12} numberOfLines={show ? null : 1} mr={8}>{item?.message}</Text>
                </VStack>
                <Text color={'#524A4A'} fontFamily='body' fontWeight={400}  fontSize={8} >Date : {moment(item.created_at).format("DD-MM-YYYY hh:mm A") }</Text>
                {item?.status === "unread" && <Box h={2} w={2} position="absolute" top={2} right={10} borderRadius={5} bgColor="red.500"></Box>}
            </Box>
        </HStack>
        </TouchableOpacity>
    )
}

export default NotificationCard

const styles = StyleSheet.create({})
import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { memo, useCallback } from 'react'
import { Box, Text, Image, Button, Icon, ScrollView, Pressable, HStack } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SET_ACTIVE_PATIENT } from '../Redux/constants/homeConstants'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import { PDF_URL } from '../config/constants'
import { reactotronRedux } from 'reactotron-redux'
import reactotron from 'reactotron-react-native'



const PatientCard = ({ item, type }) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

   


    const makeActivePatient = useCallback(() => {
        dispatch({
            type: SET_ACTIVE_PATIENT,
            payload: item
        })
        navigation.navigate('PatientBookingDetails', { activePatient: item, type: type })
    }, [item, type])

    return (
        <TouchableOpacity
            onPress={makeActivePatient}
        >
            <Box bg={"white"} borderRadius={30} mb={4}>
                <HStack p={1} >
                    <Image
                        flex={0.35}
                        width={130} height={120} borderRadius={25}
                        source={item?.patient?.image ? { uri: `${PDF_URL}${item?.patient?.image}` } : require('../images/user.jpeg')} alt='img' shadow={5}
                    />
                    <Box ml={3} flex={0.65} justifyContent='space-between' py={1}>
                        <Box>
                            <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={18}>{item?.name}</Text>
                            <Text color={'#444444'} letterSpacing={1} fontSize={14}>Patient ID : {item?.patient?.user_id}</Text>
                        </Box>
                        <Box>
                            <HStack alignItems='center'>
                                <Icon
                                    as={<Ionicons />}
                                    name='calendar'
                                    size={18} color='#047AC3'
                                />
                                <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={15} ml={2}>{moment(`${item?.date} ${item?.time}`, "YYYY-MM-DD HH:mm").format("DD-MM-YYYY hh:mm A")}</Text>
                            </HStack>

                            <HStack alignItems='center'>
                                {item?.status === 'Upcoming' && <Icon
                                    as={<Ionicons />}
                                    name='ellipse'
                                    size={2} color='#0D9BAC'
                                />}
                                {item?.status === 'Scheduled' && <Icon
                                    as={<Ionicons />}
                                    name='ellipse'
                                    size={2} color='#D8921C'
                                />}
                                {item?.status === 'Completed' && <Icon
                                    as={<Ionicons />}
                                    name='ellipse'
                                    size={2} color='#109F00'
                                />}
                                {item?.status === 'cancelled' && <Icon
                                    as={<Ionicons />}
                                    name='ellipse'
                                    size={2} color='#FF0000'
                                />}
                                {item?.status === 'booked' && <Icon
                                    as={<Ionicons />}
                                    name='ellipse'
                                    size={2} color='#109F00'
                                />}
                                {item?.status === 'Pending Review' && <Icon
                                    as={<Ionicons />}
                                    name='ellipse'
                                    size={2} color='#D8921C'
                                />}

                                {item?.status === 'Upcoming' && <Text
                                    color={'#0D9BAC'} fontWeight={600} fontFamily="body" fontSize={16} ml={2}
                                >{item?.status}</Text>}
                                {item?.status === 'Scheduled' && <Text
                                    color={'#D8921C'} fontWeight={600} fontFamily="body" fontSize={16} ml={2}
                                >{item?.status}</Text>}
                                {item?.status === 'Completed' && <Text
                                    color={'#109F00'} fontWeight={600} fontFamily="body" fontSize={16} ml={2}
                                >{item?.status}</Text>}
                                {item?.status === 'cancelled' && <Text
                                    color={'#FF0000'} fontWeight={600} fontFamily="body" fontSize={16} ml={2}
                                >{item?.status}</Text>}
                                {item?.status === 'booked' && <Text
                                    color={'#109F00'} fontWeight={600} fontFamily="body" fontSize={16} ml={2}
                                >{item?.status}</Text>}
                                {item?.status === 'Pending Review' && <Text
                                    color={'#D8921C'} fontWeight={600} fontFamily="body" fontSize={16} ml={2}
                                >{item?.status}</Text>}
                            </HStack>
                        </Box>
                    </Box>
                </HStack>
            </Box>
        </TouchableOpacity>
    )
}

export default memo(PatientCard) 

const styles = StyleSheet.create({})
import { StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { Box, Text, Image, Button, Icon, ScrollView, Pressable, HStack } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SET_ACTIVE_PATIENT } from '../Redux/constants/homeConstants'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import moment from 'moment'



const PatientCard = ({item}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();



    const makeActivePatient = (item) => {
        dispatch({
            type: SET_ACTIVE_PATIENT,
            payload: item
        })
        navigation.navigate('PatientBookingDetails')
    }

    return (
        <Pressable mb={4} 
        onPress={()=>makeActivePatient(item)}
        >
            <Box bg={"white"} borderRadius={30}>
                <HStack p={1} >
                    <Image
                        width={130} height={130} borderRadius={25}
                        source={require('../images/user.jpeg')} alt='img' shadow={5}
                    />
                    <Box ml={3} justifyContent='space-between'py={1}>
                        <Box>
                            <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={19}>{item?.name}</Text>
                            <Text color={'#444444'} letterSpacing={1} fontSize={15}>Patient ID : MA21903</Text>
                        </Box>
                        <Box>
                            <HStack  alignItems='center'>
                                <Icon 
                                    as={<Ionicons/>} 
                                    name='calendar' 
                                    size={18} color='#047AC3'
                                />
                                <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={15} ml={2}>{moment(item?.date, "YYYY-MM-DD").format("DD-MM-YYYY") }</Text>
                            </HStack>
                            
                            <HStack  alignItems='center'>
                                {item?.status === 'Upcoming' && <Icon 
                                    as={<Ionicons/>} 
                                    name='ellipse' 
                                    size={2} color='#0D9BAC'
                                />}
                                {item?.status === 'Scheduled' && <Icon 
                                    as={<Ionicons/>} 
                                    name='ellipse' 
                                    size={2} color='#D8921C'
                                />}
                                {item?.status === 'Completed' && <Icon 
                                    as={<Ionicons/>} 
                                    name='ellipse' 
                                    size={2} color='#109F00'
                                />}
                                {item?.status === 'cancelled' && <Icon 
                                    as={<Ionicons/>} 
                                    name='ellipse' 
                                    size={2} color='#FF0000'
                                />}
                                {item?.status === 'booked' && <Icon 
                                    as={<Ionicons/>} 
                                    name='ellipse' 
                                    size={2} color='#109F00'
                                />}
                                {item?.status === 'Pending Review' && <Icon 
                                    as={<Ionicons/>} 
                                    name='ellipse' 
                                    size={2} color='#D8921C'
                                />}
                                
                                {item?.status === 'Upcoming' && <Text 
                                    color={'#0D9BAC'} fontWeight={600} fontFamily="body" fontSize={16} ml={2} 
                                >{item?.status}</Text>}
                                {item?.status === 'Scheduled' && <Text 
                                    color={'#D8921C'} fontWeight={600} fontFamily="body" fontSize={16} ml={2} 
                                >{item?.status}</Text>}
                                {item?.status ==='Completed' && <Text 
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
        </Pressable>
    )
}

export default memo(PatientCard) 

const styles = StyleSheet.create({})
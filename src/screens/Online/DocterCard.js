import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { memo, useCallback } from 'react'
import { Box, Text, Image, Button, Icon, ScrollView, Pressable, HStack } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import CommonActionButton from '../../components/CommonActionButton';
import reactotron from 'reactotron-react-native';
import moment from 'moment/moment'
import { startCase } from 'lodash'
import { IMG_URL } from '../../config/constants'

const DocterCard = ({ item }) => {

    //reactotron.log({item})

    const navigate = useNavigation()

    const goToBooking = useCallback(() => {
        navigate.navigate('Booking', {
            item: item
        })
    }, [item]);


    return (

        <Box mb={4}>
            <TouchableOpacity
                onPress={goToBooking}
            >
                <Box bg={"white"} borderRadius={30}>
                    <HStack p={1} >
                        <Image
                            flex={.30} height={120} borderRadius={25}
                            source={{ uri: item?.type === "service" ? `${IMG_URL}${item?.department?.[0]?.image}` : item?.type === "procedure" ? `${IMG_URL}${item?.department?.[0]?.image}` : `${IMG_URL}${item?.doctor_details?.image}` }}
                            // source={require('../../images/user.jpeg')} 
                            alt='img' shadow={5}
                        />
                        <Box ml={3} justifyContent='space-evenly' py={1} flex={.70}>
                            <Box>
                                <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={14}>{item?.type === "service" ? item?.service_id.map(ser => startCase(ser?.name)).join(',') : item?.type === "procedure" ? item?.procedure_id.map(ser => startCase(ser?.name)).join(',') : item?.doctor_details?.name}</Text>
                                <Text color={'#444444'} letterSpacing={1} fontSize={12}>{startCase(item?.type === "consultation" ? item?.doctor_details?.designation : item?.department?.[0]?.name)}</Text>
                                <HStack alignItems='center'>
                                    <Icon
                                        as={<Ionicons />}
                                        name='calendar'
                                        size={18} color='#047AC3'
                                    />
                                    <Text color={'#444444'} fontWeight={600} letterSpacing={1} fontSize={13} ml={2}>{moment(`${item?.date} ${item?.time}`, "YYYY-MM-DD HH:mm").format('DD-MM-YYYY hh:mm A')}</Text>
                                </HStack>
                            </Box>
                            <Box>
                                <HStack alignItems={"center"}>
                                    <Box style={{ width: 7, height: 7, borderRadius: 3.5 }} bgColor={item?.status === 'Scheduled' ? '#D8921C' : item?.status === 'booked' ? '#FFA500' : item?.status === 'Completed' ? '#109F00' : '#D8921C'}></Box>
                                    <Text color={item?.status === 'Scheduled' ? '#D8921C' : item?.status === 'booked' ? '#FFA500' : item?.status === 'Completed' ? '#109F00' : '#D8921C'} fontWeight={600} fontFamily="body" fontSize={16} ml={2}>{startCase(item?.status)}</Text>
                                </HStack>
                            </Box>
                        </Box>
                    </HStack>
                </Box>
            </TouchableOpacity>

            {item?.status === 'Completed' && <CommonActionButton width={150} alignSelf='flex-end' mt={-4}>
                <Text color={'#fff'} fontWeight={700} letterSpacing={1} fontSize={19}>{'Book Again'}</Text>
            </CommonActionButton>}
        </Box>
    )
}

export default memo(DocterCard)

const styles = StyleSheet.create({})
import { StyleSheet, useWindowDimensions } from 'react-native'
import React from 'react'
import { Box, Text, Image, Button, Icon, ScrollView, Pressable, HStack } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import { useNavigation } from '@react-navigation/native'
import reactotron from 'reactotron-react-native';
import moment from 'moment/moment'
import CommonActionButton from '../../../components/CommonActionButton'
import { IMG_URL } from '../../../config/constants'
import { startCase } from 'lodash'

const BookServiceCard = ({ item }) => {

    const { width } = useWindowDimensions()
  const navigation = useNavigation()

//    reactotron.log({item})
    return (

        <Box mb={4} pb={2}>
        <Pressable 
            // onPress={()=>navigation.navigate('BookedService', {item : item})}
        >
            <Box bg={"white"} borderRadius={30}>
                <HStack p={1} >
                    <Image
                        width={130} height={130} borderRadius={25}
                        // source={{uri:`${item?.baseurl}${item?.doctor_details?.image}`}} 
                        source={{ uri: `${IMG_URL}${item?.department?.image}` }}
                        // source={require('../../../images/user.jpeg')} 
                        alt='img' shadow={5}
                        flex={0.35}
                    />
                    <Box ml={3} justifyContent='space-between' py={1}  flex={0.65} >
                        <Box>
                            <Text color={'#444444'} fontWeight={700} letterSpacing={1} numberOfLines={2} flexWrap={"wrap"}>{item?.service_id?.map((data) => (startCase(data.name))).join(', ')}</Text>
                            <Text color={'#444444'} letterSpacing={1} fontSize={14}>{item?.department?.name}</Text>
                            
                        </Box>
                        <Box>
                            <HStack alignItems='center'>
                                <Icon
                                    as={<MaterialCommunityIcons />}
                                    name='doctor'
                                    size={18} color='#047AC3'
                                />
                                <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={14} ml={2}>{item?.doctor?.name}</Text>
                            </HStack>
                            <HStack alignItems='center'>
                                <Icon
                                    as={<Ionicons />}
                                    name='calendar'
                                    size={18} color='#047AC3'
                                />
                                <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={14} ml={2}>{moment(item?.created_at).format('DD-MM-YYYY hh:mm A') }</Text>
                            </HStack>

                            <HStack alignItems='center'>
                                {item?.status === 'Scheduled' && <Icon
                                    as={<Ionicons />}
                                    name='ellipse'
                                    size={2} color='#D8921C'
                                />}
                                 {item?.status === 'booked' && <Icon
                                    as={<Ionicons />}
                                    name='ellipse'
                                    size={2} color='#FFA500'
                                />}
                                {item?.status === 'Completed' && <Icon
                                    as={<Ionicons />}
                                    name='ellipse'
                                    size={2} color='#109F00'
                                />}
                                {item?.status === 'Completed' && <Text
                                    color={'#0D9BAC'} fontWeight={600} fontFamily="body" fontSize={16} ml={2}
                                >{item?.status}</Text>}
                                {item?.status === 'booked' && <Text
                                    color={'#FFA500'} fontWeight={600} fontFamily="body" fontSize={16} ml={2}
                                >{item?.status}</Text>}
                                {item?.status === 'Scheduled' && <Text
                                    color={'#D8921C'} fontWeight={600} fontFamily="body" fontSize={16} ml={2}
                                >{item?.status}</Text>}
                                {item?.status === 'Pending' && <Text
                                    color={'#D8921C'} fontWeight={600} fontFamily="body" fontSize={16} ml={2}
                                >{item?.status}</Text>}

                            </HStack>
                        </Box>
                    </Box>
                </HStack>
            </Box>
        </Pressable>

        {<CommonActionButton 
            onPress={()=>navigation.navigate('BookingPayment', {item : item})}
            width={150} alignSelf='flex-end' mt={-6}
        >
            <Text color={'#fff'} fontWeight={700} letterSpacing={1} fontSize={19}>{'Book Now'}</Text>
        </CommonActionButton>}
        </Box>
    )
}

export default BookServiceCard

const styles = StyleSheet.create({})
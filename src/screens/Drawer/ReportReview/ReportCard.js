import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Box, Text, Image, Button, Icon, ScrollView, Pressable, HStack } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import CommonActionButton from '../../../components/CommonActionButton';
import reactotron from 'reactotron-react-native';
import moment from 'moment/moment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const ReportCard = ({ item }) => {
    const navigate = useNavigation()

    reactotron.log({ item })
    return (

        <Box mb={4}>
            <TouchableOpacity
                onPress={() => navigate.navigate('ReportView', {
                    item: item
                })}
            >
                <Box bg={"white"} borderRadius={30}>
                    <HStack p={2} >
                    {/* <Icon as={<MaterialCommunityIcons />} name={"notebook-check"} color='#047AC3' size={20} m={4} /> */}
                        <Image
                            width={70} height={99} 
                           ml={1}
                            source={require('../../../images/report.png')} 
                            alt='img' shadow={5}
                        />
                        <Box ml={3} justifyContent='space-evenly' py={1}>
                            <Box>
                                <Text color={'#444444'} fontWeight={700} letterSpacing={.5} fontSize={18}>{'Report Review'}</Text>
                                <HStack alignItems='center'>
                                    <Image
                                        source={require('../../../images/doctor-svgrepo-com.png')}
                                        height={4}
                                        width={4}
                                        alt='name'
                                    />
                                    <Text color={'#444444'} fontWeight={500} letterSpacing={1} fontSize={14} ml={1}>{item?.doctor_details?.name}</Text>
                                </HStack>
                            </Box>
                            <Box>
                                <HStack alignItems='center'>
                                    <Icon
                                        as={<Ionicons />}
                                        name='calendar'
                                        size={18} color='#047AC3'
                                    />
                                    <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={15} ml={2}>{moment(item?.date, 'YYYY-MM-DD').format('DD-MM-YYYY')}</Text>
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

export default ReportCard

const styles = StyleSheet.create({})
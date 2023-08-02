import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Box, Text, Image, Button, Icon, ScrollView, Pressable, HStack } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import CommonActionButton from '../../../../components/CommonActionButton';
import reactotron from 'reactotron-react-native';
import moment from 'moment/moment'

const DepartmentsDocCards = ({ item }) => {
    const navigate = useNavigation()


    return (
        <>
            <TouchableOpacity onPress={() => navigate.navigate('DoctorDetails', {
                profile: item
            })}>
                <Box mb={4} mt={2}>

                    <Box bg={"white"} borderRadius={30}>
                        <HStack p={1} >
                            <Image
                                flex={.25} height={100} borderRadius={25}
                                source={{ uri: item?.image }}
                                // source={require('../../images/user.jpeg')} 
                                alt='img' shadow={5}
                            />
                            <Box ml={3} justifyContent='space-evenly' py={1} flex={.65}>
                                <Box>
                                    <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={19}>{item?.name}</Text>
                                    <Text color={'#444444'} letterSpacing={1} fontSize={15}>{item?.specialization}</Text>
                                </Box>
                                <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={15}>{item?.qualifications}</Text>
                            </Box>
                        </HStack>
                    </Box>
                    {item?.status === 'Completed' && <CommonActionButton width={150} alignSelf='flex-end' mt={-4}>
                        <Text color={'#fff'} fontWeight={700} letterSpacing={1} fontSize={19}>{'Book Again'}</Text>
                    </CommonActionButton>}
                </Box>
            </TouchableOpacity>
        </>
    )
}

export default DepartmentsDocCards

const styles = StyleSheet.create({})
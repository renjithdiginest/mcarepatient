import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Box, Text, Image, Button, Icon, ScrollView, Pressable, HStack } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import { SET_ACTIVE_DOCTOR } from '../../../Redux/constants/homeConstants';




const DoctorDeptCard = ({ item, onPress }) => {

    const dispatch =useDispatch()


    const navigation = useNavigation();

    const makeActiveDoctor = (item) => {
        
        dispatch({
            type: SET_ACTIVE_DOCTOR,
            payload: item
        })

        navigation.navigate('IndividualDoctor')
       
    }

    return (
        <TouchableOpacity 
            onPress={()=>makeActiveDoctor(item)} 
            
        >
            <Box bg={"white"}  mb={4} borderRadius={30}>
                <HStack p={1} >
                    <Image
                        flex={.30} height={90} borderRadius={25}
                        source={{ uri: item?.image }}
                        alt='img' shadow={5}
                    />
                    <Box ml={3} justifyContent='space-evenly' flex={.70} >
                        <Box>
                            <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={16}>{item?.name}</Text>
                            <Text color={'#444444'} fontWeight={400} letterSpacing={1} fontSize={14} numberOfLines={1} >{item?.specialization}</Text>
                            <Text color={'#444444'} fontWeight={300}  fontSize={15} numberOfLines={1}  >{item?.qualifications}</Text>
                        </Box>
                    </Box>
                </HStack>
            </Box>
        </TouchableOpacity>
    )
}

export default DoctorDeptCard

const styles = StyleSheet.create({})
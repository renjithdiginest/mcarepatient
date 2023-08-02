import { Pressable, StyleSheet, View } from 'react-native'
import React from 'react'
import CommonActionButton from '../../../components/CommonActionButton'
import { Box, Button, HStack, Image, Text, } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import reactotron from '../../../ReactotronConfig'
import CustomButton from '../../../components/CustomButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getProfile } from '../../../Redux/actions/profileActions'
import { LOGIN_SUCCESS } from '../../../Redux/constants/authConstants'

const CurrentPatient = ({ apiResponse }) => {
    const { privateUser, user } = useSelector(state => state.auth);

    const dispatch = useDispatch()

 

    const switchUser = async ()=>{
     
        await AsyncStorage.setItem("user", JSON.stringify(privateUser))
        dispatch({
            type: LOGIN_SUCCESS,
            payload: privateUser
        })
    }

    return (
        <Box mb={4}>
            <Pressable
            >
                <Box bg={"white"} borderRadius={30}>
                    <HStack p={1} >
                        <Image
                            width={130} height={130} borderRadius={25}
                            source={{ uri:privateUser?.image }} alt='img' shadow={5}
                        />
                        <Box ml={3} justifyContent='space-evenly' py={1}>
                            <Box>
                                <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={19}>{privateUser?.name}</Text>
                                <Text color={'#444444'} letterSpacing={1} fontSize={15}>Patient ID:{privateUser?.user_id}</Text>
                            </Box>

                        </Box>
                    </HStack>
                </Box>
            </Pressable>
            {(privateUser?._id !== user?._id) && 
            <Box position={'absolute'} bottom={-12} right={0} >
                <Button onPress={switchUser} borderRadius={10}   size={'lg'} fontWeight={'bold'}>{'Switch User'}</Button>
            </Box>}
        </Box>
    )
}

export default CurrentPatient

const styles = StyleSheet.create({})
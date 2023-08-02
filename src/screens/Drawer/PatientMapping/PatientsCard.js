import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Text, Image, Button, Icon, ScrollView, Pressable, HStack } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import CommonActionButton from '../../../components/CommonActionButton';
import reactotron from 'reactotron-react-native';
import moment from 'moment/moment'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from '../../../Redux/actions/profileActions'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PatientsCard = ({item}) => {
const dispatch = useDispatch()

const { privateUser, user } = useSelector(state => state.auth);

reactotron.log({item})


  

  const switchUser = async ()=>{
    dispatch(getProfile(item?.profile_details?._id))
  }
    return (



        <Box mb={4}>
            <Pressable

            >
                <Box bg={"white"} borderRadius={30}>
                    <HStack p={1} >
                        <Image
                            width={130} height={130} borderRadius={25}
                            source={{uri:`${item?.basepath}${item?.image}`}} alt='img' shadow={5}
                        />
                        <Box ml={3} justifyContent='space-evenly' py={1}>
                            <Box>
                                <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={19}>{item?.profile_details?.name}</Text>
                                <Text color={'#444444'} letterSpacing={1} fontSize={15}>Patient ID:{item?.profile_details?.user_id}</Text>
                            </Box>
                        </Box>
                    </HStack>
                </Box>
            </Pressable>
            {(user?._id !== item?.profile_details?._id) && <Box position={'absolute'} bottom={-12} right={0} >
                <Button borderRadius={10}   size={'lg'} fontWeight={'bold'} onPress={()=>switchUser('active')} >{'Switch User'}</Button>
            </Box>}
        </Box>
    )
}

export default PatientsCard

const styles = StyleSheet.create({})
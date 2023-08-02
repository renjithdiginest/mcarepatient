import React,{useState, useEffect} from 'react'
import { ImageBackground, StyleSheet,useWindowDimensions } from "react-native";
import { Box, Text, Image, ScrollView, Icon, FlatList, Pressable, HStack, VStack } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { IMG_URL } from '../../config/constants';
import moment from 'moment';



const UpcomingConsultCard = ({item}) => {

    const { width, height } = useWindowDimensions()

    return (
        <Pressable mt={2} px={5}>
        <Box bg={"white"} borderRadius={30}>
            <HStack p={1} >
                <Image
                    source={{ uri: `${IMG_URL}${item?.doctor_details?.image}` }}
                    width={100} height={100} borderRadius={25}
                    // source={require('../../images/user.jpeg')} 
                    alt='img' shadow={5}
                />
                <Box ml={3} justifyContent='space-between'py={1}>
                    <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={19}>{item?.doctor_details?.name}</Text>
                    <Text color={'#444444'} letterSpacing={1} fontSize={15}>{item?.doctor_details?.expertise}</Text>
                    <HStack alignItems={'center'} bg='blue.100' justifyContent={'space-between'} borderRadius={8} px={2} py={0.5}>
                        <Icon as={<Ionicons/>} name='alarm' size={5} color='#067FC0'/>
                        <Text color={'#067FC0'} fontWeight={600} fontSize={12}>{moment(`${item?.date} ${item?.time}`, "YYYY-MM-DD HH:mm").format("DD-MM-YYYY hh:mm A") }</Text>
                    </HStack>
                </Box>
            </HStack>
        </Box>
    </Pressable>
  )
}

export default UpcomingConsultCard

const styles = StyleSheet.create({})
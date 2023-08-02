import React, { useState, useEffect } from 'react'
import { ImageBackground, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { Box, Text, Image, ScrollView, Icon, FlatList, Pressable, HStack, VStack } from 'native-base'

import { useNavigation } from '@react-navigation/native'

import { useDispatch, useSelector } from 'react-redux'
import reactotron from 'reactotron-react-native';
import { IMG_URL } from '../../../config/constants';



const DepartmentsCards = ({ item }) => {

    const dispatch = useDispatch()
    const { privateUser, baseImageUrl, loading } = useSelector(state => state.auth);


    const navigation = useNavigation();


    return (
        <>
           
            <Box
                mb={5} alignItems='center' flex={0.25} height={'32%'} >
                <TouchableOpacity  onPress={() => navigation.navigate('DepartmentReport', {
                    dataitem: item
                })}>
                <Image source={{ uri: `${IMG_URL}${item?.image}` }} h={60} w={60} alt='name' borderRadius={15} />
               
                </TouchableOpacity>    
                <Text textAlign='center' fontWeight={600} fontSize={12} letterSpacing={.2} mt={0.5}>{item.name}</Text>
               
            </Box>
        </>

    )
}

export default DepartmentsCards

const styles = StyleSheet.create({})
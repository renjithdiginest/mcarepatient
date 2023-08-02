import React,{useState, useEffect, memo, useCallback} from 'react'
import { ImageBackground, StyleSheet,useWindowDimensions } from "react-native";
import { Box, Text, Image, ScrollView, Icon, FlatList, Pressable, HStack, VStack } from 'native-base'
import { IMG_URL } from '../../config/constants';
import { useNavigation } from '@react-navigation/native'
import { DOCTOR_LIST_BASED_DEPT_SUCCESS, SET_ACTIVE_DEPT, SET_ACTIVE_DOCTOR } from '../../Redux/constants/homeConstants';
import { useDispatch, useSelector } from 'react-redux'



const DepartmentsCard = ({item}) => {

    const dispatch =useDispatch()


    const navigation = useNavigation();

    const makeActiveDept = useCallback(() => {
        dispatch({
            type: DOCTOR_LIST_BASED_DEPT_SUCCESS,
            payload: null
        })
        
        dispatch({
            type: SET_ACTIVE_DEPT,
            payload: item
        })

        navigation.navigate('Department')
       
    }, [item])

    return (
        <Pressable 
            onPress={makeActiveDept} 
            // onPress={()=>navigation.navigate('Department')}
            mb={2} alignItems='center' flex={0.25} height={'40%'} 
        >
            <Image source={{ uri: `${IMG_URL}${item?.image}`}}  h={50} w={50} alt='name' borderRadius={15}/>
            <Text textAlign='center' fontWeight={600} fontSize={11} mt={0.5}>{item.name}</Text>
        </Pressable>
    )
}

export default memo(DepartmentsCard) 

const styles = StyleSheet.create({})
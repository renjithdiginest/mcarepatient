import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomBackground from '../../../../components/CustomBackground'
import CommonHeading from '../../../../components/CommonHeading'
import { Box, FlatList, HStack, Image, Pressable, Text, useToast } from 'native-base'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CustomInputIcon from '../../../../components/CustomInputIcon'
import DepartmentsDocCards from './DepartmentDocCard'
import reactotron from 'reactotron-react-native'
import { IMG_URL } from '../../../../config/constants';
import { LOADING } from '../../../../Redux/constants/authConstants'
import { useDispatch } from 'react-redux'
import customAxios from '../../../../CustomeAxios'

const DepartmentReport = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const toast = useToast()
    const { dataitem } = route.params;
    const [dataRes, setDataRes] = useState([])
    const [data, setData] = useState([])
    const [search, setsearch] = useState([])


    const schema = yup.object({

    }).required();



    const { control, handleSubmit, formState: { errors }, setValue } = useForm({

        resolver: yupResolver(schema)

    });

    const { height } = useWindowDimensions()


    const getDoctorlistBasedDept = async () => {
        dispatch({
            type: LOADING,
            payload: true
        })

        await customAxios.get(`patient/department/doctor/list/${dataitem?._id}`)
            .then(async response => {
                let data = response?.data?.data;

                dispatch({
                    type: LOADING,
                    payload: false
                })
                setDataRes(data)
                setData(data)

            }).catch(async error => {

                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
    }



    const filterResults = (value) => {
        let datas = data?.filter(con => con?.name?.toLowerCase().includes(value.toLowerCase()))
        setDataRes(datas)
    }

    useEffect(() => {
        getDoctorlistBasedDept()
    }, [])


    const renderItems = ({ item }) => {
        return (
            <DepartmentsDocCards
                item={item}
            />
        )
    }

    return (
        <CustomBackground>
            <Box px={5} mt={3}>
                <Pressable
                    alignItems={'center'} justifyContent='center' borderRadius={8} bg='#fff' width={10} height={10} mr={2} shadow={1} position={'absolute'} left={5} zIndex={5} onPress={() => navigation.goBack()}>
                    <Image source={require('../../../../images/left.png')} alt='img' mr={1} />
                </Pressable>
                <Box alignItems={'center'}>
                    <Image source={{ uri: `${IMG_URL}${dataitem?.image}` }} h={100} w={100} alt='name' borderRadius={15} />
                    <Text textAlign='center' fontWeight={700} fontSize={18} mt={0.5}>{dataitem?.name}</Text>
                </Box>
            </Box>
            <Box px={7}>
                <CustomInputIcon
                    width={'100%'}
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    placeholder='Search...'
                    icon={'search'}
                    onChangeText={(value) => filterResults(value)}
                />


                <FlatList
                    data={dataRes}
                    keyExtractor={(item) => item?._id}
                    renderItem={renderItems}
                    showsVerticalScrollIndicator={false}
                    py={5}
                    height={"60%"}
                />

            </Box>
        </CustomBackground>
    )
}

export default DepartmentReport

const styles = StyleSheet.create({})
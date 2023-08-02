import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React, { useState, useEffect } from 'react'

import { Box, FlatList, HStack, Icon, useToast } from 'native-base'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import ReportCard from './ReportCard'
import CustomBackground from '../../../components/CustomBackground';
import CommonHeading from '../../../components/CommonHeading';
import CustomInputIcon from '../../../components/CustomInputIcon';
import CustomButton from '../../../components/CustomButton';
import DateFilter from '../../../components/DateFilter';
import { useDispatch, useSelector } from 'react-redux';
import customAxios from '../../../CustomeAxios';
import { LOADING } from '../../../Redux/constants/authConstants';
import reactotron from 'reactotron-react-native';
import { useFocusEffect } from '@react-navigation/native';
const ReportReview = ({ navigation }) => {
    const { loading, user } = useSelector(state => state.auth);

    const dispatch = useDispatch()
    const toast = useToast()
    const schema = yup.object({

    }).required();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [open, setOpen] = useState(false)
    const [res, setRes] = useState([])
    const [searchRes, setSearchRes] = useState([])
    const { height } = useWindowDimensions()


    const getReports = async () => {
        dispatch({
            type: LOADING,
            payload: true
        })

        await customAxios.get(`patient/consultation/report/list/${user?._id}`)
            .then(async response => {
                let data = response?.data?.data;
                dispatch({
                    type: LOADING,
                    payload: false
                })
                setRes(data)
                setSearchRes(data)

            }).catch(async error => {

                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
    }


    const filterWithDate = async () => {
        dispatch({
            type: LOADING,
            payload: true
        })
        let datas = {
            from_date: startDate,
            to_date: endDate,
            patient_id: user?._id
        }
        await customAxios.post(`patient/consultation/report/filter`, datas)
            .then(async response => {
                setRes(response?.data?.data)
                dispatch({
                    type: LOADING,
                    payload: false
                })
                setOpen(false)
            })
            .catch(async error => {
                toast.show({
                    title: "Error",
                    description: error,
                    backgroundColor: "error.500"
                })
                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
    }





    const filterResults = (value) => {
        let datas = searchRes?.filter(con => con?.doctor_details?.name?.toLowerCase().includes(value.toLowerCase()))
        setRes(datas)
    }


    useFocusEffect(
        React.useCallback(() => {
            getReports()
        }, [])
      );


    const renderItems = ({ item }) => {
        return (
            <ReportCard
                item={item}
            />
        )
    }


    return (
        <CustomBackground>
            <Box px={5} mt={5} >
                <CommonHeading label={'Report Review'} />
                <HStack alignItems={'center'} px={2} py={2} justifyContent={'space-between'}>
                    <CustomInputIcon
                        width={240}
                        control={control}
                        error={errors.name}
                        fieldName="name"
                        placeholder='Search...'
                        icon={'search'}
                    onChangeText={(value) => filterResults(value)}
                    />
                    <Pressable onPress={() => setOpen(!open)}>
                        <Box
                            alignItems={'center'} justifyContent='center'
                            borderRadius={10}
                            bgColor={{
                                linearGradient: {
                                    colors: ['#0E9DAB', '#047AC3'],
                                    start: [1, 0],
                                    end: [1, 1]
                                }
                            }}
                        >
                            <Icon as={<Ionicons />} name={"ios-filter"} color={'#ffff'} size={5} m={4} />
                        </Box>
                    </Pressable>
                </HStack>
            </Box>
            <Box mb={20}>
                {open && <DateFilter
                    onChange={({ startDate, endDate }) => {
                        setStartDate(startDate)
                        setEndDate(endDate)
                    }}
                    onPress={filterWithDate}
                    onCancel={() => setOpen(false)}
                />}
                {!open &&
                    <FlatList
                        data={res}
                        keyExtractor={(item) => item?._id}
                        renderItem={renderItems}
                        showsVerticalScrollIndicator={false}
                        pt={2}
                        px={7}
                        mb={'30%'}
                        refreshing={loading}
                        onRefresh={getReports}
                    />}
            </Box>
            <Box position="absolute" bottom={2} left={"30%"}>
                <CustomButton selected={true} label={'Submit Report'} wid={150} onPress={() => navigation.navigate('DepartmentList')} />
            </Box>
        </CustomBackground>
    )
}

export default ReportReview

const styles = StyleSheet.create({})
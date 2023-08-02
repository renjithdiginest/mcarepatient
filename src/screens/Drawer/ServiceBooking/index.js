import React, { useState, useEffect } from 'react'
import { StyleSheet, useWindowDimensions } from "react-native";
import { Box, Icon, HStack, FlatList, useToast } from 'native-base'
import axios from '../../../CustomeAxios'
import CommonHeading from '../../../components/CommonHeading';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Ionicons from 'react-native-vector-icons/Ionicons'
import CustomInputIcon from '../../../components/CustomInputIcon';
import { useDispatch, useSelector } from 'react-redux';
import reactotron from 'reactotron-react-native';
import CustomBackground from '../../../components/CustomBackground';
import CommonActionButton from '../../../components/CommonActionButton';
import { LOADING } from '../../../Redux/constants/authConstants';
import BookServiceCard from './BookServiceCard';
import DateFilter from '../../../components/DateFilter';
import { useFocusEffect } from '@react-navigation/native';

const ServiceBooking = () => {

    const dispatch = useDispatch()

    const { width, height } = useWindowDimensions()

    const toast = useToast()

    const { user, loading } = useSelector(state => state.auth);

    const [dataFilter, setDataFilter] = useState(null)


    const [servicelist, setServicelist] = useState(null)

    // reactotron.log({servicelist})

    const [open, setOpen] = useState('')
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const schema = yup.object({

    }).required();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    const filterResults = (value) => {
        let datas = servicelist?.filter(con => con?.department?.name?.toLowerCase().includes(value.toLowerCase()) || con?.doctor?.name?.toLowerCase().includes(value.toLowerCase()) || con?.service_id?.find(ser => ser.name?.toLowerCase().includes(value.toLowerCase())))
        setDataFilter(datas)
    }

    useEffect(() => {
        {
            if (servicelist) {
                setDataFilter(servicelist)
            }
        }
    }, [servicelist])

    useFocusEffect(
        React.useCallback(() => {
            getServiceReflist(user?._id)
        }, [])
    );



    //service referal list
    const getServiceReflist = async (id) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await axios.get(`patient/service/referral/list/${id}`)
            .then(async response => {
                let data = response?.data?.data
                if (data.length === 0) {
                    setServicelist([])
                    toast.show({
                        // title: "Error",
                        description: "No Services",
                        backgroundColor: "error.500"
                    })
                } else {
                    setServicelist(data)
                }
                dispatch({
                    type: LOADING,
                    payload: false
                })
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


    const renderItems = ({ item }) => {
        return (
            <BookServiceCard
                item={item}
            />
        )
    }

    const filterWithDate = () => {
        setOpen(false)
        filter()
    }



    const filter = async () => {
        dispatch({
            type: LOADING,
            payload: true
        })

        let datas = {
            from_date: startDate,
            to_date: endDate,
            patient_id: user?._id
        }

        await axios.post(`patient/service/referral/filter`, datas)
            .then(async response => {

                let data = response?.data?.data

                setServicelist(data)

                dispatch({
                    type: LOADING,
                    payload: false
                })
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







    return (

        <CustomBackground>
            <Box px={5} mt={5} >
                <CommonHeading label={'Book Service'} />
                <HStack alignItems={'center'} px={2} justifyContent={'space-between'} mt={2}>
                    <CustomInputIcon
                        width={width-120}
                        control={control}
                        error={errors.name}
                        fieldName="name"
                        placeholder='Search...'
                        icon={'search'}
                        onChangeText={(value) => filterResults(value)}
                    />


                    <CommonActionButton width={51} height={51} onPress={() => setOpen(true)}>
                        <Icon as={<Ionicons />} name={"ios-filter"} color={'#ffff'} size={5} />
                    </CommonActionButton>
                </HStack>


                {open && <DateFilter
                    onChange={({ startDate, endDate }) => {
                        setStartDate(startDate)
                        setEndDate(endDate)
                    }}
                    onPress={filterWithDate}
                    onCancel={() => setOpen(false)}
                />}

                <Box height={"78%"}>
                    <FlatList
                        data={dataFilter}
                        keyExtractor={(item) => item?._id}
                        renderItem={renderItems}
                        showsVerticalScrollIndicator={false}
                        pt={2}
                    />
                </Box>
            </Box>

        </CustomBackground>

    )
}

export default ServiceBooking

const styles = StyleSheet.create({


})
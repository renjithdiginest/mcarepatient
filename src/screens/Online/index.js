import React, { useState, useEffect } from 'react'
import { ImageBackground, StyleSheet, useWindowDimensions } from "react-native";
import { Box, Text, Image, Button, Icon, ScrollView, Pressable, HStack, FlatList, useToast } from 'native-base'
import CustomBackground from '../../components/CustomBackground';
import CommonHeading from '../../components/CommonHeading';
import CustomInput from '../../components/CustomInput'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Ionicons from 'react-native-vector-icons/Ionicons'
import DocterCard from './DocterCard';
import CustomInputIcon from '../../components/CustomInputIcon';
import { useDispatch, useSelector } from 'react-redux';
import { getConsultationList } from '../../Redux/actions/consultationActions';
import reactotron from 'reactotron-react-native';
import DateFilter from '../../components/DateFilter';
import { LOADING } from '../../Redux/constants/authConstants';
import customAxios from '../../CustomeAxios';
import { getUpcomingAppointment } from '../../Redux/actions/homeActions';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
import { GET_ALL_CONSULTATION_LIST_SUCCESS } from '../../Redux/constants/consultationConstants';

const Online = () => {

    const dispatch = useDispatch()
    const toast = useToast()

    const [open, setOpen] = useState(false)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [datas, setDatas] = useState(null)
    const { width, height } = useWindowDimensions()

    const { user, loading } = useSelector(state => state.auth);
    const { consultationList } = useSelector(state => state.consultation);








    const schema = yup.object({


    }).required();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });




    const filterWithDate = async () => {
        dispatch({
            type: LOADING,
            payload: true
        })
        let datas = {
            from: startDate,
            to: endDate,
            patient_id: user?._id
        }
        await customAxios.post(`patient/upcomingfilter`, datas)
            .then(async response => {
                let data = response?.data?.data
                dispatch({
                    type: GET_ALL_CONSULTATION_LIST_SUCCESS,
                    payload: data
                })
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
        let services = consultationList?.service?.map(ser => {
            return{
                ...ser,
                type: 'service',
                servicename: ser?.service_id?.map(se => se.name).join(',')
            }
        })

        let procedures = consultationList?.procedure?.map(ser => {
            return {
                ...ser,
                type: 'procedure',
                servicename: ser?.procedure_id?.map(se => se.name).join(',')
            }
        })

        let consultations = consultationList?.consultation?.map(ser => {
            return {
                ...ser,
                type: 'consultation'
            }
        })

        reactotron.log({services, procedures, consultations})

        let filterServ = services?.filter(ser => ser?.servicename.toLowerCase().includes(value?.toLowerCase()) || ser?.payment_status?.toLowerCase().includes(value.toLowerCase()) || ser?.doctor?.[0]?.name.toLowerCase().includes(value?.toLowerCase()) || ser?.doctor?.[0]?.designation.toLowerCase().includes(value?.toLowerCase()) || ser?.doctor?.[0]?.specialization.toLowerCase().includes(value?.toLowerCase()) || ser?.department?.[0]?.name.toLowerCase().includes(value?.toLowerCase()) || moment(ser?.date, "YYYY-MM-DD").format("DD-MM-YYYY").includes(value))

        let filterProcedure = procedures?.filter(ser => ser?.servicename.toLowerCase().includes(value?.toLowerCase()) || ser?.payment_status?.toLowerCase().includes(value.toLowerCase()) || ser?.doctor?.[0]?.name.toLowerCase().includes(value?.toLowerCase()) || ser?.doctor?.[0]?.designation.toLowerCase().includes(value?.toLowerCase()) || ser?.doctor?.[0]?.specialization.toLowerCase().includes(value?.toLowerCase()) || ser?.department?.[0]?.name.toLowerCase().includes(value?.toLowerCase()) || moment(ser?.date, "YYYY-MM-DD").format("DD-MM-YYYY").includes(value))

        let filterConsultations = consultations?.filter(ser => ser?.appointmenttype.toLowerCase().includes(value?.toLowerCase()) || ser?.payment_status?.toLowerCase().includes(value.toLowerCase()) || ser?.doctor_details?.name.toLowerCase().includes(value?.toLowerCase()) || ser?.doctor_details?.designation.toLowerCase().includes(value?.toLowerCase()) || ser?.doctor_details?.specialization.toLowerCase().includes(value?.toLowerCase()) || ser?.department_details?.name.toLowerCase().includes(value?.toLowerCase()) || moment(ser?.date, "YYYY-MM-DD").format("DD-MM-YYYY").includes(value))

        setDatas([...filterServ, ...filterProcedure, ...filterConsultations])
    }

    useEffect(() => {
            if (consultationList) {
                let services = consultationList?.service?.map(ser => {
                    return {
                        ...ser,
                        type: 'service'
                    }
                })

                let procedures = consultationList?.procedure?.map(ser => {
                    return {
                        ...ser,
                        type: 'procedure'
                    }
                })

                let consultations = consultationList?.consultation?.map(ser => {
                    return {
                        ...ser,
                        type: 'consultation'
                    }
                })

                setDatas([...services, ...procedures, ...consultations])
            }
    }, [consultationList])


    

    useFocusEffect(
        React.useCallback(() => {
            getconsultationList()
        }, [])
    );

    const getconsultationList = () => {
        dispatch(getUpcomingAppointment(user?._id))
    }


    const renderItems = ({ item }) => {
        return (
            <DocterCard
                item={item}
            />
        )
    }

    return (

        <CustomBackground>
            <Box px={5} mt={5} >
                <CommonHeading label={'My Consultations'} />
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
                    <Pressable onPress={() => setOpen(true)}>
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
                            <Icon as={<Ionicons />} name={"filter"} color={'#ffff'} size={5} m={4} />
                        </Box>
                    </Pressable>
                </HStack>
                {open && <DateFilter
                    onChange={({ startDate, endDate }) => {
                        setStartDate(startDate)
                        setEndDate(endDate)
                    }}
                    onPress={filterWithDate}
                    onCancel={() => setOpen(false)}
                />}
                <Box >
                    {!open &&
                        <FlatList
                            px={2}
                            data={datas}
                            keyExtractor={(item) => item._id}
                            renderItem={renderItems}
                            showsVerticalScrollIndicator={false}
                            pt={2}
                            // refreshing={loading}
                            // onRefresh={getConsultationList}
                            height={'80%'}
                        />}
                </Box>
            </Box>
        </CustomBackground>

    )
}

export default Online

const styles = StyleSheet.create({


})
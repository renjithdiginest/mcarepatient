import React, { useState } from 'react'
import { ImageBackground, StyleSheet, useWindowDimensions } from "react-native";
import { Box, Text, Image, Button, FlatList, ScrollView, useToast, HStack } from 'native-base'
import DatePicker from 'react-native-date-picker'
import CustomBackground from '../../../../../components/CustomBackground';
import CommonHeading from '../../../../../components/CommonHeading';
import { navigationRef } from '../../../../../Navigations/RootNavigation';
import CommonSelectInput from '../../../../../components/CommonSelectInput'
import moment from 'moment'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CommonActionButton from '../../../../../components/CommonActionButton';
import DateCard from './DateCard';
import TimeCard from './TimeCard';
import reactotron from '../../../../../ReactotronConfig';
import { useDispatch, useSelector } from 'react-redux'
import CustomInputIcon from '../../../../../components/CustomInputIcon';
import { consultBookingAvailibility } from '../../../../../Redux/actions/consultationActions';
import { SET_DATE_TIME_TYPE } from '../../../../../Redux/constants/homeConstants';
import { LOADING } from '../../../../../Redux/constants/authConstants';
import customAxios from '../../../../../CustomeAxios';


const BookAppointment = ({ navigation }) => {

    const dispatch = useDispatch()

    const toast = useToast()

    const [selected, setSelected] = useState('')

    const [selectedTime, setSelectedTime] = useState('')

    const [open, setOpen] = useState(false)

    const [date, setDate] = useState(new Date())

    const [selectedDate, setSelectedDate] = useState(new Date())

    // reactotron.log({selectedDate})

    const [currentTab, setCurrentTab] = useState(0)
    const [showStatus, setShowStatus] = useState("")

    // reactotron.log({showStatus})

    const { width, height } = useWindowDimensions()

    const schema = yup.object({
        consultation_summary: yup.string().required('Required'),
        status: yup.string().required('Required'),
    }).required();

    const { control, handleSubmit, formState: { errors }, setValue, setError } = useForm({
        resolver: yupResolver(schema)
    });

    const [AvailibiltyTimeList, setAvailibiltyTimeList] = useState(null)

    const { activeDoctor } = useSelector(state => state.home);


    reactotron.log({AvailibiltyTimeList})




    AppointType = [
        {
            _id: '1',
            Name: 'Op'
        },
        {
            _id: '2',
            Name: 'Online'
        },
        {
            _id: '3',
            Name: 'Report'
        },
    ]


    const renderItems = ({ item }) => {
        return (
            <DateCard
                selected={selected}
                onChanged={() => setSelected(item?.id)}
                item={item}
            />
        )
    }

    const renderTime = ({ item }) => {
        return (
            <TimeCard
                selectedTime={selectedTime}
                onChanged={() => setSelectedTime(item?.time)}
                item={item}
            />
        )
    }

    const onChangeDate = async(result) => {

        if (date) {
            setSelectedDate(result)
            let value = {
                doctor_id: activeDoctor?._id,
                date: moment(result).format('YYYY-MM-DD'),
                type: showStatus
            }
            dispatch({
                type: LOADING,
                payload: true
            })
            await customAxios.post(`patient/consultation/doctor/availability`,value)
            .then(async response => {
                let datas = response?.data?.data
                setAvailibiltyTimeList(datas)
                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
            .catch(async error => {
                setAvailibiltyTimeList([])
                if (!toast.isActive("error")) {
                    toast.show({
                        id: "error",
                        title: 'Error',
                        description: error,
                        backgroundColor: 'error.500'
                    })
                  }
                
                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
        }
    }



    const setDateTimeType = () => {

        if (selectedTime) {

            let bookingDatas = {
                appointmentType: showStatus,
                date: selectedDate,
                time: selectedTime,
            }

            dispatch({
                type: SET_DATE_TIME_TYPE,
                payload: bookingDatas
            })

            navigation.navigate('AppointmentPay')

        } else {
            toast.show({
                title: "Select Time",
                background: 'error.500'
            })
        }
    }

    return (

        <CustomBackground>
            <Box px={5} mt={5} >
                <CommonHeading label={'Book Appointment'} goBack={() => navigation.goBack()} />
            </Box>
            <Box borderTopRadius={30} bg='#fff' mt={5} flex={1} px={5}>



                    <FlatList
                        data={AvailibiltyTimeList?.time?.filter(ti => ti.patient_id === null)}
                        keyExtractor={(item) => item.time}
                        renderItem={renderTime}
                        numColumns={3}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={() => <>
                            <HStack alignItems={'center'} borderBottomColor='#0000000D' borderBottomWidth={1} pb={5} mt={2}>
                                <Image
                                   flex={.30}
                                    width={90} height={90} borderRadius={25}
                                    source={{ uri: activeDoctor?.image }} alt='img' shadow={5}
                                />
                                <Box ml={3} justifyContent='space-evenly' flex={.70}>
                                    <Box>
                                        <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={19}>{activeDoctor?.name}</Text>
                                        <Text color={'#444444'} fontWeight={400} letterSpacing={1} fontSize={14} >{activeDoctor?.designation}</Text>
                                    </Box>
                                    <Text color={'#444444'} fontWeight={400} letterSpacing={1} fontSize={15} mt={2}>{activeDoctor?.qualifications}</Text>
                                </Box>
                            </HStack>

                            <CommonSelectInput
                                control={control}
                                error={errors.status}
                                fieldName="status"

                                label={'Appointment Type'}
                                mt={4}
                                selectedValue={showStatus}
                                changeValue={(value) => {
                                    setShowStatus(value)
                                    setValue('status', value)
                                    setError('status', '')
                                }}
                                optlabel={"Name"}
                                optValue={"Name"}
                                options={AppointType}
                            />


                            <CustomInputIcon
                                control={control}
                                error={errors.dateTime}
                                fieldName="dateTime"
                                placeholder='dd/mm/yyyy'
                                material={'date-range'}
                                onpress={() => setOpen(true)}
                                bgColor='#E6F4F7'
                            />

                            {open && <DatePicker
                                modal
                                open={open}
                                date={date}
                                mode={'date'}
                                
                                onConfirm={(date) => {
                                    setValue('dateTime', moment(date).format('DD-MM-YYYY'))
                                    setOpen(false)
                                    onChangeDate(date)
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />}

                            {AvailibiltyTimeList && <Text
                                color={'#444444'} fontWeight={600} fontFamily="body" fontSize={18} my={4}
                            >Time</Text>}
                        </>}
                        ListFooterComponent={() => <CommonActionButton
                            onPress={setDateTimeType}
                            bg={selectedTime ? {
                                linearGradient: {
                                    colors: ['#0E9DAB', '#047AC3'],
                                    start: [1, 0],
                                    end: [1, 1]
                                }
                            } : 'gray.200'}
    
                            // onPress={()=>navigation.navigate('AppointmentPay')}
    
                            width={100} mt={10} alignSelf='center'
                        >
                            <Text
                                color={'#fff'} fontWeight={600} fontFamily="body" fontSize={18}
                            >Next</Text>
    
                        </CommonActionButton>}
                    />

            </Box>


        </CustomBackground>

    )
}

export default BookAppointment

const styles = StyleSheet.create({

    image: {
        flex: 1,

    },
})
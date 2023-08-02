import { StyleSheet, useWindowDimensions, View, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomBackground from '../../components/CustomBackground'
import CommonHeading from '../../components/CommonHeading'
import { Box, HStack, Image, ScrollView, Text, useToast, } from 'native-base'
import user from '../../images/user.jpeg'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CommonInput from '../../components/CommonInput'
import CustomButton from '../../components/CustomButton'
import RescheduleModal from './RescheduleModal'
import reactotron from 'reactotron-react-native'
import { useDispatch, useSelector } from 'react-redux'
import { LOADING, RESET_ERROR } from '../../Redux/constants/authConstants'
import { navigate } from '../../Navigations/RootNavigation'
import { useNavigation } from '@react-navigation/native'
import { CONSULTATION_DOC_AVAILBILITY_SUCCESS } from '../../Redux/constants/consultationConstants'
import moment from 'moment'
import { IMG_URL } from '../../config/constants'
import { startCase } from 'lodash'
import customAxios from '../../CustomeAxios'
import {
    checkMultiple,
    requestMultiple,
    openSettings,
    PERMISSIONS,
    RESULTS,
    Permission,
    PermissionStatus,
} from 'react-native-permissions';


// TODO: Enable photo library permission when sharing view is done.
const platformPermissions = {
    ios: [
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.MICROPHONE,
      //PERMISSIONS.IOS.PHOTO_LIBRARY,
    ],
    android: [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      PERMISSIONS.ANDROID.READ_PHONE_STATE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ],
};


const Booking = ({ navigation, route }) => {
    const { height } = useWindowDimensions()
    const { item } = route.params;



    reactotron.log({item})
    const toast = useToast()
   
    const dispatch = useDispatch()
    const { consultationResheduled, error } = useSelector(state => state.consultation);
    const { user, loading } = useSelector(state => state.auth);


    const [showModal, setShowModal] = useState(false);

    reactotron.log({item})

    const schema = yup.object({


    }).required();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({

        resolver: yupResolver(schema)
    });

    useEffect(() => {
        setValue('dateTime', moment(`${item?.date} ${item?.time}`, "YYYY-MM-DD HH:mm").format("DD-MM-YYYY hh:mm A"))
        //setValue('consultationFee', item?.type === 'consultation' ? item?.amount_payable : item?.amount)
        setValue('appointmentType', item?.appointmenttype)
        setValue('paymentStatus', item?.payment_status)
        setValue('appointmentStatus', item?.status)
    }, [])

    useEffect(() => {
        if (consultationResheduled) {
            dispatch({
                type: RESET_ERROR
            })
            setShowModal(false)
            toast.show({
                title: `Success`,
                description: "Your booking has been rescheduled successfully",
                background: 'success.500'
            })
            navigation.navigate('Online')
        }
        if (error) {
            dispatch({
                type: RESET_ERROR
            })
            toast.show({
                title: 'Error',
                description: `${error?.message}`,
                background: 'error.500'
            })
        }
    }, [consultationResheduled, error])


    const rescheduleBooking = async(datas) => {
        let url=""
        let data = {}
        if(item?.type === "service"){
            url="patient/service/bookings/schedule";
            data = {
                date: datas?.date,
                id: datas?.item?._id,
                time: datas?.time
            }
        }
        else if(item?.type === "procedure"){
            url="patient/procedure/bookings/schedule";
            data = {
                date: datas?.date,
                id: datas?.item?._id,
                time: datas?.time
            }
        }
        else{
            data = {
                booking_id: datas?.item?._id,
                date: datas?.date,
                time: datas?.time,
                appointmenttype: datas?.item?.appointmenttype
    
            }
            url="patient/consultation/reschedule"
        }
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(url,data)
            .then(async response => {
                setShowModal(false)
                toast.show({
                    title: 'Success',
                    description: "Booking rescheduled successfully",
                    backgroundColor: "success.500"
                })
                navigation.navigate("Online")
                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
            .catch(async error => {
                toast.show({
                    title: 'Error',
                    description: error,
                    backgroundColor: "error.500"
                })
                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
    }

    const startMeeting = async() => {
        if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
            return;
          }
      
          const permissions = platformPermissions[Platform.OS];
          let blockedAny = false;
          let notGranted= [];
      
          checkMultiple(permissions).then(
            (statuses) => {
              permissions.map((p) => {
                const status = statuses[p];
                if (status === RESULTS.BLOCKED) {
                  blockedAny = true;
                } else if (status !== RESULTS.GRANTED) {
                  notGranted.push(p);
                }
              });
              notGranted.length && requestMultiple(notGranted);
              blockedAny && openSettings();
            }
        );
        if(notGranted?.length === 0){
            dispatch({
                type: LOADING,
                payload: true
            })

            try {
                let data = {
                    sessionName : item?.zoomDetails?.sessionName,
                    password: item?.zoomDetails?.password,
                    role_type: 1
                }
        
                let res= await customAxios.post(`doctor/zoomTokenNew`, data);
    
                let token = res?.data?.data

                reactotron.log({token})
    
                navigation.navigate('Call', {
                    sessionName: item?.zoomDetails?.sessionName,
                    displayName: user?.name,
                    sessionPassword: `${item?.zoomDetails?.password}`,
                    roleType: 0,
                    sessionIdleTimeoutMins: '60',
                    token
                })
                //navigation.navigate('Join')
            } catch (error) {
                
            }
            finally{
                dispatch({
                    type: LOADING,
                    payload: false
                })
            }
        }
        else{
            reactotron.log({notGranted})
        }
    }

    const goBack = () => {
        navigation.goBack()
    }

    return (
        <CustomBackground>
            <Box px={5} mt={1}>
                <CommonHeading label={`Booking ID :${item?.booking_id}`} goBack={goBack} />
            </Box>
            <Box bg={'#fff'} mt={5} borderTopRightRadius={30} borderTopLeftRadius={30}>
                <ScrollView px={8} showsVerticalScrollIndicator={false}>
                    <Box mb={8}>
                        <HStack py={4} alignItems={'center'} justifyContent={'space-around'}>
                            <Image
                                width={130} height={130} borderRadius={10}
                                source={{ uri: item?.type === "service" ?  `${IMG_URL}${item?.department?.[0]?.image}` : item?.type === "procedure" ? `${IMG_URL}${item?.department?.[0]?.image}` : `${IMG_URL}${item?.doctor_details?.image}`  }} alt='img' shadow={5}
                                flex={0.3}
                            />
                            <Box flex={0.7} ml={2}>
                                <Text fontSize={18} fontWeight={'bold'}>{item?.type === "service" ? item?.service_id.map(ser => startCase(ser?.name)).join(',') : item?.type === "procedure" ?  item?.procedure_id.map(ser => startCase(ser?.name)).join(',') : item?.doctor_details?.name}</Text>
                                <Text color={'#444444'}>{startCase( item?.type === "consultation" ? item?.doctor_details?.designation : item?.department?.[0]?.name)}</Text>
                            </Box>

                        </HStack>
                        <Box justifyContent={'center'} alignItems={'center'}>
                            <Text color={'#057FBF'} fontSize={22} fontWeight={'bold'} letterSpacing={1}>Token No : {item?.token}</Text>
                        </Box>

                        <Box py={5}>
                            <CommonInput
                                readonly={true}
                                control={control}
                                error={errors.dateTime}
                                fieldName="dateTime"
                                placeholder='Booked Date & Time'
                                inputType={'text'}
                                label={'Booked Date & Time'}
                                bgColor={'#FAFAFA'}
                                mt={1}
                                mb={2}
                            />
                            <CommonInput
                                readonly={true}
                                control={control}
                                error={errors.consultationFee}
                                fieldName="consultationFee"
                                placeholder='consultation Fees'
                                inputType={'text'}
                                label={'consultation Fees'}
                                bgColor={'#FAFAFA'}
                                mt={1}
                                mb={2}
                                defaultValue={item?.type === 'consultation' ? item?.amount_payable : item?.amount.toString()}
                            />
                            <CommonInput
                                readonly={true}
                                control={control}
                                error={errors.appointmentType}
                                fieldName="appointmentType"
                                placeholder='Appointment Type'
                                inputType={'text'}
                                label={'Appointment Type'}
                                bgColor={'#FAFAFA'}
                                mt={1}
                                mb={2}
                                defaultValue={item?.type === "consultation" ? item?.appointmenttype : startCase(item?.type) }
                            />
                            <CommonInput
                                readonly={true}
                                control={control}
                                error={errors.paymentStatus}
                                fieldName="paymentStatus"
                                placeholder='Payment Status'
                                inputType={'text'}
                                label={'Payment Status'}
                                bgColor={'#FAFAFA'}
                                mt={1}
                                mb={2}
                            />
                            <CommonInput
                                readonly={true}
                                control={control}
                                error={errors.appointmentStatus}
                                fieldName="appointmentStatus"
                                placeholder='Appointment Status'
                                inputType={'text'}
                                label={'Appointment Status'}
                                bgColor={'#FAFAFA'}
                                mt={1}
                                mb={2}
                            />
                            {item?.status !== 'Completed' &&
                            <HStack justifyContent={'space-around'} py={3}>
                                {(item?.zoomDetails?.sessionName && item?.appointmenttype === "Online" && moment().isSame(moment(item?.date, "YYYY-MM-DD"), 'day') ) && <CustomButton selected={true} label={'Join'} onPress={startMeeting} />}
                                <CustomButton selected={true} label={'Reschedule'} onPress={() => setShowModal(true)} />
                            </HStack>
                           }

                        </Box>

                    </Box>

                </ScrollView>
                {showModal && <RescheduleModal rescheduleBooking={(datas) => rescheduleBooking(datas)} showModal={showModal} setShowModal={setShowModal} item={item} />}
            </Box>

        </CustomBackground>
    )
}

export default Booking

const styles = StyleSheet.create({})
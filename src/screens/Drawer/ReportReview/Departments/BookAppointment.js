import { StyleSheet, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomBackground from '../../../../components/CustomBackground'
import CommonHeading from '../../../../components/CommonHeading'
import { Box, HStack, Image, ScrollView, Spinner, Text, useToast } from 'native-base'
import CustomBlogHeader from '../../../Op/BlogView/CustomBlogHeader'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import TextAreaInput from '../../../../components/TextAreaInput'
import reactotron from 'reactotron-react-native'
import DocUpload from '../../../Op/Department/IndividualDoctor/BookAppointment/AppointmentPay/DocUpload'
import DocumentPicker, {
    types,
} from 'react-native-document-picker'
import CustomButton from '../../../../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { LOADING } from '../../../../Redux/constants/authConstants'
import customAxios from '../../../../CustomeAxios'
import RazorpayCheckout from 'react-native-razorpay';
import { getUpcomingAppointment } from '../../../../Redux/actions/homeActions'
const BookAppointmentReport = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const toast = useToast()
    const { loading, user } = useSelector(state => state.auth);
    const { item } = route.params;
    reactotron.log({ item })
    reactotron.log({ user })
    const { height } = useWindowDimensions()
    const [files, setFiles] = useState([])
    const schema = yup.object({
        remarks: yup.string().required('Required')
    }).required();

    const { control, handleSubmit, formState: { errors }, setValue, setError } = useForm({
        resolver: yupResolver(schema)
    });


    const browseDocuments = () => {
        DocumentPicker.pick({
            allowMultiSelection: true,
            type: [types.pdf],
        })
            .then((result) => {
                setFiles(prev => [...prev, ...result])
                //setFiles(result)
            })
            .catch((error) => {
                reactotron.log({ error })
            })
    }



    const Submit = async (data) => {
        let formData = new FormData()
        formData.append("doctor_id", item?._id);
        formData.append("patient_id", user?._id);
        formData.append("name", user?.name);
        formData.append("mobile", user?.mobile);
        formData.append("dob", user?.dob);
        formData.append("gender", user?.gender);
        formData.append("appointmenttype", 'Report');
        formData.append("department", item?.department);
        formData.append("amount_payable", item?.review_fee)
        formData.append("remarks",data?.remarks);
        if (files?.length > 0) {
            files?.map((file, index) => {
                formData.append(`attachment[${index}]`, {
                    uri: file.uri,
                    type: file.type,
                    name: file.name
                });
            })
        }
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`patient/consultation/booking/report`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(async response => {
                let booking = response?.data?.data;
                reactotron.log({booking})
                var options = {
                    description: 'Consultation Booking',
                    image: require('../../../../images/hlogo.png'),
                    currency: booking?.currency,
                    key: "rzp_test_pUZiRv4OpzV68n", // Your api key
                    amount: booking?.amount,
                    name: user?.name,
                    order_id: booking?.razorPayId,
                    prefill: {
                        email: user?.email,
                        contact: user?.mobile,
                        name: user?.name
                    },
                    theme: { color: '#0E9DAB' }
                }

                openRazorPay(options, booking?.bookingId)

                dispatch({
                    type: LOADING,
                    payload: false
                })
               setFiles([])
               setValue('remarks','')
            }).catch(async error => {
                toast.show({
                    title: 'Error',
                    description: error,
                    backgroundColor: 'error.500'
                })
                dispatch({
                    type: LOADING,
                    payload: false
                })
            })

    }


    const openRazorPay = async (options, bookingId) => {
        RazorpayCheckout.open(options)
            .then(async (data) => {
                let bookingdata = {
                    bookingId: bookingId,
                    payment_id: data?.razorpay_payment_id,
                    signature: data?.razorpay_signature,
                    razorpayOrderId: data?.razorpay_order_id
                }
                paymentSuccess(bookingdata)
            })
            .catch((error) => {
                // handle failure
                alert(`Error: ${error.code} | ${error.description}`);
            });
    }

    const paymentSuccess = async(bookingdata) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`patient/consultation/reportbooking/update`, bookingdata)
        .then(async response => {
            dispatch({
                type: LOADING,
                payload: false
            })
            toast.show({
                title: 'Success',
                description: "Appointment booked successfully",
                backgroundColor: 'success.500'
            })
            navigation.navigate("ReportReview")
            setValue('remarks','')
          
        }).catch(async error => {
            toast.show({
                title: 'Error',
                description: error,
                backgroundColor: 'error.500'
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
    }




    return (
        <CustomBackground>
            <CustomBlogHeader />
            <Box px={5} mt={1} mb={8}>
                <CommonHeading label={`Book Appointment`} goBack={() => navigation.goBack()} />
            </Box>
            <Box height={height / 1} bg={'#fff'} borderTopLeftRadius={30} borderTopRightRadius={30}>
                <HStack alignItems={'center'} borderBottomColor='#0000000D' borderBottomWidth={1} mt={3} px={5}>
                    <Image
                        source={{ uri: item?.image }}
                        height={100}
                        flex={.30}
                        alt='name'
                        borderRadius={10}
                    />
                    <Box ml={5} flex={.70}>
                        <Text color={'#444444'} fontFamily='body' fontWeight={700} fontSize={16}>{item?.name}</Text>
                        <Text color={'#1C1C1C'} fontFamily='body' fontWeight={500} fontSize={12}>{item?.designation}</Text>
                        <Text color={'#1C1C1C'} fontFamily='body' fontWeight={500} fontSize={14} mt={2}>{item?.qualifications}</Text>
                    </Box>
                </HStack>
                <Box px={5}>
                    <TextAreaInput
                        control={control}
                        error={errors.remarks}
                        fieldName="remarks"
                        label={'Remarks'}
                        borderRadius={30}
                    />
                    <ScrollView h={200} showsVerticalScrollIndicator={false}>
                        <DocUpload mt={4} onPress={browseDocuments} files={files} removeFile={(index) => setFiles((prev) => prev.filter((f, i) => i != index))} />
                    </ScrollView>
                </Box>
            </Box>
            <Box position="absolute" bottom={3} left={"35%"}>
                <CustomButton selected={true} label={loading? 'Loading...' : 'Pay Now'} onPress={handleSubmit(Submit)} wid={100} />
            </Box>
        </CustomBackground>
    )
}

export default BookAppointmentReport

const styles = StyleSheet.create({})
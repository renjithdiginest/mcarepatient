import React,{useState} from 'react'
import { ImageBackground, StyleSheet,useWindowDimensions } from "react-native";
import { Box, Text, Image, Button, FlatList, ScrollView, useToast, HStack } from 'native-base'

import CommonHeading from '../../../../../../components/CommonHeading';
import moment from 'moment'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CommonActionButton from '../../../../../../components/CommonActionButton';
import TextAreaInput from '../../../../../../components/TextAreaInput'
import CustomBackground from '../../../../../../components/CustomBackground';
import DocUpload from './DocUpload';
import { useDispatch, useSelector } from 'react-redux'
import reactotron from '../../../../../../ReactotronConfig';
import { consultBooking, getDeptlist, getUpcomingAppointment } from '../../../../../../Redux/actions/homeActions';
import DocumentPicker, {
    types,
} from 'react-native-document-picker'
import { LOADING } from '../../../../../../Redux/constants/authConstants';
import customAxios from '../../../../../../CustomeAxios';
import RazorpayCheckout from 'react-native-razorpay';


const AppointmentPay = ({navigation}) => {

    const dispatch =useDispatch()

    const toast = useToast()
    
    const [currentTab, setCurrentTab] = useState(0)
    const [showStatus, setShowStatus] = useState("")
    const [files, setFiles] = useState([])

    const { width, height } = useWindowDimensions()

    const schema = yup.object({
		consultation_summary : yup.string().required('Required')
	}).required();

	const { control, handleSubmit, formState: { errors }, setValue ,setError} = useForm({
		resolver: yupResolver(schema)
	});

    const { activeDoctor, dateTimeType } = useSelector(state => state.home);
    const { user, loading } = useSelector(state => state.auth);
    

    const Submit = async(data) => {
        //reactotron.log({data, dateTimeType})
        let formData = new FormData()
        formData.append("date", moment(dateTimeType?.date, "DD-MM-YYYY").format("YYYY-MM-DD"));
        formData.append("doctor_id", activeDoctor?._id);
        formData.append("patient_id", user?._id);
        formData.append("name", user?.name);
        formData.append("mobile", user?.mobile);
        formData.append("dob", user?.dob);
        formData.append("gender", user?.gender);
        formData.append("appointmenttype", dateTimeType?.appointmentType);
        formData.append("department", activeDoctor?.department);
        formData.append("amount_payable", (dateTimeType ?.appointmentType === "Op" && activeDoctor?.op_fee) || 
        (dateTimeType ?.appointmentType === "Online" && activeDoctor?.online_fee) ||
        (dateTimeType ?.appointmentType === "Report" &&  activeDoctor?.review_fee));
        formData.append("time", dateTimeType?.time);
        formData.append("remarks", data?.consultation_summary);

        files.map((file, index) => {
            formData.append(`attachment[${index}]`, {
                uri: file.uri,
                type: file.type,
                name: file.name
            });
        })

        //dispatch(consultBooking(formData))
        dispatch({
            type: LOADING,
            payload: true
        })
    
        await customAxios.post(`patient/consultation/booking`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(async response => {
            let booking = response?.data?.data;

            var options = {
                description: 'Consultation Booking',
                image: require('../../../../../../images/hlogo.png'),
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
                theme: {color: '#0E9DAB'}
            }

            openRazorPay(options, booking?.bookingId)
            
            dispatch({
                type: LOADING,
                payload: false
            })

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

    const openRazorPay = async(options, bookingId) => {
        RazorpayCheckout.open(options)
        .then(async(data) => {
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
        await customAxios.post(`patient/consultation/booking/update`, bookingdata)
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
            dispatch(getDeptlist(user?._id))
            navigation.pop(4)
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


    const browseDocuments = () => {
        DocumentPicker.pick({
            allowMultiSelection: true,
            type: [types.pdf],
        })
        .then((result) => {

            reactotron.log({result})
            setFiles(prev => [...prev, ...result])
            //setFiles(result)
        })
        .catch((error) => {
            reactotron.log({error})
        })
    }



  return (
    
    <CustomBackground>
        <Box px={5} mt={5} >
            <CommonHeading label={'Book Appointment'} goBack={()=>navigation.goBack()}/>
        </Box>
        <Box borderTopRadius={30} bg='#fff' mt={5} flex={1} p={5}>
            <ScrollView showsVerticalScrollIndicator={false}>
              
                <HStack alignItems={'center'}  borderBottomColor='#0000000D' borderBottomWidth={1} pb={5}>
                    <Image
                        flex={.30}
                        width={90} height={90} borderRadius={25}
                        source={{ uri:activeDoctor?.image }} alt='img' shadow={5}
                    />
                    <Box ml={3} justifyContent='space-evenly' flex={.70} >
                        <Box>
                            <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={19}>{activeDoctor?.name}</Text>
                            <Text color={'#444444'} fontWeight={400} letterSpacing={1} fontSize={14} >{activeDoctor?.designation}</Text>
                        </Box>
                        <Text color={'#444444'} fontWeight={400} letterSpacing={1} fontSize={15} mt={2}>{activeDoctor?.qualifications}</Text>
                    </Box>
                </HStack>


                <TextAreaInput
                    control={control}
                    error={errors.consultation_summary}
                    fieldName="consultation_summary"
                    label={'Remarks'}
                    borderRadius={30}
                />

                <DocUpload mt={4} onPress={browseDocuments} files={files} removeFile={(index) => setFiles((prev) => prev.filter((f, i) => i != index ))} />

                {/* <CommonActionButton width={120} mt={10} alignSelf='center'>
                    <Text 
                        color={'#fff'} fontWeight={600} fontFamily="body" fontSize={18} 
                    >+ Add More</Text>

                </CommonActionButton> */}

                <Box bg='#0000001F' alignSelf={'center'} borderRadius={25} alignItems='center' p={5} mt={5}>

                    <Text 
                        color={'#444444'} fontWeight={600} fontFamily="body" fontSize={18} 
                    >Consultation Fees</Text>

                    {dateTimeType ?.appointmentType === "Op" &&<Text 
                        color={'#444444'} fontWeight={700} fontFamily="body" fontSize={26} 
                    >₹ {activeDoctor?.op_fee}</Text>}

                    {dateTimeType ?.appointmentType === "Online" &&<Text 
                        color={'#444444'} fontWeight={700} fontFamily="body" fontSize={26} 
                    >₹ {activeDoctor?.online_fee}</Text>}

                    {dateTimeType ?.appointmentType === "Report" &&<Text 
                        color={'#444444'} fontWeight={700} fontFamily="body" fontSize={26} 
                    >₹ {activeDoctor?.review_fee}</Text>}

                </Box>

           
                
                <CommonActionButton 
                    onPress={handleSubmit(Submit)}
                    // onPress={()=>navigation.navigate('BookedAppointMent')}

                    width={100} mt={10} alignSelf='center'
                >
                    <Text 
                        color={'#fff'} fontWeight={600} fontFamily="body" fontSize={18} 
                    >Next</Text>

                </CommonActionButton>

                
                
            </ScrollView>



        </Box>
     

    </CustomBackground>

  )
}

export default AppointmentPay

const styles = StyleSheet.create({
  
    image: {
        flex: 1,
       
    },
})
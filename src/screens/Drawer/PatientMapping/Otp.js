import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomBackground from '../../../components/CustomBackground'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Box, HStack, VStack, Text, useToast, Spinner } from 'native-base';
import CommonOTP from '../../../components/CommonOTP';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import CommonHeading from '../../../components/CommonHeading';
import CustomButton from '../../../components/CustomButton';
import reactotron from 'reactotron-react-native';
import { LOADING } from '../../../Redux/constants/authConstants';
import { useDispatch, useSelector } from 'react-redux';
import customAxios from '../../../CustomeAxios';


const Otp = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const toast = useToast()
    const { item } = route.params;

     reactotron.log({item})

    const {loading} = useSelector(state => state.auth);

    const schema = yup.object({
        otp: yup.number().required('OTP is required'),

    }).required();

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            patient_id: item?.patient_id,
            parent_id: item?.parent_id
        },
        resolver: yupResolver(schema)
    });


    const SubmitOtp = async (data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`patient/verifyotp`, data)
            .then(async response => {
                dispatch({
                    type: LOADING,
                    payload: false
                })
                navigation.navigate('PatientMapping')
            })
            .catch(async error => {
                toast.show({
                    title: `${'error'}`,
                    description: `${error.message}`,
                    background: 'error.500'
                })

                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
    }

    const ResendOtp = async () => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`patient/mapprofile`, item)
            .then(async response => {
                dispatch({
                    type: LOADING,
                    payload: false
                })
              
            })
            .catch(async error => {
                toast.show({
                    title: `${'error'}`,
                    description:`${error.message}`,
                    background: 'error.500'
                })

                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
    }



    return (
        <CustomBackground>

            <Box px={5} pt={2}>
                <HStack py={5} px={1} alignItems={'center'}>
                    <CommonHeading goBack={() => navigation.goBack()} />
                    <Box justifyContent={'center'} alignItems={'center'} width={'70%'}>
                        <Text color={'#444444'} fontWeight={500} letterSpacing={1} fontSize={25} textAlign={'center'}>OTP</Text>
                    </Box>
                </HStack>
                <Box px={5} alignItems={'center'}>
                    <Text color={'#444444'} fontWeight={500} letterSpacing={1} fontSize={16} mt={5} textAlign={'center'}>
                        A OTP has been sent to your registered mobile number
                    </Text>
                </Box>

                <VStack justifyContent={'center'} px={10}>
                    <CommonOTP
                        control={control}
                        error={errors.otp}
                        fieldName="otp"
                       
                    />
                    <Pressable
                        alignItems={'flex-end'}
                    onPress={ResendOtp} 
                    >
                        <Text fontSize={'14px'} fontWeight={'bold'} color={'#047AC3'}>Resend OTP?</Text>
                    </Pressable>
                </VStack>

                <Box py={10} alignItems={'center'}>
                    <CustomButton label={ loading?<Spinner color={'#ffff'}/> :'Confirm'} selected={true} onPress={handleSubmit(SubmitOtp)} />
                </Box>
            </Box>
        </CustomBackground>
    )
}

export default Otp

const styles = StyleSheet.create({})
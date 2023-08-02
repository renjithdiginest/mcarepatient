import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomBackground from '../../../components/CustomBackground'
import { Box, Spinner, useToast, VStack } from 'native-base'
import CommonHeading from '../../../components/CommonHeading'
import CommonInput from '../../../components/CommonInput'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CustomButton from '../../../components/CustomButton'
import reactotron from 'reactotron-react-native'
import { useDispatch, useSelector } from 'react-redux'
import { LOADING } from '../../../Redux/constants/authConstants'
import customAxios from '../../../CustomeAxios'

const AddPatient = ({ navigation }) => {
    const toast = useToast()
    const dispatch = useDispatch()
    const { user, loading } = useSelector(state => state.auth);

    const schema = yup.object({
        patient_id: yup.string().required('required'),
        mobile: yup.string().required('required'),
    }).required();



    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: {
            parent_id: user?.user_id
        },
        resolver: yupResolver(schema)

    });


    const SubmitForm = async (dataval) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`patient/mapprofile`, dataval)
            .then(async response => {
                dispatch({
                    type: LOADING,
                    payload: false
                })
                navigation.navigate('OtpPatient', {
                    item: dataval
                })
            })
            .catch(async error => {
                toast.show({
                    title: `${'error'}`,
                    description: JSON.parse(error),
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
            <Box px={5} mt={1}>
                <CommonHeading label={`Add Patient`} goBack={() => navigation.goBack()} />
            </Box>

            <Box py={10} px={8}>
                <VStack>
                    <CommonInput
                        readonly={false}
                        control={control}
                        error={errors.patient_id}
                        fieldName="patient_id"
                        placeholder='Patient id'
                        inputType={'text'}
                        label={'Patient ID'}
                        bgColor={'#FAFAFA'}
                        mt={1}
                        mb={2}
                    />
                    <CommonInput
                        readonly={false}
                        control={control}
                        error={errors.mobile}
                        fieldName="mobile"
                        placeholder='mobile Number'
                        inputType={'text'}
                        label={'Mobile Number'}
                        bgColor={'#FAFAFA'}
                        mt={1}
                        keyboardType="phone-pad"
                        mb={2}
                    />
                    <Box py={5} alignItems={'center'}>
                        <CustomButton selected={true} label={loading ? 'loading...': 'Confirm'} onPress={handleSubmit(SubmitForm)} />
                    </Box>
                </VStack>

            </Box>
        </CustomBackground>
    )
}

export default AddPatient

const styles = StyleSheet.create({})
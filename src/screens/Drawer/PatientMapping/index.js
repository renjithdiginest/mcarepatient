import { StyleSheet, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, FlatList, Spinner, Text, useToast } from 'native-base'
import CustomBackground from '../../../components/CustomBackground'
import CommonHeading from '../../../components/CommonHeading'
import CustomButton from '../../../components/CustomButton'
import CurrentPatient from './CurrentPatient'
import PatientsCard from './PatientsCard'
import NoPatient from './NoPatient'
import { useDispatch, useSelector } from 'react-redux'
import { LOADING } from '../../../Redux/constants/authConstants'
import customAxios from '../../../CustomeAxios';
import reactotron from 'reactotron-react-native'
const PatientMapping = ({ navigation }) => {
    const dispatch = useDispatch()
    const toast = useToast()
    const { height } = useWindowDimensions()
    const { user, loading, privateUser } = useSelector(state => state.auth);
    const [apiResponse, setApiResponse] = useState([])

    reactotron.log({ apiResponse })

    const renderItems = ({ item }) => {
        return (
            <PatientsCard
                item={item}
            />
        )
    }



    const getMappedProfile = async () => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.get(`patient/listprofiles/${privateUser?.user_id}`)
            .then(async res => {
                setApiResponse(res?.data?.data)
                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
            .catch(async error => {
                toast.show({
                    title: `${'error'}`,
                    description: error,
                    background: 'error.500'
                })

                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
    }


    useEffect(() => {
        getMappedProfile()
    }, [user])








    return (
        <CustomBackground>
            <Box px={5}>
                <CommonHeading label={'Patient Mapping'} />


                <FlatList
                    h={height / 1.5}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={apiResponse}
                    renderItem={renderItems}
                    keyExtractor={item => item?._id}
                    ListHeaderComponent={() => (
                        <>

                            <Box py={5}>
                                <CurrentPatient />
                                {apiResponse?.length > 0 &&
                                <Text py={2} px={1} letterSpacing={.5} fontSize={18} fontWeight={700} >Mapped Patients</Text>}
                                <NoPatient/>
                            </Box>
                        </>

                    )
                    }
                />

            </Box>
            <Box position={'absolute'} bottom={2} alignSelf={'center'}>
                <CustomButton selected={true} label={'Add Patient'} onPress={() => navigation.navigate('AddPatient')} />
            </Box>
        </CustomBackground>
    )
}

export default PatientMapping

const styles = StyleSheet.create({})
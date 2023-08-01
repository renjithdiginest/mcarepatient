import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import DatePickerBox from '../Profile/LeaveManagement/DatePickerBox'
import { Box, FlatList, useToast, Spinner } from 'native-base'
import PatientCard from '../../components/PatientCard'
import { consultationFilter, getCompletedConsult } from '../../Redux/actions/homeActions'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { LOADING } from '../../Redux/constants/authConstants'
import customAxios from '../../CustomeAxios'
import reactotron from '../../ReactotronConfig'


const Completed = ({ type }) => {

    

    const dispatch = useDispatch();
    const toast = useToast()
    const { height, width } = useWindowDimensions()

    const [openCal, setOpenCal] = useState(false)
    const [dates, setDate] = useState(null)
    const displayDate = moment(dates).format("DD-MM-YYYY")

    const [completedConsultList, setCompletedConsultList] = useState([])


    const { error, updatedConsultation, } = useSelector(state => state.home)
    const { user, loading } = useSelector(state => state.auth)

    const datee = moment(dates).format("YYYY-MM-DD")

    const [compelted, setCompleted] = useState([])








    const getCompletedConsult = async () => {

        let data = {
            doctor_id: user?._id,
            type: type
        }
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`doctor/oldconsultations`, data)
            .then(async response => {
                let data = response?.data?.data
                 reactotron.log({data})
                setCompletedConsultList(data)
                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
            .catch(async error => {
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

    useEffect(() => {
        getCompletedConsult()
    }, [updatedConsultation, type])

    useEffect(() => {

        if (dates) {
            let data = {
                date: datee,
                doctor_id: user?._id,
                type: type,
            }
            consultationFilter(data)
        }
    }, [dates])

    const consultationFilter = async (data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`doctor/consultationbydate`, data)
            .then(async response => {
                let data = response?.data?.data
                setCompletedConsultList(data)
                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
            .catch(async error => {
                toast.show({
                    title: 'Error',
                    description: error,
                    backgroundColor: 'error.500'
                })
                dispatch({
                    type: LOADING,
                    payload: false
                })
            });
    }




    const renderItems = ({ item }) => {
        return (
            <PatientCard
                item={item}
                type={'completed'}
            />
        )
    }
    return (
        <>
            <DatePickerBox
                onPress={() => setOpenCal(true)}
                maximumDate={new Date()}
                showDate={displayDate === "Invalid date" ? "Choose Date" : displayDate}
                open={openCal}
                date={dates ? dates : new Date()}
                onConfirm={(date) => {
                    setOpenCal(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setDate(null)
                    setOpenCal(false)
                    getCompletedConsult()
                }}
            />
            <FlatList
                data={completedConsultList}
                keyExtractor={(item) => item._id}
                renderItem={renderItems}
                showsVerticalScrollIndicator={false}
                pt={2}
                mb={170}
                ListEmptyComponent={() => <Box height={400} justifyContent="center" alignItems={"center"}>No Records Found</Box>}
                refreshing={loading}
                onRefresh={getCompletedConsult}
            />
        </>
    )
}

export default Completed

const styles = StyleSheet.create({})
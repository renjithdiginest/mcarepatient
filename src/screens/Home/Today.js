import { StyleSheet, useWindowDimensions } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useToast, FlatList, Box } from 'native-base'
import PatientCard from '../../components/PatientCard'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { LOADING } from '../../Redux/constants/authConstants'
import customAxios from '../../CustomeAxios'


const Today = ({ type }) => {



    const dispatch = useDispatch();
    const toast = useToast()  
    const [todayConsultList, setTodayConsultList] = useState([])
    const { error, updatedConsultation } = useSelector(state => state.home)
    const { user, loading } = useSelector(state => state.auth)


    const [today, setToday] = useState([])


    


    useEffect(() => {
        setTodayConsultList([])
    }, [type])
    


    useEffect(() => {
        getTodayConsult()
    }, [updatedConsultation, type])


    const getTodayConsult = async() => {
        let data = {
            doctor_id: user?._id,
            type : type
        }

        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`doctor/todaysconsultations`, data)
            .then(async response => {
                let data = response?.data?.data
                setTodayConsultList(data)
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

    const renderItems = ({item}) => {
        return(
            <PatientCard 
                item={item} 
                type={'today'}
            />
        )
    }

    return (
        
        <FlatList 
            data={todayConsultList}
            keyExtractor={(item) => item?._id}
            renderItem={renderItems}
            showsVerticalScrollIndicator={false}
            pt={2}
            mb={100}
            refreshing={loading}
            onRefresh={getTodayConsult}
            ListEmptyComponent={() => <Box height={500} justifyContent="center" alignItems={"center"}>No Records Found</Box>}
        />
    )
}

export default Today

const styles = StyleSheet.create({})
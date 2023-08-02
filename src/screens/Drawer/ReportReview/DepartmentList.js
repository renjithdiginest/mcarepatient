import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomBackground from '../../../components/CustomBackground'
import CommonHeading from '../../../components/CommonHeading'
import { Box, FlatList } from 'native-base'
import DepartmentsCard from '../../Op/DepartmentsCard'
import DepartmentCards from './DepartmentCards'
import { LOADING } from '../../../Redux/constants/authConstants'
import { useDispatch, useSelector } from 'react-redux'
import reactotron from 'reactotron-react-native'
import customAxios from '../../../CustomeAxios'

const DepartmentList = ({ navigation }) => {
    const dispatch = useDispatch()
    const { user, loading } = useSelector(state => state.auth);
    const [deptList, setDeptList] = useState(null)


    const getDeptlist = async () => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.get(`patient/home/${user?._id}`)
            .then(async response => {
                let data = response?.data
                dispatch({
                    type: LOADING,
                    payload: false
                })
                setDeptList(data)
            })
            .catch(async error => {

                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
    }

    useEffect(() => {
        getDeptlist()
    }, [user])

    const renderItems = ({ item }) => {

        return (

            <DepartmentCards item={item} />
        )
    }





    return (
        <CustomBackground>
            <Box px={4} mt={1}>
                <CommonHeading label={`Choose Department`} goBack={() => navigation.goBack()} />
            </Box>
            <Box py={8} px={3}>
                <FlatList

                    data={deptList?.department}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItems}
                    numColumns={4}
                />
            </Box>


        </CustomBackground>
    )
}

export default DepartmentList

const styles = StyleSheet.create({})
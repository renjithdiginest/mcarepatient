import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomBackground from '../../../../components/CustomBackground'
import CommonHeading from '../../../../components/CommonHeading'
import { Box, HStack, Text, Icon, useToast, FlatList, Spinner, Skeleton } from 'native-base'
import PersonalDetails from './PersonalDetails'
import DoctorDetailsCard from './DoctorDetailsCard'
import { useDispatch, useSelector } from 'react-redux';
import { getPatientHistory } from '../../../../Redux/actions/homeActions'
import moment from 'moment';
import CustomHeader from '../../../../components/CustomHeader'

const PatientHistory = ({navigation, route}) => {

    const dispatch = useDispatch();
    const toast = useToast() 

    const { width, height } = useWindowDimensions()

    const { patientHistory } = useSelector(state => state.home)
    const { loading } = useSelector(state => state.auth)

    const { activePatient } = route.params

    const history = patientHistory?.history

    const [historyList, setHistoryList] = useState([])


    useEffect(() => {
        if(history && history.length > 0){

            //let leave = leaveList
            let List = history.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return moment(`${b.date}`) - moment(`${a.date}`);
            });
            setHistoryList(List)
        }
    }, [history])


    // reactotron.log({activePatient})
    // datas=[
    //     {
    //         id: 1,
    //         name: 'Dr. Sam'
    //     },
    //     {
    //         id: 2,
    //         name: 'Dr. Arun'
    //     },
    //     {
    //         id: 3,
    //         name: 'Dr. Denson'
    //     },
    //     {
    //         id: 4,
    //         name: 'Dr. Kiran'
    //     },
    // ]


    useEffect(() => {
        dispatch(getPatientHistory(activePatient?.patient_id))
    }, [])


    const renderItems = ({item}) => {
        return(
            <DoctorDetailsCard 
                item={item} 
            />
        )
    }


    return (
        <CustomBackground>
            <CustomHeader/>
            <CommonHeading label={`Patient ID : ${patientHistory?.patient?.user_id}`} goBack={()=>navigation.goBack()} px={5}/>
            <FlatList 
                data={historyList}
                keyExtractor={(item) => item._id}
                renderItem={renderItems}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => <PersonalDetails
                    patientName={activePatient?.name}
                    dob={activePatient?.dob}
                    gender={activePatient?.gender}
                />}
                refreshing={loading}
                padding={5}
            />
        </CustomBackground>
    )
}

export default PatientHistory

const styles = StyleSheet.create({})
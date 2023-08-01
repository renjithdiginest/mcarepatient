import { StyleSheet, useWindowDimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import DatePickerBox from '../Profile/LeaveManagement/DatePickerBox'
import { Box, FlatList, Spinner, useToast} from 'native-base'
import PatientCard from '../../components/PatientCard'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import reactotron from 'reactotron-react-native'
import customAxios from '../../CustomeAxios'
import { LOADING } from '../../Redux/constants/authConstants'


const Upcoming = ({type}) => {

    const {height, width} = useWindowDimensions()

    const [openCal, setOpenCal] = useState(false)
    const [dates, setDate] = useState(null)

    const displayDate = moment(dates).format("DD-MM-YYYY")
    const datee = moment(dates).format("YYYY-MM-DD")

    const [upcomingConsultList, setUpcomingConsultList] = useState([])


    const navigation = useNavigation();


    const dispatch = useDispatch();
    const toast = useToast()  

    const { error, updatedConsultation } = useSelector(state => state.home)
    const { user, loading } = useSelector(state => state.auth)

    reactotron.log({upcomingConsultList})

    const [upcoming, setUpcoming] = useState([])


    useEffect(() => {
        if(upcomingConsultList){
            if(upcomingConsultList.length > 0){
                //let leave = leaveList
                let List = upcomingConsultList.sort(function(a,b){
                    return moment(`${b.date}`, "DD-MM-YYYY") - moment(`${a.date}`, "DD-MM-YYYY");
                });
                setUpcoming(List)
            }
            else{
            
                setUpcoming([])
            }
            
        }
    }, [upcomingConsultList])



    useEffect(() => {
        getUpcomingConsultations()
    }, [updatedConsultation, type])

    const getUpcomingConsultations = async() => {
        let data = {
            doctor_id: user?._id,
            type : type
        }
        //dispatch(getUpcomingConsult(data))
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`doctor/upcomingconsultations`, data)
        .then(async response => {
            let data = response?.data?.data
            setUpcomingConsultList(data)
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
        if(dates){
            let data = {
                date: datee,
                doctor_id: user?._id,
                type : type,
            }
            filterConsultation(data)
        }
        
    }, [dates])

    const filterConsultation = async(data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`doctor/consultationbydate`, data)  
        .then(async response => {
            let data = response?.data?.data
            setUpcomingConsultList(data)
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

    const renderItems = ({item}) => {
        return(
            <PatientCard 
                item={item} 
                type={'upcoming'}
            />
        )
    }
    return (
        <>
            <DatePickerBox
                onPress={()=>setOpenCal(true)}
                minimumDate={new Date()}
                showDate={displayDate === "Invalid date" ? "Choose Date" : displayDate}
                open={openCal}
                date={dates ? dates : new Date()}
                onConfirm={(date) => {
                    setOpenCal(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpenCal(false)
                    setDate(null)
                    getUpcomingConsultations()
                }}
            />
            <FlatList 
                data={upcomingConsultList}
                keyExtractor={(item) => item._id}
                renderItem={renderItems}
                showsVerticalScrollIndicator={false}
                pt={2}
                mb={170}
                // refreshing={loading}
                // onRefresh={getUpcomingConsultations}
                ListEmptyComponent={() => <Box height={400} justifyContent="center" alignItems={"center"}>No Records Found</Box>}
            />


        </>
    )
}

export default Upcoming

const styles = StyleSheet.create({})
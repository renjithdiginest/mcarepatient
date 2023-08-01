import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomBackground from '../../../components/CustomBackground'
import { Box, HStack, Icon, Pressable, Text, FlatList, useToast, Spinner } from 'native-base'
import CommonHeading from '../../../components/CommonHeading'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonActionButton from '../../../components/CommonActionButton'
import LeaveCard from './LeaveCard'
import DatePickerBox from './DatePickerBox'
import { useDispatch, useSelector } from 'react-redux';
import { RESET_ERROR } from '../../../Redux/constants/authConstants'
import { getLeaveList, LeaveFilter } from '../../../Redux/actions/profileActions'
import reactotron from '../../../ReactotronConfig'
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';

const LeaveManagement = ({navigation}) => {


    const [openCal, setOpenCal] = useState(false)
    const { width, height } = useWindowDimensions()
    const dispatch = useDispatch();
    const toast = useToast()  
    

    // const [openCal, setOpenCal] = useState(false)
    const [dates, setDate] = useState(null)

    const [leaves, setLeaves] = useState([])


    const { error, leaveList } = useSelector(state => state.profile)
    const { user, loading } = useSelector(state => state.auth)

    const datee = moment(dates).format("DD-MM-YYYY")


    useFocusEffect(
        React.useCallback(() => {
            getLeave()
        }, [])
    );


    // useEffect(() => {
    //     getLeave()
    // }, [])

    useEffect(() => {
        if(dates){
            let data = {
                date: datee,
                doctor_id: user?._id,
            }
            dispatch(LeaveFilter(data))
        }
    }, [dates])

    // useEffect(() => {
    //     dispatch(getLeaveList(user?._id))
    // }, [])

    const getLeave = () => {
        dispatch(getLeaveList(user?._id))
    }

    useEffect(() => {
        if(error){
            toast.show({
                title: error
            })
        }
        dispatch({
            type: RESET_ERROR
        })
    }, [error])


    useEffect(() => {
        if(leaveList && leaveList?.length > 0){
            let leavList = leaveList.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return moment(`${b.leave_days}`, "DD-MM-YYYY") - moment(`${a.leave_days}`, "DD-MM-YYYY");
            });
            setLeaves(leavList)
        }
    }, [leaveList])

    const renderItems = ({item}) => {
        return(
            <LeaveCard 
                item={item} 
            />
        )
    }

    return (
        <CustomBackground>
            <Box px={5} pt={5} >
                <CommonHeading label={'Leave Management'} width={width} goBack={()=>navigation.goBack()}/>

                <DatePickerBox
                    showDate={datee === "Invalid date" ? "Choose Date" : datee}
                    date={dates ? dates : new Date()}
                    onConfirm={(date) => {
                        setDate(date)
                    }}
                    onCancel={() => {
                        setDate(null)
                        setOpenCal(false)
                        getLeave()
                    }}
                />
      
              
                    {loading ? <Spinner/> : 
                    <FlatList 
                        data={leaves}
                        keyExtractor={(item) => item._id}
                        renderItem={renderItems}
                        showsVerticalScrollIndicator={false}
                        h={'70%'}
                     
                    />}
                
            </Box>

            <Box position={'absolute'} bottom={5} right={5}>
                <CommonActionButton onPress={()=>navigation.navigate('AddLeave')}>
                    <Icon as={<Ionicons/>} name='add' color='#fff' size={31} mt={1} ml={0.5}/>
                </CommonActionButton>
            </Box>

        </CustomBackground>
    )
}

export default LeaveManagement

const styles = StyleSheet.create({})
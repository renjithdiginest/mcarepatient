import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Box, HStack, Icon, Pressable, Text, FlatList, useToast, Spinner } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment';
import Calendar from "react-native-calendar-range-picker";
import CommonActionButton from '../../../../components/CommonActionButton';
import ConsultationTypeCheckbox from '../ConsultationTypeCheckbox';
import CustomBackground from '../../../../components/CustomBackground';
import CommonHeading from '../../../../components/CommonHeading';
import reactotron from '../../../../ReactotronConfig';
import { useDispatch, useSelector } from 'react-redux';
import { applyLeave } from '../../../../Redux/actions/profileActions';
import { RESET } from '../../../../Redux/constants/profileConstants';
import { RESET_ERROR } from '../../../../Redux/constants/authConstants';


const AddLeave = ({ navigation }) => {

    const dispatch = useDispatch();
    const toast = useToast()

    const { error, leaveList, leaveSuccess } = useSelector(state => state.profile)
    const { user, loading } = useSelector(state => state.auth)

    const { width, height } = useWindowDimensions()

    const [open, setOpen] = useState('')
    const [showModal, setShowModal] = useState(false)

    const [openCal, setOpenCal] = useState(false)
    const [dates, setDate] = useState(new Date())

    const [dateList, setDateList] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');



    const OpenCalender = () => {
        setShowModal(false)
        setOpen(true)
    }

    function getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }

    useEffect(() => {
        if (error) {
            toast.show({
                title: 'Error',
                description: JSON.parse(error) 
            })
            dispatch({
                type: RESET_ERROR
            })
        }
        if (leaveSuccess) {
            toast.show({
                title: 'Leave Submitted',
            })
            dispatch({
                type: RESET
            })
            navigation.goBack()
        }
    }, [error, leaveSuccess])

    const Submit = () => {
        let data = {
            id: user?._id,
            type: groupValue,
            leave_days: endDate ? dateList : [startDate],
            department: user?.department
        }
        if (startDate || endDate) {
            
            dispatch(applyLeave(data))
        } else {
            toast.show({
                title: 'Please Select Date',
            })
        }
    };


    const [groupValue, setGroupValue] = useState([]);


    // reactotron.log({groupValue})

    const options = ["Op", "Online", "Report"]

    function pickType(selectedType) {
        if (groupValue.includes(selectedType)) {
            setGroupValue(groupValue.filter(type => type !== selectedType))
            return
        }
        setGroupValue(groupValue => groupValue.concat(selectedType))
    }



    return (
        <CustomBackground>

            <Box px={5} pt={5}>
                <CommonHeading label={'Apply Leave'} goBack={() => navigation.goBack()} />
                <Text color={'#000000'} fontFamily='body' fontWeight={600} fontSize={15} mt={10}>Choose Date</Text>
                <Pressable
                    flexDir={'row'}
                    onPress={OpenCalender}
                    minH={45} bg='#fff' borderRadius={15} mt={1}
                    alignItems='center' justifyContent={'space-between'} px={2}
                >
                    <HStack width={width / 2.2} justifyContent='space-between' >
                        {startDate && <Text>{moment(startDate).format("DD-MM-YYYY")}</Text>}
                        {endDate && <Text color={startDate == endDate ? "#fff" : "#000"}>-</Text>}
                        {endDate && <Text>{startDate == endDate ? "" : moment(endDate).format("DD-MM-YYYY")}</Text>}
                    </HStack>
                    <Icon as={<Ionicons />} name='calendar' color='#047AC3' size={26} />
                </Pressable>
                {open && <Box height={height / 2.5} mt={5} mx={3} mb={20}>

                    <Calendar
                        onChange={({ startDate, endDate }) => {
                            let dates = getDates(startDate, endDate)
                            setStartDate(startDate)
                            setEndDate(endDate)
                            setDateList(dates)
                        }}
                        disabledBeforeToday={true}
                        style={{
                            // container: {},
                            // monthContainer: {},
                            // weekContainer:{},
                            monthNameText: { color: '#057EC1', fontWeight: '700' },
                            // dayNameText: {},
                            // dayText: {},
                            // dayTextColor: '#f7f7f7',
                            // holidayColor: 'rgba(0,0,0,0.5)',
                            todayColor: 'blue',
                            // disabledTextColor: '#Hex',
                            // selectedDayTextColor: '#Hex',
                            // selectedDayBackgroundColor: '#Hex',
                            // selectedBetweenDayTextColor: '#Hex',
                            // selectedBetweenDayBackgroundTextColor: '#Hex',
                        }}
                    />

                    <HStack mt={2} justifyContent={'space-between'}>
                        <CommonActionButton
                            onPress={() => {
                                // setShowModal(true)
                                setOpen(false)
                            }}
                            width={100}
                        >
                            <Text color={'#fff'} fontFamily='body' fontWeight={600} letterSpacing={1.5} fontSize={15}>CANCEL</Text>
                        </CommonActionButton>
                        <CommonActionButton
                            onPress={() => {
                                // setShowModal(true)
                                setOpen(false)
                            }}
                            width={100}
                        >
                            <Text color={'#fff'} fontFamily='body' fontWeight={600} letterSpacing={1.5} fontSize={15}>SUBMIT</Text>
                        </CommonActionButton>
                    </HStack>


                </Box>}

                <Text color={'#000000'} fontFamily='body' fontWeight={600} fontSize={15} mt={5}>Consultation Type</Text>


                {/* <ConsultationTypeCheckbox
                    // isInvalid={groupValue?.length >0 ? false : true}
                    defaultValue={groupValue}
                    onChange={values => {
                        setGroupValue(values || []);
                    }}
                /> */}
                <Box>
                    {options.map((option, index) => (
                        <Pressable onPress={() => pickType(option)} key={index}>
                            <View key={option} style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center', backgroundColor: '#fff', padding: 10, justifyContent: 'space-between', borderRadius: 20, paddingRight: 20 }} >

                                <Text marginLeft={2}>{option}</Text>
                                <TouchableOpacity
                                    style={{ width: 25, height: 25, borderRadius: 3, borderWidth: 2, borderColor: '#057EC1', alignItems: 'center', justifyContent: 'center' }}
                                    onPress={() => pickType(option)}
                                >
                                    {groupValue.includes(option) && (<Icon
                                        as={<Ionicons name={'checkmark-sharp'} />}
                                        color={'blue.600'}
                                        size={18}
                                    />)}
                                </TouchableOpacity>

                            </View>
                        </Pressable>
                    ))}
                </Box>

                <Box alignItems={'center'}>
                    <CommonActionButton
                        disable={loading ? true : false}
                        width={100} onPress={Submit} my={10}
                    >
                        <Text color={'#fff'} fontFamily='body' fontWeight={600} letterSpacing={0.5} fontSize={15} >Confirm</Text>
                    </CommonActionButton>
                </Box>


            </Box>


        </CustomBackground>
    )
}

export default AddLeave

const styles = StyleSheet.create({})
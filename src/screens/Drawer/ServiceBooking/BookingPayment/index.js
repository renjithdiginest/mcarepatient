import React,{useState, useEffect} from 'react'
import { TouchableOpacity, StyleSheet,useWindowDimensions } from "react-native";
import { Box, Text, Image, Icon, FlatList, ScrollView, useToast, HStack, Pressable, Spinner } from 'native-base'
import customAxios from '../../../../CustomeAxios';
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux'
import TimeCard from '../../../Op/Department/IndividualDoctor/BookAppointment/TimeCard';
import CustomBackground from '../../../../components/CustomBackground';
import CommonHeading from '../../../../components/CommonHeading';
import CustomInputIcon from '../../../../components/CustomInputIcon';
import CommonActionButton from '../../../../components/CommonActionButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { LOADING } from '../../../../Redux/constants/authConstants';
import reactotron from '../../../../ReactotronConfig';
import { IMG_URL } from '../../../../config/constants';
import RazorpayCheckout from 'react-native-razorpay';


const BookingPayment = ({navigation, route}) => {

    const { item } = route.params;
    const id = "test-toast";
    const toast = useToast()
    const dispatch =useDispatch()

    const { user } = useSelector(state => state.auth);

    const { loading } = useSelector(state => state.auth)


    const [selectedTime, setSelectedTime] = useState('')
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())
    const [price, setPrice] = useState(0)
    const [times, setTimes] = useState(null)
    const time = times?.data?.time

    const [data, setData] = useState([])

    reactotron.log({time})

    useEffect(() => {
        if(item){
            setData(item?.service_id.map(pro => {
                return {
                    ...pro,
                    selected: true
                }
            }))
        }
    }, [item])


    useEffect(() => {
        if(data){
            let selectedRate = data.filter(rate => (rate.selected === true))
            let price = selectedRate.reduce((sum, price)=>(
                sum+parseInt(price.price)
            ),0)
            setPrice(price)
        }
    }, [data])

    const [selectedDate, SetSelectedDate] = useState(new Date())

    const schema = yup.object({
		consultation_summary : yup.string().required('Required'),
        status : yup.string().required('Required'),
	}).required();

	const { control, handleSubmit, formState: { errors }, setValue ,setError} = useForm({
		resolver: yupResolver(schema)
	});

    AppointType = [
        {
            _id: '1',
            Name: 'Op'
        },
        {
            _id: '2',
            Name: 'Online'
        },
        {
            _id: '3',
            Name: 'Report Review'
        },
    ]

    const renderTime = ({item}) => {
        return(
            <TimeCard 
                selectedTime={selectedTime}
                onChanged={() => setSelectedTime(item?.time)}
                item={item}
            />
        )
    }

    const onChangeDate = (result) => {
        let value = {
            date: moment(result).format('YYYY-MM-DD'),
            service_id: item?.service_id?.[0]?.id
        }
        getTimeAvailability(value)
    }

    const getTimeAvailability = async(data) => {
        dispatch({
            type: LOADING,
            payload: true
        })
        await customAxios.post(`patient/service/time`,data)
            .then(async response => {
                setTimes(response?.data)
                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
            .catch(async error => {
                toast.show({
                    title: "Error",
                    description: error,
                    backgroundColor: "error.500"
                })
                dispatch({
                    type: LOADING,
                    payload: false
                })
            })
    }

    function pickType(selectedType){
        let results = data?.map(type => {
            if(type?.id === selectedType?.id){
                return {
                    ...type,
                    selected: type?.selected ? false : true
                }
            }
            else{
                return type
            }
        })
        // reactotron.log({results})
        setData([...results])
    }

    const Submit = async() => {
        dispatch({
            type: LOADING,
            payload: true
        })
        let datas = {
            patient_id: item?.patient_id,
            department_id: item?.department_id,
            service_id: data?.map(serId => serId?.id),
            amount: price,
            date:  moment(selectedDate).format('YYYY-MM-DD') ,
            time: selectedTime,
            referral_id: item?._id,
        }
        // reactotron.log({datas})
        await customAxios.post(`patient/service/booking`, datas)
        .then(async response => {
            
            let booking = response?.data?.data;

            var options = {
                description: 'Service Booking',
                image: require('../../../../images/hlogo.png'),
                currency: booking?.currency,
                key: "rzp_test_pUZiRv4OpzV68n", // Your api key
                amount: booking?.amount,
                name: user?.name,
                order_id: booking?.razorPayId,
                prefill: {
                    email: user?.email,
                    contact: user?.mobile,
                    name: user?.name
                },
                theme: {color: '#0E9DAB'}
            }

            openRazorPay(options, booking?.bookingId)
            
            

        }).catch(async error => {
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


    const openRazorPay = async(options, bookingId) => {
        RazorpayCheckout.open(options)
        .then(async(data) => {
            let bookingdata = {
                bookingId: bookingId,
                payment_id: data?.razorpay_payment_id,
                signature: data?.razorpay_signature,
                razorpayOrderId: data?.razorpay_order_id
            }
            paymentSuccess(bookingdata)
        })
        .catch((error) => {
            dispatch({
                type: LOADING,
                payload: false
            })
        // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
        });
    }


    const paymentSuccess = async(bookingdata) => {
        await customAxios.post(`patient/service/booking/update`, bookingdata)
        .then(async response => {
            dispatch({
                type: LOADING,
                payload: false
            })
            toast.show({
                title: 'Success',
                description: "Appointment booked successfully",
                backgroundColor: 'success.500'
            })
            navigation.navigate("ServiceBooking")
            //navigation.pop(4)
        }).catch(async error => {
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

    // const BookService = async(datas) => {
    //     dispatch({
    //         type: LOADING,
    //         payload: true
    //     })
        
    //     await axios.post(`patient/service/booking`, datas)
    //         .then(async response => {
                
    //             // setBookingSuccess(response?.data)

    //             toast.show({
    //                 title: "Success",
    //                 description: response?.message,
    //                 backgroundColor: "blue.400"
    //             })

    //             dispatch({
    //                 type: LOADING,
    //                 payload: false
    //             })
    //         })
    //         .catch(async error => {

    //             toast.show({
    //                 title: "Error",
    //                 description: error,
    //                 backgroundColor: "error.500"
    //             })
               
    //             dispatch({
    //                 type: LOADING,
    //                 payload: false
    //             })
    //         })
    // }

    const errorToast = () => {
        if (!toast.isActive(id)) {
            toast.show({
                id,
                title: "Choose Date & Time",
                backgroundColor: "error.500"
            });
        }
    }


  return (
    
    <CustomBackground>
        <Box px={5} mt={5} >
            <CommonHeading label={'Book Service'} goBack={()=>navigation.goBack()}/>
        </Box>
        <Box borderTopRadius={30} bg='#fff' mt={5} flex={1} px={5}>

            <FlatList 
                data={time?.filter(ti => ti.patient_id === null)}
                keyExtractor={(item) => item.time}
                renderItem={renderTime}
                numColumns={3}   
                showsVerticalScrollIndicator={false}     
                ListHeaderComponent={()=> <>
                    <HStack alignItems={'center'}  borderBottomColor='#0000000D' borderBottomWidth={1} pb={5} mt={2}>
                        <Image
                            width={90} height={90} borderRadius={25}
                            source={{ uri: `${IMG_URL}${item?.department?.image}` }} 
                            // source={require('../../../../images/user.jpeg')} 
                            alt='img' shadow={5}
                        />
                        <Box ml={3} justifyContent='space-between' py={1}  >
                            <Box>
                                <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={16} >{item?.service_id?.map((data) => (data.name)).join(', ')}</Text>
                                <Text color={'#444444'} letterSpacing={1} fontSize={14}>{item?.department?.name}</Text>
                                
                            </Box>
                            <Box>
                                <HStack alignItems='center'>
                                    <Icon
                                        as={<MaterialCommunityIcons />}
                                        name='doctor'
                                        size={18} color='#047AC3'
                                    />
                                    <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={14} ml={2}>{item?.doctor?.name}</Text>
                                </HStack>
                                <HStack alignItems='center'>
                                    <Icon
                                        as={<Ionicons />}
                                        name='calendar'
                                        size={18} color='#047AC3'
                                    />
                                    {/* <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={14} ml={2}>{moment(item?.date).format('DD/MM/YYYY') }</Text> */}
                                    <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={14} ml={2}>{moment(item?.created_at).format('DD/MM/YYYY')}</Text>
                                </HStack>
                            
                            </Box>
                        </Box>
                    </HStack>

                    <Box mt={4}>
                        {data?.map( option => (
                        <Pressable 
                            onPress={()=> pickType(option)}
                            key={option?.id} 
                            flexDir='row'
                            alignItems='center'
                            justifyContent={'space-between'}
                            bg='#E6F4F7'
                            mt={2}
                            p={3}
                            borderRadius={20}
                            pr={5}
                        >
                            <Text marginLeft={2}>{option?.name}</Text>
                            <TouchableOpacity 
                                style={{width:25, height:25, borderRadius:3, borderWidth:2, borderColor:'#057EC1', alignItems:'center', justifyContent:'center'}}
                                onPress={()=> pickType(option)}
                            >
                                {option?.selected && (<Icon 
                                    as={<Ionicons name={'checkmark-sharp'} />} 
                                    color={'blue.600'}
                                    size={18}
                                />)}
                            </TouchableOpacity>
                        </Pressable>
                        ))}
                    </Box>
                    <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={14} mt={4} ml={2}>Total : {price}</Text>
                    <CustomInputIcon
                        control={control}
                        error={errors.dateTime}
                        fieldName="dateTime"
                        placeholder='dd/mm/yyyy'
                        material={'date-range'}
                        onpress={() => setOpen(true)}
                        bgColor='#E6F4F7'
                    />
                    {open && <DatePicker
                        modal
                        open={open}
                        date={date}
                        mode={'date'}
                        onConfirm={(date) => {
                            setValue('dateTime', moment(date).format('DD-MM-YYYY'))
                            setOpen(false)
                            onChangeDate(date)
                            SetSelectedDate(date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />}

                    {time&&<Text 
                        color={'#444444'} fontWeight={600} fontFamily="body" fontSize={18} my={4}
                    >Time</Text>}
                </>}  

                ListFooterComponent={()=><>
                    <CommonActionButton 
                        disabled={loading}
                        onPress={selectedTime && price ? Submit : errorToast}
                        bg={selectedTime ? {
                            linearGradient: {
                                colors: ['#0E9DAB', '#047AC3'],
                                start: [1, 0],
                                end: [1, 1]
                            }
                        } : 'gray.200'}
                        
                        width={100} mt={10} alignSelf='center' mb={4}
                    >
                        {loading ? <Spinner /> : <Text 
                            color={'#fff'} fontWeight={600} fontFamily="body" fontSize={18} 
                        >Pay Now</Text>}
                    </CommonActionButton>
                </>} 
            />

                
                



        </Box>
     

    </CustomBackground>

  )
}

export default BookingPayment

const styles = StyleSheet.create({
  
    image: {
        flex: 1,
       
    },
})
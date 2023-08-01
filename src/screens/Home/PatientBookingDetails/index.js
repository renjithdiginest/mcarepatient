import { Linking, StyleSheet, TouchableOpacity, useWindowDimensions, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomBackground from '../../../components/CustomBackground'
import { Box, FlatList, HStack, Icon, Text, Pressable, ScrollView, useToast, Spinner, VStack } from 'native-base'
import CommonHeading from '../../../components/CommonHeading'
import Ionicons from 'react-native-vector-icons/Ionicons'
import PatientDetails from './PatientDetails'
import CommonDetailsCard from '../../../components/CommonDetailsCard'
import CommonActionButton from '../../../components/CommonActionButton'
import TextAreaInput from '../../../components/TextAreaInput'
import CommonSelectInput from '../../../components/CommonSelectInput'
import AddedItemCard from './AddedItemCard'
import CommonTitle from '../../../components/CommonTitle'
import DocDownload from './DocDownload'
import { useDispatch, useSelector } from 'react-redux';
import { updateConsultation } from '../../../Redux/actions/homeActions'
import moment from 'moment'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { RESET, RESET_ERROR, SET_REFER_PROCEDURE, SET_REFER_SERVICE } from '../../../Redux/constants/homeConstants'
import { PDF_URL } from '../../../config/constants'
import CustomHeader from '../../../components/CustomHeader'
import reactotron from 'reactotron-react-native'
import { LOADING } from '../../../Redux/constants/authConstants'
import { Axios } from 'axios'
import customAxios from '../../../CustomeAxios'
import {
    checkMultiple,
    requestMultiple,
    openSettings,
    PERMISSIONS,
    RESULTS,
    Permission,
    PermissionStatus,
  } from 'react-native-permissions';


// TODO: Enable photo library permission when sharing view is done.
const platformPermissions = {
    ios: [
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.MICROPHONE,
      //PERMISSIONS.IOS.PHOTO_LIBRARY,
    ],
    android: [
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.RECORD_AUDIO,
      PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
      PERMISSIONS.ANDROID.READ_PHONE_STATE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ],
  };


const PatientBookingDetails = ({ navigation, route }) => {

    const dispatch = useDispatch();
    const toast = useToast()
    const { selectedServices, selectedProcedures, error, updateSuccess } = useSelector(state => state.home)

    const { activePatient, type } = route.params;
    const [refer, showRefer] = useState(false)
    const [proc, showProc] = useState(false)
    const [servReport, showServReport] = useState(false)
    const [procReport, showProcReport] = useState(false)

    const { user, loading } = useSelector(state => state.auth)


    const [referedService, setReferedServices] = useState([])
    const [referedProcedures, setReferedProcedures] = useState([])

    reactotron.log({activePatient, user})




    const { width, height } = useWindowDimensions()

    const [showStatus, setShowStatus] = useState("")

    const schema = yup.object({
        consultation_summary: yup.string().required('Required'),
        status: yup.string().required("Required"),

    })


    const { control, handleSubmit, formState: { errors }, setValue, setError } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            consultation_summary: activePatient?.consultation_summary,
            status: false
        }
    });

    AppointStatus = [
        {
            _id: '1',
            Name: 'Completed'
        },
        {
            _id: '2',
            Name: 'Pending Review'
        },
    ]

    const removeAddedService = (index, serIndex) => {
        // reactotron.log({index})
        let findSer = selectedServices[index];

        let filter = findSer.services.filter((ser, i) => i !== serIndex);

        if (filter.length > 0) {
            findSer.services = filter
            selectedServices[index] = findSer

            dispatch({
                type: SET_REFER_SERVICE,
                payload: [...selectedServices]
            })
        }
        else {
            selectedServices.splice(index, 1);
            dispatch({
                type: SET_REFER_SERVICE,
                payload: [...selectedServices]
            })
        }
    };

    const removeAddedProcedure = (index, proIndex) => {
        let findPro = selectedProcedures[index];

        let filter = findPro.procedures.filter((ser, i) => i !== proIndex);

        if (filter.length > 0) {
            findPro.procedures = filter
            selectedProcedures[index] = findPro

            dispatch({
                type: SET_REFER_PROCEDURE,
                payload: [...selectedProcedures]
            })
        }
        else {
            selectedProcedures.splice(index, 1);
            dispatch({
                type: SET_REFER_PROCEDURE,
                payload: [...selectedProcedures]
            })
        }
    };

    useEffect(() => {
        if (error) {
            toast.show({
                title: 'Error',
                description: error
            })
            dispatch({
                type: RESET_ERROR
            })
        }
        if (updateSuccess) {

            toast.show({
                title: 'Updated',
            })

            dispatch({
                type: RESET
            })

            navigation.goBack()

        }
    }, [error, updateSuccess])


    const onConfirm = (data) => {

        let servicess = [];
        selectedServices?.map(ser => {
            let serId = ser?.services?.map(se => se?._id)
            servicess.push({
                ...ser,
                services: serId
            })
        })


        let proceduress = [];
        selectedProcedures?.map(pro => {
            let proId = pro?.procedures.map(proce => proce?._id)
            proceduress.push({
                ...pro,
                procedures: proId
            })
        })

        //reactotron.log({services})

        let datas = {
            booking_id: activePatient?._id,
            consultation_summary: data.consultation_summary,
            patient_id: activePatient?.patient_id,
            doctor_id: activePatient?.doctor_id,
            services: servicess.length > 0 ? servicess : null,
            procedures: proceduress.length > 0 ? proceduress : null,
            status: showStatus === "1" ? "Completed" : "Pending Review"

        }

        //reactotron.log({datas})
        dispatch(updateConsultation(datas))
    }


    useEffect(() => {


        return () => {
            dispatch({
                type: SET_REFER_SERVICE,
                payload: []
            })
            dispatch({
                type: SET_REFER_PROCEDURE,
                payload: []
            })
        }
    }, [])


    useEffect(() => {
        if (activePatient) {
            savedServices()
            savedProcedures()
        }
    }, [activePatient])


    const savedServices = () => {

        const services = []
        activePatient?.referral?.map(refer => {
            if (refer?.type === "services") {
                refer?.service_id?.map(ser => {
                    services.push(ser)
                })

            }
        })

        setReferedServices(services)
    }

    const savedProcedures = () => {

        const services = []
        activePatient?.referral?.map(refer => {
            if (refer?.type === "procedure") {
                refer?.procedure_id?.map(ser => {
                    services.push(ser)
                })

            }
        })

        setReferedProcedures(services)
    }


    const startMeeting = async() => {
        if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
            return;
          }
      
          const permissions = platformPermissions[Platform.OS];
          let blockedAny = false;
          let notGranted= [];
      
          checkMultiple(permissions).then(
            (statuses) => {
              permissions.map((p) => {
                const status = statuses[p];
                if (status === RESULTS.BLOCKED) {
                  blockedAny = true;
                } else if (status !== RESULTS.GRANTED) {
                  notGranted.push(p);
                }
              });
              notGranted.length && requestMultiple(notGranted);
              blockedAny && openSettings();
            }
        );
        if(notGranted?.length === 0){
            dispatch({
                type: LOADING,
                payload: true
            })

            try {
                let data = {
                    sessionName : activePatient?.zoomDetails?.sessionName,
                    password: activePatient?.zoomDetails?.password,
                    role_type: 1
                }
        
                let res= await customAxios.post(`doctor/zoomTokenNew`, data);
    
                let token = res?.data?.data

                reactotron.log({token})
    
                navigation.navigate('Call', {
                    sessionName: activePatient?.zoomDetails?.sessionName,
                    displayName: user?.name,
                    sessionPassword: `${activePatient?.zoomDetails?.password}`,
                    roleType: 1,
                    sessionIdleTimeoutMins: '60',
                    token
                })
                //navigation.navigate('Join')
            } catch (error) {
                
            }
            finally{
                dispatch({
                    type: LOADING,
                    payload: false
                })
            }
        }
        else{
            reactotron.log({notGranted})
        }
        

        

        
        
    }

    const renderItems = ({ item }) => {
        return (
            <AddedItemCard
                key={item?.id}
                label={item?.name}
            />)
    }


    return (
        <CustomBackground>
            <CustomHeader />
            <Box mt={5} flex={1}>
                <CommonHeading label={`Booking ID :  ${activePatient?.booking_id}`} goBack={() => navigation.goBack()} px={5} />
                <ScrollView bg='#fff' flex={1} mt={8} borderTopRadius={40} px={7} showsVerticalScrollIndicator={false}>
                    <PatientDetails
                        onPress={() => navigation.navigate('PatientHistory', { activePatient })}
                        patientName={activePatient.name} patient_id={activePatient?.patient?.user_id}
                    />

                    <Text color={'#057FBF'} letterSpacing={1} fontSize={21} fontWeight={700} textAlign='center' mt={3}>Token No : {activePatient?.token}</Text>

                    <CommonDetailsCard
                        label={'Booked Date & Time'}
                        data={moment(activePatient?.date, "YYYY-MM-DD").format("DD-MM-YYYY") + ' ' + moment(activePatient?.time, 'h:mm').format('h:mm A')}
                        mt={2}
                    />

                    <CommonDetailsCard
                        mt={4}
                        label={'Remarks'}
                        data={activePatient?.remarks}
                    />

                    <VStack mt={4}>
                        <Text color={'#444444'} fontWeight={700} fontFamily="body" fontSize={17} >Attachments</Text>
                        {activePatient?.attachment && activePatient?.attachment?.map((atta, i) => (
                            <DocDownload mt={1} key={i} docName={atta?.name} onPress={() => navigation.navigate("viewpdf", { url: `${PDF_URL}${atta?.image}` })} />
                        ))}
                    </VStack>


                    <TextAreaInput
                        editable={type !== 'today' ? false : true}
                        control={control}
                        error={errors.consultation_summary}
                        fieldName="consultation_summary"
                        label={'Consultation Remarks'}
                        borderRadius={30}

                    />


                    {activePatient?.status !== "Completed" && type === "today" && <CommonTitle label={'Refer Service'} mt={4} />}
                    {referedService?.length > 0 && <TouchableOpacity onPress={() => showRefer(!refer)}>
                        <HStack
                            my={1.5} alignItems='center' bg='blue.100'
                            borderRadius={15} justifyContent={'space-between'} px={3}
                        >
                            <Text fontSize={14} fontWeight={600} color='#000' py={3}>Refered Services</Text>
                        </HStack>
                    </TouchableOpacity>}
                    {refer && <FlatList
                        data={referedService}
                        keyExtractor={(item, index) => `${index}${item?.id}`}
                        renderItem={renderItems}
                        pt={2}
                    />}

                    {selectedServices?.map((data, index) => (
                        data?.services?.map((ser, i) => (
                            <AddedItemCard
                                key={ser?._id}
                                label={ser?.name}
                                removeItem={() => removeAddedService(index, i)}
                            />
                        ))
                    ))}
                    {activePatient?.service_reports?.length > 0 && <TouchableOpacity onPress={() => showServReport(!servReport)}>
                        <HStack
                            my={1.5} alignItems='center' bg='blue.100'
                            borderRadius={15} justifyContent={'space-between'} px={3}
                        >
                            <Text fontSize={14} fontWeight={600} color='#000' py={3}>Service Reports</Text>
                        </HStack></TouchableOpacity>}
                    {servReport && activePatient?.service_reports?.map((report, index) => (
                        <DocDownload mt={1} key={index} docName={report?.service_id?.map(proc => proc?.name).join(',')} onPress={() => navigation.navigate("viewpdf", { url: `${PDF_URL}${report?.attachment}` })} />
                    ))}

                    {activePatient?.status !== "Completed" && type === "today" && <CommonActionButton width={70} height={35} mt={1} onPress={() => navigation.navigate('ReferService')}>
                        <Text color={'#fff'} fontFamily='body' fontWeight={600} letterSpacing={0.5} fontSize={15} >+ ADD</Text>
                    </CommonActionButton>}

                    {activePatient?.status !== "Completed" && type === "today" && <CommonTitle label={'Refer Procedure'} mt={4} />}
                    {referedProcedures?.length > 0 && <TouchableOpacity onPress={() => showProc(!proc)}>
                        <HStack
                            my={1.5} alignItems='center' bg='blue.100'
                            borderRadius={15} justifyContent={'space-between'} px={3}
                        >
                            <Text fontSize={14} fontWeight={600} color='#000' py={3}>Refered Procedures</Text>
                        </HStack>
                    </TouchableOpacity>}
                    {proc && <FlatList
                        data={referedProcedures}
                        keyExtractor={(item, index) => `${index}${item?.id}`}
                        renderItem={renderItems}
                        pt={2}
                    />}
                    {selectedProcedures?.map((data, index) => (
                        data?.procedures?.map((pro, i) => (
                            <AddedItemCard
                                key={pro?._id}
                                label={pro?.name}
                                removeItem={() => removeAddedProcedure(index, i)}
                            />
                        ))
                    ))}

                    {activePatient?.procedure_reports?.length > 0 && <TouchableOpacity onPress={() => showProcReport(!procReport)}>
                        <HStack
                            my={1.5} alignItems='center' bg='blue.100'
                            borderRadius={15} justifyContent={'space-between'} px={3}
                        >
                            <Text fontSize={14} fontWeight={600} color='#000' py={3}>Procedure Reports</Text>
                        </HStack></TouchableOpacity>}
                    {procReport && activePatient?.procedure_reports?.map((report, index) => (
                        <TouchableOpacity key={index} onPress={() => navigation.navigate("viewpdf", { url: `${PDF_URL}${report?.attachment}` })}>
                            <AddedItemCard
                                label={report?.procedures_id?.map(proc => proc?.name).join(',')}
                            />
                        </TouchableOpacity>
                    ))}

                    {activePatient?.status !== "Completed" && type === "today" && <CommonActionButton width={70} height={35} mt={1} onPress={() => navigation.navigate('ReferProcedure')}>
                        <Text color={'#fff'} fontFamily='body' fontWeight={600} letterSpacing={0.5} fontSize={15} >+ ADD</Text>
                    </CommonActionButton>}

                    {activePatient?.status !== "Completed" && type === "today" && <>


                        <CommonSelectInput
                            control={control}
                            error={errors.status}
                            fieldName="status"

                            label={'Appointment Status'}
                            mt={4}
                            selectedValue={showStatus}
                            changeValue={(value) => {
                                setShowStatus(value)
                                setValue('status', value)
                                setError('status', '')
                            }}
                            optlabel={"Name"}
                            optValue={"_id"}
                            options={AppointStatus}
                        />

                        <HStack justifyContent={"space-around"}>
                        {activePatient?.appointmenttype === "Online" && <CommonActionButton
                            onPress={startMeeting}
                            width={100} my={10} alignSelf='center'
                        >
                            <Text color={'#fff'} fontFamily='body' fontWeight={600} letterSpacing={0.5} fontSize={15} >Join</Text>
                        </CommonActionButton>}
                        <CommonActionButton
                            onPress={handleSubmit(onConfirm)}
                            width={100} my={10} alignSelf='center'
                        >
                            <Text color={'#fff'} fontFamily='body' fontWeight={600} letterSpacing={0.5} fontSize={15} >Update</Text>
                        </CommonActionButton>
                        </HStack>
                        </>}
                </ScrollView>

            </Box>


        </CustomBackground>
    )
}

export default PatientBookingDetails

const styles = StyleSheet.create({})
import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Box, HStack, Text, Icon, Image, Pressable, Skeleton, Button, VStack, ScrollView } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Divider from './Divider'
import { useDispatch, useSelector } from 'react-redux';
import { PDF_URL } from '../../../../config/constants'
import CommonModal from '../../../../components/CommonModal'
import CommonActionButton from '../../../../components/CommonActionButton'
import { navigationRef } from '../../../../Navigations/RootNavigation'
import AddedItemCard from '../AddedItemCard'
import reactotron from 'reactotron-react-native'
import DocDownload from '../DocDownload'
import { useNavigation } from '@react-navigation/native'


const DoctorDetailsCard = ({item}) => {

    const { loading } = useSelector(state => state.auth)
    const navigation = useNavigation()


    const [showRemarks, setShowRemarks] = useState(false)
    const [showProcedure, setShowProcedure] = useState(false)
    const [showServices, setShowServices] = useState(false)

    const [showModal, setShowModal] = useState(false)

    const [downloadFile, setDownloadFile] = useState('')

    reactotron.log({item})


    let path = `${PDF_URL}${downloadFile}`

    // reactotron.log({path})


    // const DownloadPdf = () => {
    //     setShowModal(false)
    //     RNFetchBlob.config({
    //         addAndroidDownloads : {
    //             useDownloadManager : true, // <-- this is the only thing required
    //             // Optional, override notification setting (default to true)
    //             notification : false,
    //             // Optional, but recommended since android DownloadManager will fail when
    //             // the url does not contains a file extension, by default the mime type will be text/plain
    //             mime : 'text/plain',
    //             description : 'File downloaded by download manager.'
    //         }
    //     })
    //     .fetch('GET', `${PDF_URL}${downloadFile}`)
    //     .then((resp) => {
    //     // the path of downloaded file
    //         resp.path()
    //     })
    // }


    return (
        <>
        <HStack  alignItems='center' mt={4}>
            <Icon 
                as={<Ionicons/>} 
                name='calendar' 
                size={15} color='#047AC3'
            />
            <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={13} ml={2}>{item?.date} {item?.time}</Text>
        </HStack>
        <Box bg={"#fff"} borderRadius={30} pt={2} pb={3} mt={1}>
            <HStack px={4} >
                <Image
                    width={75} height={75} borderRadius={20}
                    source={require('../../../../images/user.jpeg')} alt='img' shadow={5}
                />
                <Box ml={3} justifyContent='space-between'py={1}>
                    <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={15}>{item?.doctor_details?.name}</Text>
                    <Text color={'#444444'} letterSpacing={1} fontSize={12}>{item?.doctor_details?.designation}</Text>
                    <Text color={'#444444'} letterSpacing={1} fontSize={12}>{item?.doctor_details?.qualifications}</Text>
                </Box>
            </HStack>
      
            <Pressable 
                onPress={()=>setShowRemarks(!showRemarks)}
                borderBottomWidth={1} borderColor='#0000000D' pb={2} mt={3} 
            >
                <HStack 
                    px={4} alignItems='center' 
                    justifyContent={'space-between'} 
                >
                    <Text color={'#000'} fontWeight={600} letterSpacing={1} fontSize={15}>Remarks</Text>
                    <Icon 
                        
                        as={<Ionicons/>} 
                        name={showRemarks ? "chevron-up-circle" : 'chevron-down-circle' } 
                        size={22} color='#047AC3'
                    />
                </HStack>
              
                {showRemarks&&<Box bg='#0000000D' borderRadius={15} m={3} p={3}>
                    <Text color={'#000'} fontWeight={600} letterSpacing={1} fontSize={12}>{item?.remarks}</Text>
                </Box>}
            </Pressable>
            <Pressable borderBottomWidth={1} borderColor='#0000000D' pb={2} mt={3} >
                <HStack 
                    px={4} alignItems='center' 
                    justifyContent={'space-between'} 
                >
                    <Text flex={1} color={'#000'} fontWeight={600} letterSpacing={1} fontSize={15} onPress={()=>setShowProcedure(!showProcedure)}>Procedures & Services</Text>
                    <Icon 
                        onPress={()=>setShowProcedure(!showProcedure)}
                        as={<Ionicons/>} 
                        name={showProcedure ? "chevron-up-circle" : 'chevron-down-circle' } 
                        size={22} color='#047AC3'
                    />
                </HStack>
                {showProcedure && 
                <Box px={5}>
                    
                    <AddedItemCard
                        label={"Referals"}
                    />
                    {item?.referral?.map((ref, index) => {
                        reactotron.log({ref})
                        return(
                        <Text key={index} py={1} color={'#000'} fontWeight={600} letterSpacing={1} fontSize={13}>{ ref?.type === "services" ? ref?.service_id?.map(ser => ser?.name).join(',') : ref?.procedure_id?.map(ser => ser?.name).join(',')}</Text>
                    )})}
                    <AddedItemCard
                        label={"Service Bookings"}
                    />
                    {item?.service_booking?.map((ref, index) => {
                        return(
                        <Text key={index} py={1} color={'#000'} fontWeight={600} letterSpacing={1} fontSize={13}>{ ref?.service_id?.map(ser => ser?.name).join(',') }</Text>
                    )})}

                    <AddedItemCard
                        label={"Procedure Bookings"}
                    />
                    {item?.procedure_booking?.map((ref, index) => {
                        return(
                        <Text key={index} py={1} color={'#000'} fontWeight={600} letterSpacing={1} fontSize={13}>{ ref?.procedure_id?.map(ser => ser?.name).join(',') }</Text>
                    )})}
                    
                    
                   
                </Box>}
            </Pressable>
            <Pressable pb={1} mt={2}>
                <HStack 
                    px={4} alignItems='center' 
                    justifyContent={'space-between'} 
                >
                    <Text flex={1} color={'#000'} fontWeight={600} letterSpacing={1} fontSize={15} onPress={()=>setShowServices(!showServices)}>Reports</Text>
                    <Icon 
                        onPress={()=>setShowServices(!showServices)}
                        as={<Ionicons/>} 
                        name={showServices ? "chevron-up-circle" : 'chevron-down-circle' } 
                        size={22} color='#047AC3'
                    />
                </HStack>
                

                {showServices&&<Box borderRadius={25} p={3}>

                    {item?.procedure_reports !=0 && <Box bg='#0000000D' borderRadius={15} p={2} mb={2}>  
                        <AddedItemCard
                            label={"Procedure Reports"}
                        />
                        <VStack 
                            alignItems='center' 
                            pb={1} ml={2}
                        >
                            {item?.procedure_reports?.map((data, i) => (
                                <DocDownload mt={1} key={i} docName={data?.procedures_id.map(proc => proc.name).join(',')} onPress={() => navigation.navigate("viewpdf", { url: `${PDF_URL}${data?.attachment}` }) }  />
                            
                            ))}
                            
                        </VStack>
                    </Box>}   
                    {item?.service_reports !=0 && <Box bg='#0000000D' borderRadius={15} p={2} mb={2}>  
                        <AddedItemCard
                            label={"Service Reports"}
                        />
                        <VStack 
                            alignItems='center' 
                            pb={1} ml={2}
                        >
                            {item?.service_reports?.map((data, i) => (
                                <DocDownload mt={1} key={i} docName={data?.service_id.map(ser => ser.name).join(',')} onPress={() => navigation.navigate("viewpdf", { url: `${PDF_URL}${data?.attachment}` }) }  />
                            
                            ))}
                            
                        </VStack>
                    </Box>}     
                </Box>}
            </Pressable>
            
            
            
       
        </Box>

        <Divider/>

        <CommonModal  isOpen={showModal} >
            <Text fontSize={17} color={'#000'} mt={2} letterSpacing={0.5}>Are you sure to download?</Text>
            <HStack justifyContent={'space-evenly'} my={4}>
                <CommonActionButton 
                    // onPress={ViewPdf}
                    onPress={()=>{setShowModal(false), navigationRef.navigate('ViewPdf',{ path: path })}}
                >
                    
                    <Text color={'#fff'} fontWeight={600}>YES</Text>
                </CommonActionButton>
                <CommonActionButton 
                    onPress={()=>setShowModal(false)}
                >
                    <Text color={'#fff'} fontWeight={600}>NO</Text>
                </CommonActionButton>
            </HStack>
            
        </CommonModal>
        </>
    )
}

export default DoctorDetailsCard

const styles = StyleSheet.create({})
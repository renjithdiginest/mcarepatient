import { StyleSheet, useWindowDimensions, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Box, HStack, Image, ScrollView, Text, useToast, Icon} from 'native-base'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux'
import CustomBackground from '../../../../components/CustomBackground'
import CommonHeading from '../../../../components/CommonHeading';
// import { RESET_ERROR } from '../../Redux/constants/authConstants'
// import { navigate } from '../../Navigations/RootNavigation'
// import { useNavigation } from '@react-navigation/native'
// import { CONSULTATION_DOC_AVAILBILITY_SUCCESS } from '../../Redux/constants/consultationConstants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonInput from '../../../../components/CommonInput';
import CustomButton from '../../../../components/CustomButton';
import RescheduleModal from '../../../Online/RescheduleModal';
import CommonDetailsCard from '../../../../components/CommonDetailsCard';
import moment from 'moment/moment'


const BookedProcedure = ({ navigation, route }) => {
    const { height } = useWindowDimensions()
    const { item } = route.params;
    const toast = useToast()
   
    const dispatch = useDispatch()
    const { consultationResheduled, error } = useSelector(state => state.consultation);

    const [showModal, setShowModal] = useState(false);

    const schema = yup.object({


    }).required();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({

        resolver: yupResolver(schema)
    });

    return (
        <CustomBackground>
            <Box px={5} mt={1}>
                <CommonHeading label={`Booking ID : FFD44`} goBack={() => navigation.goBack()} />
            </Box>
            <Box bg={'#fff'} mt={5} borderTopRightRadius={30} borderTopLeftRadius={30}>
                <ScrollView px={8} showsVerticalScrollIndicator={false}>
                    <Box mb={8}>
                    <HStack alignItems={'center'}  borderBottomColor='#0000000D' borderBottomWidth={1} pb={5} mt={2}>
                        <Image
                            width={90} height={90} borderRadius={25}
                            // source={{ uri:activeDoctor?.image }} 
                            source={require('../../../../images/user.jpeg')} 
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
                            
                            </Box>
                        </Box>
                    </HStack>
                        {/* <Box justifyContent={'center'} alignItems={'center'}>
                            <Text color={'#057FBF'} fontSize={22} fontWeight={'bold'} letterSpacing={1}>Token No : 2</Text>
                        </Box> */}

                        <Box py={5}>
                            <CommonDetailsCard
                                label={'Booked Date & Time'}
                                data={ `${moment(item?.updated_at).format('DD/MM/YYYY')} ${moment(item?.updated_at).format('hh:mm A')}` }
                            />
                            <CommonDetailsCard
                                label={'Service Fees'}
                                data={'250'}
                            />
                            <CommonDetailsCard
                                label={'Payment Status'}
                                data={'pending'}
                            />
                            <CommonDetailsCard
                                label={'Appointment Status'}
                                data={'Scheduled'}
                            />
                            
                           
                            <Box alignItems={'center'} py={3}>
                                <CustomButton selected={true} label={'Reschedule'} onPress={() => setShowModal(true)} />
                            </Box>

                        </Box>

                    </Box>

                </ScrollView>
                {showModal && <RescheduleModal 
                    showModal={showModal} setShowModal={setShowModal} 
                    // item={item} 
                />}
            </Box>

        </CustomBackground>
    )
}

export default BookedProcedure

const styles = StyleSheet.create({})
import React,{useState} from 'react'
import { ImageBackground, StyleSheet,useWindowDimensions } from "react-native";
import { Box, Text, Image, Button, FlatList, ScrollView, Pressable, HStack } from 'native-base'
import moment from 'moment'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CommonActionButton from '../../../../../../../components/CommonActionButton';
import TextAreaInput from '../../../../../../../components/TextAreaInput'
import CustomBackground from '../../../../../../../components/CustomBackground';
import CommonDetailsCard from '../../../../../../../components/CommonDetailsCard'


const BookedAppointMent = ({navigation}) => {
    
    const [currentTab, setCurrentTab] = useState(0)
    const [showStatus, setShowStatus] = useState("")

    const { width, height } = useWindowDimensions()

    const schema = yup.object({
		consultation_summary : yup.string().required('Required'),
        status : yup.string().required('Required'),
	}).required();

	const { control, handleSubmit, formState: { errors }, setValue ,setError} = useForm({
		resolver: yupResolver(schema)
	});


  return (
    
    <CustomBackground>
       
        <Box borderTopRadius={30} bg='#fff' mt={20} flex={1} p={5}>
            <ScrollView>
                <Box alignSelf={'center'} alignItems='center' mb={4}>
                    <Text color={'#444444'} fontFamily='body' fontWeight={600} letterSpacing={1.5} fontSize={25} >{'Appointment Booked'}</Text>
                    <Box height={1} bg='#057DC0' width={70}></Box>
                </Box>
              
                <Box borderBottomColor='#0000000D' borderBottomWidth={1} pb={5} alignItems='center'>
                    <Image
                        width={90} height={90} borderRadius={25}
                        source={require('../../../../../../../images/user.jpeg')} alt='img' shadow={5}
                    />
                    <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={19}>{'Dr. Shane Nigam'}</Text>
                    <Text color={'#444444'} fontWeight={400} letterSpacing={1} fontSize={14} >{'Senior Cardiologist'}</Text>
                    <Text color={'#444444'} fontWeight={400} letterSpacing={1} fontSize={15}>{'MBBS, BHMS'}</Text>
                    <Text color={'#057DC0'} fontWeight={700} letterSpacing={1} fontSize={18} mt={3}>{'Booking ID : 201615'}</Text>

                </Box>


                <CommonDetailsCard
                    mt={4}
                    label={'Appointment Type'}
                    data={'OP'}
                />
                <CommonDetailsCard
                    mt={4}
                    label={'Booked Date & Time'}
                    data={'21/06/2022 9:00 AM'}
                />
                <CommonDetailsCard
                    mt={4}
                    label={'Consulation Fees'}
                    data={'500'}
                />

                
            </ScrollView>



        </Box>
     

    </CustomBackground>

  )
}

export default BookedAppointMent

const styles = StyleSheet.create({
  
    image: {
        flex: 1,
       
    },
})
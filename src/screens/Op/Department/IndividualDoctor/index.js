import { StyleSheet, } from 'react-native'
import React from 'react'
import { Box, FlatList, HStack, ScrollView, Text, Image } from 'native-base'
import CustomBackground from '../../../../components/CustomBackground'
import CustomHead from '../CustomHead'
import CommonActionButton from '../../../../components/CommonActionButton'
import { useDispatch, useSelector } from 'react-redux';
import reactotron from '../../../../ReactotronConfig'


const IndividualDoctor = ({navigation}) => {

    const { activeDoctor } = useSelector(state => state.home);

    // reactotron.log({activeDoctor})


    
    return (
        <CustomBackground>

            <Box px={7}>
                <CustomHead 
                    onPress={()=>navigation.goBack()}
                    img={{ uri:activeDoctor?.image }}
                    label={activeDoctor?.name}
                    dept={activeDoctor?.designation}
                />
            </Box>

            <Box borderTopRadius={30} bg='#fff' mt={5} flex={1} p={8}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text color={'#057EC1'} fontFamily='body' fontWeight={700} letterSpacing={0.5} fontSize={25}>About</Text>
                    <HStack alignItems={'center'}  borderBottomColor='#0000000D' borderBottomWidth={1} pb={3} mt={3}>
                        <Image 
                            source={require('../../../../images/expert.png')} 
                            height={45}
                            width={45}
                            alt='name'
                        />
                        <Box ml={5}>
                            <Text color={'#444444'} fontFamily='body' fontWeight={700}  fontSize={13}>Specialization</Text>
                            <Text color={'#1C1C1C'} fontFamily='body' fontWeight={500} fontSize={12}>{activeDoctor?.specialization}</Text>
                        </Box>
                    </HStack>

                    <HStack alignItems={'center'}  borderBottomColor='#0000000D' borderBottomWidth={1} pb={5} mt={2}>
                        <Image 
                            source={require('../../../../images/doctor-svgrepo-com.png')} 
                            height={45}
                            width={45}
                            alt='name'
                        />
                        <Box ml={5}>
                            <Text color={'#444444'} fontFamily='body' fontWeight={700}  fontSize={13}>Area Of Expertise</Text>
                            <Text color={'#1C1C1C'} fontFamily='body' fontWeight={500} fontSize={12}>{activeDoctor?.expertise}</Text>
                        </Box>
                    </HStack>
                    <HStack alignItems={'center'} borderBottomColor='#0000000D' borderBottomWidth={1} pb={5} mt={2}>
                        <Image 
                            source={require('../../../../images/diploma.png')} 
                            height={45}
                            width={45}
                            alt='name'
                        />
                        <Box ml={5}>
                            <Text color={'#444444'} fontFamily='body' fontWeight={700}  fontSize={13}>Qualifications</Text>
                            <Text color={'#1C1C1C'} fontFamily='body' fontWeight={500} fontSize={12}>{activeDoctor?.qualifications}</Text>
                        </Box>
                    </HStack>
                </ScrollView>


                <CommonActionButton width={150} alignSelf='center' my={2} onPress={()=>navigation.navigate('BookAppointment')}>
                    <Text color={'#fff'} fontFamily='body' fontWeight={700}  fontSize={13}>Book Appointment</Text>
                </CommonActionButton>

            </Box>


        </CustomBackground>
    )
}

export default IndividualDoctor

const styles = StyleSheet.create({})
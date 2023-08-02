import { StyleSheet, useWindowDimensions, View, ImageBackground } from 'react-native'
import React from 'react'
import CustomBackground from '../../../../components/CustomBackground'
import { Box, HStack, Image, Pressable, ScrollView, Text } from 'native-base'
import CustomBlogHeader from '../../../Op/BlogView/CustomBlogHeader'
import CustomButton from '../../../../components/CustomButton'
import reactotron from 'reactotron-react-native'

const DoctorDetails = ({ navigation, route }) => {
    const { height } = useWindowDimensions()
    const { profile } = route.params;
    reactotron.log({ profile })
    return (
        <Box>
            <ImageBackground source={{uri:profile?.image}} resizeMode='cover'
                blurRadius={18} >
                <CustomBlogHeader onPress={() => navigation.openDrawer()}>DoctorDetails</CustomBlogHeader>
                <Box px={5} mt={5} h={'30%'} mb={5}>
                    <Pressable
                        alignItems={'center'} zIndex={5} justifyContent='center' borderRadius={8} bg='#fff' width={10} height={10} mr={2} shadow={1} position={'absolute'} left={5} onPress={() => navigation.goBack()}>
                        <Image source={require('../../../../images/left.png')} alt='img' mr={1} />
                    </Pressable>
                    <Box alignItems={'center'} >
                        <Image source={{uri:profile?.image}} h={120} w={120} alt='name' borderRadius={15} />
                        <Text textAlign='center' fontWeight={700} fontSize={20} mt={0.5}>{profile?.name}</Text>
                        <Text textAlign='center'  fontSize={16} mt={0.5} color={'#fff'}>{profile?.departmentName}</Text>
                    </Box>
                </Box >
            </ImageBackground>
            <ScrollView 
            height={'58%'}
            showsVerticalScrollIndicator={false} 
            bg={'#fff'} 
             borderTopLeftRadius={30} 
             borderTopRightRadius={30} px={5} mt={-5}>
              
                <Text mt={2} fontSize={18} fontWeight={'700'} letterSpacing={.5} color={'#0680BE'} mb={10}> About</Text>
                <HStack alignItems={'center'} borderBottomColor='#0000000D' borderBottomWidth={1} pb={5} >
                    <Image
                        source={require('../../../../images/expert.png')}
                        height={50}
                        width={50}
                        alt='name'
                    />
                    <Box ml={5}>
                        <Text color={'#444444'} fontFamily='body' fontWeight={700} fontSize={13}>Specialization</Text>
                        <Text color={'#1C1C1C'} fontFamily='body' fontWeight={500} fontSize={12}>{profile?.specialization}</Text>
                    </Box>
                </HStack>
                <HStack alignItems={'center'} borderBottomColor='#0000000D' borderBottomWidth={1} pb={5} mt={2}>
                    <Image
                        source={require('../../../../images/doctor-svgrepo-com.png')}
                        height={50}
                        width={50}
                        alt='name'
                    />
                    <Box ml={5}>
                        <Text color={'#444444'} fontFamily='body' fontWeight={700} fontSize={13}>Area Of Expertise</Text>
                        <Text color={'#1C1C1C'} fontFamily='body' fontWeight={500} fontSize={12}>{profile?.expertise}</Text>
                    </Box>
                </HStack>
                <HStack alignItems={'center'} borderBottomColor='#0000000D' borderBottomWidth={1} pb={5} mt={2}>
                    <Image
                        source={require('../../../../images/diploma.png')}
                        height={50}
                        width={50}
                        alt='name'
                    />
                    <Box ml={5}>
                        <Text color={'#444444'} fontFamily='body' fontWeight={700} fontSize={13}>Qualifications</Text>
                        <Text color={'#1C1C1C'} fontFamily='body' fontWeight={500} fontSize={12}>{profile?.qualifications}</Text>
                    </Box>
                </HStack>

                <Box mt={3} alignItems={'center'}  py={2}>
                    <CustomButton label={'Confirm'} selected={true} wid={100} onPress={() => navigation.navigate('BookAppointmentReport',{
                        item:profile
                    })} />
                </Box>
            </ScrollView>
        </Box>
    )
}

export default DoctorDetails

const styles = StyleSheet.create({

})
import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React from 'react'
import CustomBackground from '../../../components/CustomBackground'
import CustomBlogHeader from '../../Op/BlogView/CustomBlogHeader'
import { Box, HStack, Image, ScrollView, Text, TextArea } from 'native-base'
import CommonHeading from '../../../components/CommonHeading'
import { reactotronRedux } from 'reactotron-redux'
import reactotron from '../../../ReactotronConfig'
import { toUpper } from 'lodash'
import { IMG_URL } from '../../../config/constants'

const ReportView = ({ navigation, route }) => {
    const { height } = useWindowDimensions()

    const { item } = route.params;
    reactotron.log({ item })
    return (
        <CustomBackground>
            <CustomBlogHeader />
            <Box px={5} mt={1}>
                <CommonHeading label={`Booking ID : ${item?.booking_id}`} goBack={() => navigation.goBack()} />
            </Box>
            <ScrollView showsVerticalScrollIndicator={false} bg={'#fff'} flex={1} mt={8} borderTopLeftRadius={30} borderTopRightRadius={30} px={5}>
                <HStack alignItems={'center'} px={5} mt={3}>
                    <Image
                        flex={.30}
                        source={{ uri: `${item?.baseurl}${item?.doctor_details?.image}` }}
                        height={90}
                        width={90}
                        alt='name'
                        borderRadius={10}

                    />
                    <Box ml={5} flex={.70}>
                        <Text color={'#444444'} fontFamily='body' fontWeight={700} fontSize={18}>{item?.doctor_details?.name}</Text>
                        <Text color={'#1C1C1C'} fontFamily='body' fontWeight={500} fontSize={12}>{item?.doctor_details?.designation}</Text>
                        <Text color={'#1C1C1C'} fontFamily='body' fontWeight={500} fontSize={16} mt={2}>{toUpper(item?.doctor_details?.qualifications)}</Text>
                    </Box>
                </HStack>
                <Box alignItems={'center'} mt={3}>
                    <Text color={'#057DC0'} fontWeight={'bold'} letterSpacing={1} fontSize={18}>Booking ID :{item?.booking_id}</Text>
                </Box>
                <Box px={3}>
                    <Text mt={5} fontWeight={'700'} letterSpacing={1} fontSize={16}>Remarks</Text>
                    <Text h={100} bg={'#0000000D'} borderRadius={10} mt={'2'} px={2}>{item?.remarks}</Text>
                </Box>
                {item?.attachment &&
                    <Box px={3}>
                        <Text mt={5} fontWeight={'700'} letterSpacing={1} fontSize={16}>Upload Reports</Text>
                        {item?.attachment?.map((res, index) => (
                            <TouchableOpacity key={index} onPress={() => navigation.navigate("viewpdf", { url: `${IMG_URL}${res?.image}` })}>
                            <Text h={50} bg={'#0000000D'} borderRadius={10} mt={'2'} px={2} key={res?.id} alignItems={'center'} justifyContent={'center'} p={2}>{res?.name}</Text>
                            </TouchableOpacity>
                        ))}

                    </Box>}
                <Box px={3}>
                    <Text mt={5} fontWeight={'700'} letterSpacing={1} fontSize={16}>Doctor's Remarks</Text>
                    <Text h={100} bg={'#0000000D'} borderRadius={10} mt={'2'} px={2}>Text</Text>
                </Box>
            </ScrollView>
        </CustomBackground>
    )
}

export default ReportView

const styles = StyleSheet.create({})
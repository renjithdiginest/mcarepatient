import { StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'

import { Box, HStack, Icon, ScrollView, Spinner, Text, useToast } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import reactotron from 'reactotron-react-native'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import CommonHeading from '../../../components/CommonHeading'
import CustomBlogHeader from './CustomBlogHeader'
import { getSingleBlogs } from '../../../Redux/actions/homeActions'
import { LOADING } from '../../../Redux/constants/authConstants'
import customAxios from '../../../CustomeAxios'
import { IMG_URL } from '../../../config/constants'

const BlogSingleView = ({ route, navigation }) => {
    const toast = useToast()
    const dispatch = useDispatch()
    const { loading } = useSelector(state => state.auth);
    const { height, width } = useWindowDimensions()
    const [apiRes, setApiRes] = useState(null)
    const { itemId } = route.params;

    reactotron.log({ itemId })



    return (
        <>
            <ImageBackground source={{ uri: `${IMG_URL}${itemId?.attachment}` }} style={{ height: height / 2.5 }} >
                <CustomBlogHeader onPress={() => navigation.openDrawer()} />
                <Box px={5} mt={2}>
                    <CommonHeading goBack={() => navigation.goBack()} />
                </Box>
            </ImageBackground>
            <ScrollView showsVerticalScrollIndicator={false} bgColor={'#fff'} mt={-5} px={15} borderTopRadius={30}>
                <Box mt={5}>
                    <Text fontWeight={'bold'} fontSize={20} color={'#0680BE'} >{itemId?.subject}</Text>
                    <Text fontSize={14} color={'#444444'} opacity={40} >{moment(itemId?.created_at).format('DD/MM/YYYY hh:mm A')}
                    </Text>
                </Box>
                <Text fontSize={14} textAlign="justify">
                    {itemId?.content}
                </Text>
                <HStack mt={10} alignItems={'center'} mb={22}>
                    <Icon as={<Ionicons />} name={"person"} size={5} color={'#057DC1'} />
                    <Text px={3}>Author :{itemId?.created_by} </Text>
                </HStack>
            </ScrollView>
        </>
    )
}

export default BlogSingleView

const styles = StyleSheet.create({})
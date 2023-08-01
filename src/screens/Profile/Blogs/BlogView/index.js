import { StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import React,{useEffect} from 'react'
import CustomBlogHeader from '../../../../components/CustomBlogHeader'
import imgess from "../../../../images/docter.jpg"
import { Box, HStack, Icon, ScrollView, Text } from 'native-base'
import CommonHeading from '../../../../components/CommonHeading'
import Ionicons from 'react-native-vector-icons/Ionicons'
import reactotron from 'reactotron-react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getSingleBlogs } from '../../../../Redux/actions/profileActions'
import moment from 'moment'
import { IMG_URL } from '../../../../config/constants'
const BlogSingleView = ({ route ,navigation }) => {

    const dispatch =useDispatch()

    const { height, width } = useWindowDimensions()
    const { itemId } = route.params;

reactotron.log({itemId})

    

    return (
        <>
            <ImageBackground source={{uri:`${IMG_URL}${itemId?.attachment}`}} style={{ height: height / 2.5 }} >
                <CustomBlogHeader />
                <Box px={5} mt={2}>
                    <CommonHeading goBack={() => navigation.goBack()} />
                </Box>


            </ImageBackground>
            <ScrollView showsVerticalScrollIndicator={false} bgColor={'#fff'} mt={-5} px={15} borderTopRadius={30}>
                <Box mt={5}>
                    <Text fontWeight={'bold'} fontSize={20} color={'#0680BE'} >{itemId?.subject}</Text>
                    <Text fontSize={14} color={'#444444'} opacity={40} >{ moment( itemId?.created_at).format('DD/MM/YYYY hh:mm A')}
                     </Text>
                </Box>
                
                    <Text fontSize={14} >
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
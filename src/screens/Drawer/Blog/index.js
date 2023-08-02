import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React,{useEffect} from 'react'
import CustomBackground from '../../../components/CustomBackground'
import CommonHeading from '../../../components/CommonHeading'
import BlogCard from './BlogCard'
import { Box, FlatList } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../../../Redux/actions/homeActions';
const Blog = ({navigation}) => {
    const dispatch =useDispatch()

    
    const {  blogList } = useSelector(state => state.home);
	const { height, width } = useWindowDimensions()
	const renderItems = ({item}) => {
		return (
			<BlogCard
				item={item}
			/>
		)
	}

    useEffect(() => {
      dispatch(getBlogs())
    }, [])
    

  return (
    <CustomBackground>
    <Box px={6}>
        <CommonHeading label={'Blogs'} goBack={() => navigation.goBack()} />

        <Box height={height / 1.4} my={3}>
            <FlatList
                data={blogList}
                keyExtractor={(item) => item?._id}
                renderItem={renderItems}
                showsVerticalScrollIndicator={false}
                pt={2}
            
            />
        </Box>

    </Box>
</CustomBackground>
  )
}

export default Blog

const styles = StyleSheet.create({})
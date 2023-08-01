import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React,{useEffect} from 'react'
import CustomBackground from '../../../components/CustomBackground'
import CommonHeading from '../../../components/CommonHeading'
import { Box, FlatList } from 'native-base'
import BlogCard from './BlogCard'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../../../Redux/actions/profileActions'


const Blogs = ({ navigation }) => {
	const dispatch =useDispatch()
	const {error ,blogList} = useSelector(state => state.profile);

	const { height, width } = useWindowDimensions()



useEffect(() => {
 dispatch(getBlogs())
}, [])


	const renderItems = ({item}) => {
		return (
			<BlogCard
				item={item}
			/>
		)
	}



	return (
		<CustomBackground>
			<Box px={6}>
				<CommonHeading label={'Blogs'} goBack={() => navigation.goBack()} />

				<Box height={height / 1.4} my={3}>
					<FlatList
						data={blogList}
						keyExtractor={(item) => item._id}
						renderItem={renderItems}
						showsVerticalScrollIndicator={false}
						pt={2}
					/>
				</Box>

			</Box>
		</CustomBackground>
	)
}

export default Blogs

const styles = StyleSheet.create({})
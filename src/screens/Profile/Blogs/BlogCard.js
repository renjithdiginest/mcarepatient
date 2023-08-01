import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import reactotron from 'reactotron-react-native'
import { Box, Text, Image, Pressable, VStack, Skeleton } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { IMG_URL } from '../../../config/constants'


const BlogCard = ({ item }) => {


  const navigation = useNavigation()
  // const { loading, error } = useSelector(state => state.auth);
  return (
    <TouchableOpacity onPress={() => navigation.navigate('blogsView', {
      itemId: item
    })}>

      <Box mb={3} h={220} bg={'#ffff'} borderRadius={15} >
        {/* <Skeleton h={130} > */}
        <Image
          height={130} borderRadius={15}
          source={{ uri:`${IMG_URL}${item?.attachment}` }} alt='img' shadow={5}
        />
        <VStack px={1}>
          <Text fontSize={18} fontWeight={'bold'} isTruncated>{item?.subject}</Text>
          <Text fontSize={14} numberOfLines={2} >{item?.content}</Text>
        </VStack>
      </Box>
    </TouchableOpacity>
  )
}

export default BlogCard

const styles = StyleSheet.create({})
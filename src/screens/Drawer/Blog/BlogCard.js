import { StyleSheet, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import reactotron from 'reactotron-react-native'
import { Box, Text, Image, Pressable, VStack, Skeleton } from 'native-base'
import blogimg from '../../../images/docter.jpg'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { IMG_URL } from '../../../config/constants'
const BlogCard = ({ item }) => {
  const navigation = useNavigation()

  reactotron.log({ item })
  return (

    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('blogsView', {
        itemId: item
      })}
     
    >

      <Box mb={3} h={220} bg={'#ffff'} borderRadius={15} >
        {/* <Skeleton h={130} > */}
        <Image
          height={130} borderRadius={15}
          source={{uri:`${IMG_URL}${item?.attachment}` }} alt='img' shadow={5}
        />
        {/* </Skeleton> */}

        <VStack px={1}>
          <Text fontSize={18} fontWeight={'bold'}>{item?.subject}</Text>
          <Text fontSize={14} numberOfLines={2} >{item?.content}</Text>
        </VStack>
      </Box>

    </TouchableOpacity >
  )
}

export default BlogCard

const styles = StyleSheet.create({
  buttonStyle: {

    borderRadius: 15
  },
})
import { StyleSheet, ImageBackground, useWindowDimensions, TouchableOpacity } from 'react-native'
import React, { useCallback, memo } from 'react'
import { Box, FlatList, HStack, Pressable, Text, Image } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { IMG_URL } from '../../config/constants'


const BlogSlider = ({ item }) => {

    const navigation = useNavigation();


    const { width, height } = useWindowDimensions()


    const blogView = useCallback(() => {
        navigation.navigate('blogsView', { itemId: item })
    }, [ item ])


    return (
        <TouchableOpacity onPress={blogView} >
            <Box
                alignItems={'center'} width={width}

            >

                <Box bg='#fff' borderRadius={30} pb={5}>
                    <Image
                        // source={require('../../images/cardiology.jpg')} 
                        source={{ uri: `${IMG_URL}${item?.attachment}`}}
                        borderRadius={30}
                        height={200}
                        width={width - 40}
                        alt='name'
                    >
                    </Image>
                    <Box p={3} w={width - 60}   >
                        <Text color={'#444444'} letterSpacing={1} fontSize={17} fontWeight={700}>{item?.subject}</Text>
                        <Text color={'#444444'} fontSize={15} fontWeight={600} mt={2} numberOfLines={2} textAlign={"justify"}>{item?.content}</Text>
                    </Box>

                </Box>


            </Box>
        </TouchableOpacity>


    )

}

export default memo(BlogSlider) 

const styles = StyleSheet.create({})
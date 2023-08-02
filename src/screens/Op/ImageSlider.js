import { StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import React from 'react'
import { Box, FlatList, HStack, Pressable, Text, Image } from 'native-base'
import reactotron from 'reactotron-react-native'

const ImagesSlider = ({images}) => {

    const { width, height } = useWindowDimensions()

    
  return (
    <Box>

        <FlatList 
            // ref={flat}
            data={images}
            horizontal
            keyExtractor={item => item._id.toString()}
            pagingEnabled
            m={2}
            showsHorizontalScrollIndicator={false}
            renderItem = { ({item}) => {
            return(
                    <Image 
                        source={{ uri: item?.image}} 
                        borderRadius={20}
                        height={170}
                        width={width-15}
                        alt='name'
                        resizeMode='cover'
                    />
                )
            }}
        />
    

    </Box>
  )
}

export default ImagesSlider

const styles = StyleSheet.create({})
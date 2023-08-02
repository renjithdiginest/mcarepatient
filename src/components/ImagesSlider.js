import { StyleSheet, ImageBackground, useWindowDimensions } from 'react-native'
import React, { memo } from 'react'
import { Box, FlatList, HStack, Pressable, Text, Icon } from 'native-base'

const ImagesSlider = () => {

    const { width, height } = useWindowDimensions()

    const images = [
        {
            id: "1",
            img: require('../images/docter.jpg')
        },
        {
            id: "2",
            img: require('../images/docter.jpg')
        },
        {
            id: "3",
            img: require('../images/docter.jpg')
        }
    ]
  return (
    <Box>

        <FlatList 
            // ref={flat}
            data={images}
            horizontal
            // keyExtractor={item => item.id.toString()}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            renderItem = { ({item}) => {
            return(
                <Box alignItems={'center'} width={width} height={height/5.5} >
                    <ImageBackground 
                        source={item.img} 
                        borderRadius={20}
                        style={{height:'100%', width: width-45,  }}
                        // resizeMode='contain'
                    >
                    </ImageBackground>
                </Box>
                
                )
            }}
        />
    

    </Box>
  )
}

export default memo(ImagesSlider) 

const styles = StyleSheet.create({})
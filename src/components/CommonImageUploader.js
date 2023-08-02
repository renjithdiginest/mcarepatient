import { StyleSheet, useWindowDimensions, } from 'react-native'
import React, { useState, memo } from 'react'
import { Box, HStack, Text, useToast, Icon, Avatar, Image, Pressable } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux';
import pic from "../images/user.jpeg"
const CommonImageUploader = ({ onpress, children, label, galleryImg, preview, DocLabel, DeptLabel }) => {
    const [image, setImage] = useState('');


    const { width, height } = useWindowDimensions()
    return (
        <>
            <Box alignItems='center'>
                <Box shadow={5} >

                    {galleryImg ? <Image
                        position={'relative'}
                        width={130} height={130} borderRadius={25}

                        source={{ uri: galleryImg }} alt='img' shadow={5}
                    /> : <Image
                        position={'relative'}
                        width={130} height={130} borderRadius={25}

                        source={{ uri: preview }} alt='img' shadow={5}
                    />
                    }

                    <Pressable bg={'#FFFFFF'} size={8} shadow={3} onPress={onpress} position={'absolute'} bottom={0} left={50} alignItems={'center'} justifyContent={'center'} borderRadius={8} >
                        <Icon
                            as={<Ionicons />} name={"camera-sharp"}
                            size={22} color='#0D98AF'

                        />
                    </Pressable>
                </Box>
                <Text mt={1} color={'#444444'} opacity={70} letterSpacing={1} fontSize={14}>{DocLabel}</Text>
                <Text mt={.2} color={'#444444'} opacity={70} letterSpacing={1} fontSize={14}>Patient ID: {DeptLabel}</Text>

            </Box>
        </>
    )
}

export default memo(CommonImageUploader) 

const styles = StyleSheet.create({})
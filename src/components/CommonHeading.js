import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { HStack, Text, Pressable, Image, Box } from 'native-base'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const CommonHeading = ({ label, goBack, px, height, width }) => {
    return (
        <HStack alignItems={'center'} px={px} height={height} pb={2}>
            {goBack && <TouchableOpacity onPress={goBack}>
                <Box alignItems={'center'} justifyContent='center' borderRadius={8} bg='#fff' width={10} height={10} mr={2} shadow={1}>
                    <Image source={require('../images/left.png')} alt='img' mr={1} />
                </Box>
            </TouchableOpacity>}
            <Text color={'#444444'} fontFamily='body' fontWeight={600} letterSpacing={1.2} fontSize={25} width={'90%'} isTruncated  >{label}</Text>
        </HStack>
    )
}

export default CommonHeading    

const styles = StyleSheet.create({})
import { StyleSheet, } from 'react-native'
import React from 'react'
import CustomBackground from '../../../components/CustomBackground'
import { Box, FlatList, HStack, Pressable, Text, Image } from 'native-base'

const CustomHead = ({label, onPress, img, dept}) => {
    return (
        <Box>
            <Pressable
                onPress={onPress}
                alignItems={'center'} justifyContent='center' borderRadius={8} bg='#fff' width={10} height={10} mr={2} shadow={1}
            > 
                <Image source={require('../../../images/left.png')} alt='img' mr={1}/>
            </Pressable>
            <Image 
                source={img} 
                borderRadius={20}
                height={120}
                width={120}
                alt='name'
                alignSelf={'center'}
                mt={-10}
            />
            <Text color={'#444444'} fontFamily='body' fontWeight={600} letterSpacing={0.5} fontSize={25} textAlign='center'>{label}</Text>
            <Text color={'#444444'} fontFamily='body' fontWeight={400} letterSpacing={0.5} fontSize={17} textAlign='center'>{dept}</Text>
        </Box>

    )
}

export default CustomHead

const styles = StyleSheet.create({})
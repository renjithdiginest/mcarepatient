import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Text, Image, Button, Icon, ScrollView, Pressable, HStack } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment'

const PersonalDetails = ({patientName, dob, gender, onPress}) => {
    return (
        <Pressable  onPress={onPress}>
            <Box bg={"white"} borderRadius={30}>
                <HStack p={1} >
                    <Image
                        width={100} height={100} borderRadius={25}
                        source={require('../../../../images/user.jpeg')} alt='img' shadow={5}
                    />
                    <Box ml={3} justifyContent='space-between'py={1}>
                        <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={19}>{patientName}</Text>
                        <Text color={'#444444'} letterSpacing={1} fontSize={15}>DOB : {moment(dob).format('MM-DD-YYYY') }</Text>
                        <Text color={'#444444'} letterSpacing={1} fontSize={15}>Gender : {gender}</Text>
                    </Box>
                </HStack>
            </Box>
        </Pressable>
    )
}

export default PersonalDetails

const styles = StyleSheet.create({})
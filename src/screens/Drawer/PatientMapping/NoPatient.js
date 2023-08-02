import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Box, Icon, Text } from 'native-base'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
const NoPatient = () => {
    return (
        <Box h={'90%'} justifyContent={'center'} alignItems={'center'}>
             <Icon as={<FontAwesome />} name={'exclamation-circle'} size={10} m={2}  />
            <Text fontSize={25} px={10} letterSpacing={1} textAlign={'center'} color={'gray.300'}>No Patients have been added</Text>
        </Box>
    )
}

export default NoPatient

const styles = StyleSheet.create({})
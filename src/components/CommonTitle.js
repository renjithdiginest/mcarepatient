import { StyleSheet } from 'react-native'
import React from 'react'
import { Text } from 'native-base'

const CommonTitle = ({label, mt}) => {
    return (
        <Text 
            color={'#444444'} fontWeight={700} fontFamily="body" fontSize={17} mt={mt}
        >{label}</Text>
    )
}

export default CommonTitle

const styles = StyleSheet.create({})
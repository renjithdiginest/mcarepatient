import { StyleSheet } from 'react-native'
import React from 'react'
import { HStack, Switch, Text, Icon } from 'native-base'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import reactotron from 'reactotron-react-native';

const ConsultationStatus = ({ label, available,leave }) => {

  
    return (
        <HStack alignItems={'center'} justifyContent={'space-between'} mb={10}>
            <Text fontSize={20} fontWeight={'bold'} letterSpacing={1}>{label}</Text>
            {!available || leave?.length === 0 ? <Icon as={<MaterialCommunityIcons />} name="toggle-switch-outline" size={30}  color={'#52cb83'}/> : <Icon as={<MaterialCommunityIcons />} name="toggle-switch-off-outline" size={30} color={'error.400'} />}
        </HStack>
    )
}

export default ConsultationStatus

const styles = StyleSheet.create({})
import { StyleSheet, useWindowDimensions, View } from 'react-native'
import React, { useState } from 'react'
import { Box, ScrollView, Button, HStack, Icon, Text, Pressable, VStack } from 'native-base'
import DatePicker from 'react-native-date-picker'
import Ionicons from 'react-native-vector-icons/Ionicons'
import moment from 'moment/moment'
import reactotron from 'reactotron-react-native'
const CustomFromTimePicker = ({ dayLabel, date, handleChangeTime, placeholder }) => {
    const { height, width } = useWindowDimensions()
    const [open, setOpen] = useState(false);
    return (
        <VStack p={2}>
           
          
                <Pressable w={width / 3} minH={45} justifyContent={'center'} borderRadius={10} bg={'white'} onPress={() => setOpen(true)}>
                    <Text p={2}>{date ? moment(date).format("hh:mm A") : placeholder}</Text>
                </Pressable>
           
                <DatePicker
                   
                    modal
                    open={open}
                    mode='time'
                    date={date ? date: new Date()}
                    onConfirm={(date) => {
         
                        handleChangeTime(date)
                        setOpen(false)
                    } }
                    onCancel={() => {
                        setOpen(false)
                    }}
                />
  
        </VStack>
    )
}

export default CustomFromTimePicker

const styles = StyleSheet.create({})
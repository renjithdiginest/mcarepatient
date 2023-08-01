import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Box, HStack, Icon, Pressable, Text, FlatList, Checkbox } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonActionButton from '../../../components/CommonActionButton'
import DatePicker from 'react-native-date-picker'


const DatePickerBox = ({date, onConfirm, showDate, maximumDate, minimumDate, onCancel}) => {

    const [open, setOpen] = useState(false);
    return (
        <>
            <HStack justifyContent={'space-between'} bg='#fff' borderRadius={10} alignItems='center' mt={5}>
                <Box  justifyContent={'center'} px={5}>
                    <Text color={showDate === "Choose Date" ?'#0E0B0B4D' : '#444444'} fontFamily='body' fontWeight={400}  fontSize={15} >{showDate}</Text>
                </Box>
                <CommonActionButton onPress={() => setOpen(true)}>
                    <Icon as={<Ionicons/>} name='calendar' color='#fff' size={26}/>
                </CommonActionButton>
            </HStack>

            <DatePicker
                maximumDate={maximumDate}
                minimumDate={minimumDate}
                mode='date'
                modal
                open={open}
                date={date ? date : new Date()}
                onConfirm={(date) => {
                    onConfirm(date)
                    setOpen(false)
                }}
                onCancel={() => {
                    setOpen(false)
                    onCancel()
                }}
            />


        </>
    )
}

export default DatePickerBox

const styles = StyleSheet.create({})
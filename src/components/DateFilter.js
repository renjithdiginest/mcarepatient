import React, { useState, useEffect, memo } from 'react'
import { ImageBackground, StyleSheet, useWindowDimensions } from "react-native";
import { Box, Text, Image, Spinner, Icon, ScrollView, Pressable, HStack, FlatList, useToast } from 'native-base'
import Calendar from "react-native-calendar-range-picker";
import CommonActionButton from './CommonActionButton';





const DateFilter = ({onPress, onCancel, onChange}) => {

    const { width, height } = useWindowDimensions()


    return (
        
        <Box height={height/2.5}  mt={5} mx={3} mb={20}>
            <Calendar
                startDate="2023-01-01"
                endDate="2024-12-31"
                onChange={onChange}
                style={{
                    monthNameText: { color:'#057EC1', fontWeight:'700' },
                    todayColor: 'blue',
                }}
            /> 

            <HStack mt={2} justifyContent={'space-between'}>
                <CommonActionButton 
                    onPress={onCancel}
                    width={100} 
                >
                    <Text color={'#fff'} fontFamily='body' fontWeight={600} letterSpacing={1.5} fontSize={15}>CANCEL</Text>
                </CommonActionButton>
                <CommonActionButton 
                    onPress={onPress}
                    width={100} 
                >
                    <Text color={'#fff'} fontFamily='body' fontWeight={600} letterSpacing={1.5} fontSize={15}>SUBMIT</Text>
                </CommonActionButton>
            </HStack>
        </Box>
    )
}

export default memo(DateFilter) 

const styles = StyleSheet.create({})
import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Box, HStack, WarningOutlineIcon, Pressable, Text, FormControl, Checkbox } from 'native-base'



const ConsultationTypeCheckbox = ({defaultValue, onChange, isInvalid}) => {
    return (
        <FormControl  isInvalid={isInvalid}>
            <Checkbox.Group colorScheme="blue" defaultValue={defaultValue} accessibilityLabel="pick an item" onChange={onChange}>
                <Pressable minH={45} bg='#fff' borderRadius={15} mt={4} justifyContent={'center'} px={3} width={'100%'}>
                    <Checkbox value="OP" my="1">
                        <Text color={'#000000'} fontFamily='body' fontWeight={600} fontSize={13} >OP</Text>
                    </Checkbox>
                </Pressable>
                <Pressable minH={45} bg='#fff' borderRadius={15} mt={4} justifyContent={'center'} px={3} width={'100%'}>
                    <Checkbox value="Online" my="1">
                        <Text color={'#000000'} fontFamily='body' fontWeight={600} fontSize={13} >Online</Text>
                    </Checkbox>
                </Pressable>
                <Pressable minH={45} bg='#fff' borderRadius={15} mt={4} justifyContent={'center'} px={3} width={'100%'}>
                    <Checkbox value="ReportReview" my="1">
                        <Text color={'#000000'} fontFamily='body' fontWeight={600} fontSize={13} >Report Review</Text>
                    </Checkbox>
                </Pressable>
            </Checkbox.Group>
            <FormControl.ErrorMessage 
                _stack={{
                    alignItems: "flex-start"
                }} 
                leftIcon={<WarningOutlineIcon size="xs" mt={1} />}>
                    You must select at least 1 consultation type
            </FormControl.ErrorMessage>
        </FormControl>
    )
}

export default ConsultationTypeCheckbox

const styles = StyleSheet.create({})
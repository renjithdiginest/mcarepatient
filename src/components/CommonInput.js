import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Box, Image, Text, Input, Icon, HStack, ScrollView } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Controller } from 'react-hook-form'
const CommonInput
    = ({ placeholder,control, fieldName, error, bgColor, placeHoldeColor, width, label,mt,mb,editable }) => {

        return (
            <>
            	<Text fontSize={15} fontWeight={'bold'}>{label}</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            width={width}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            minHeight={50}
                            variant="unstyled"
                            // color={inputColor ? inputColor : '#fff'}
                            mt={mt}
                            mb={mb}
                            editable={editable}
                            placeholder={placeholder}
                            backgroundColor={bgColor ? bgColor : '#FFFFFF'}
                            placeholderTextColor={placeHoldeColor ? placeHoldeColor : 'gray.400'}
                            borderColor={0}
                            borderRadius={15}
                        />
                    )}
                    name={fieldName}
                />
                {error && <Text fontFamily={"body"} fontWeight={500} color={"red.500"} fontSize={11}>{error?.message}</Text>}
            </>
        )
    }

export default CommonInput


const styles = StyleSheet.create({})

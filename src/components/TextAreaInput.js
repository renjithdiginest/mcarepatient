import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, TextArea, Text } from 'native-base'
import { Controller } from 'react-hook-form'

const TextAreaInput = ({ placeholder, fieldName, control, error, label, bg, mt, borderRadius,editable }) => {
    return (
        <Box mt={mt ? mt : 8}>
            <Text
                color={'#444444'} fontWeight={700} fontFamily="body" fontSize={17}
            >{label}</Text>
            <Box alignItems="center"  mt={1} borderRadius={15}
                bg={bg ? bg : '#E6F4F7'}
            >
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}

                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextArea
                            editable={editable}
                            bgColor={bg ? bg : '#E6F4F7'}
                            onChangeText={onChange}
                            value={value}
                            onBlur={onBlur}
                            h={20}
                            placeholder={placeholder}
                            borderWidth={0}
                            borderRadius={borderRadius}
                        />
                    )}
                    name={fieldName}
                />
              
            </Box>
            {error && <Text fontFamily={"body"} fontWeight="bold" color={"red.500"} ml={2}>{error?.message}</Text>}
        </Box>

    )
}

export default TextAreaInput

const styles = StyleSheet.create({})
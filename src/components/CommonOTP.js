import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Box, Image, Text, Input, Icon, HStack, ScrollView } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Controller } from 'react-hook-form'
import OTPInputView from '@twotalltotems/react-native-otp-input'
const CommonOTP = ({control, fieldName, error}) => {
    return (
        <>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <OTPInputView
                        style={{ height: 80 }}
                        pinCount={4}
                        code={value} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        onCodeChanged={onChange}
                        autoFocusOnLoad={false}
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={(code) => {
                            // console.log(`Code is ${code}, you are good to go!`)
                        }}
                    />

                )}
                name={fieldName}
            />
            {error && <Text fontFamily={"body"} fontWeight={500} color={"red.500"} fontSize={11}>{error?.message}</Text>}

        </>
    )
}

export default CommonOTP

const styles = StyleSheet.create({
    borderStyleBase: {
        width: 35,
        height: 40
    },

    borderStyleHighLighted: {
        borderColor: "#ffff",

    },

    underlineStyleBase: {
        width: 40,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        color: '#000',
        backgroundColor: '#ffff',
        borderRadius: 10
    },

    underlineStyleHighLighted: {
        borderColor: "#ffff",
    },
})
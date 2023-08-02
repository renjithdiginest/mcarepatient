import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState, memo } from 'react'
import { Box, Image, Text, Input, Icon, HStack, ScrollView } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Controller } from 'react-hook-form'
const CustomInput  = ({ placeholder, leftIconName, inputType, bottomRadius, topRadius, paddingLeft, rightIconBg, control, fieldName, error, bgColor, placeHoldeColor, leftIconColor, leftElementBg, inputColor, width, keyboardType }) => {

        const [show, setShow] = useState(true)
        const handleClick = () => setShow(!show);


        return (

            <>
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
                            mt={5}
                            placeholder={placeholder}
                            backgroundColor={bgColor ? bgColor : '#FFFFFF'}
                            placeholderTextColor={placeHoldeColor ? placeHoldeColor : 'gray.400'}
                            borderColor={0}
                            borderRadius={15}
                            // pl={paddingLeft}
                            leftElement={leftIconName &&
                                <Box alignItems={'center'} justifyContent='center' pl={2}>
                                    <Image
                                        source={leftIconName} ml={2}
                                        alt="logo" alignSelf='center'
                                    />
                                    {/* <Icon as={<Ionicons />} name={'call-outline'} color="#000" size={25} /> */}
                                </Box>
                            }
                            rightElement={inputType === "password" ?
                                <Box
                                    alignItems={'center'} justifyContent='center' bg={rightIconBg}
                                    borderTopLeftRadius={30}
                                >
                                    <Icon as={<Ionicons />} name={show ? "ios-eye-off-sharp" : "ios-eye-sharp"} color={'#ADADAD'} size={5} m={4} onPress={handleClick} />
                                </Box> : ''
                            }
                            type={inputType === "password" && show ? "password" : "text"}
                            keyboardType={keyboardType}

                        />
                    )}
                    name={fieldName}
                />
                {error && <Text fontFamily={"Quicksand"} letterSpacing={.5} fontWeight={600}  color={"red.500"} fontSize={12} ml={1} mt={.5} >{error?.message}</Text>}
            </>
        )
    }

export default memo(CustomInput) 


const styles = StyleSheet.create({})

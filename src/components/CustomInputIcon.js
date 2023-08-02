import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState, memo } from 'react'
import { Box, Image, Text, Input, Icon, HStack, ScrollView, Pressable } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { Controller } from 'react-hook-form'
const CustomInputIcon
    = ({ placeholder, control, fieldName, error, bgColor, placeHoldeColor, icon,ml, width, keyboardType, heights, weight, label ,mt,mb,material,onpress,onChangeText,readonly}) => {

        const [show, setShow] = useState(true)
        const handleClick = () => setShow(!show);


        return (

            <> 
                <Text fontSize={15} fontWeight={'bold'} py={1} alignSelf='flex-start' ml={ml}>{label}</Text>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                        isReadOnly={readonly}
                            mt={mt}
                            mb={mb}
                            width={width}
                            onBlur={onBlur}
                            onChangeText={onChangeText?onChangeText:onChange}
                            value={value}
                            minHeight={50}
                            variant="unstyled"
                            // color={inputColor ? inputColor : '#fff'}
                            placeholder={placeholder}
                            backgroundColor={bgColor ? bgColor : '#FFFFFF'}
                            placeholderTextColor={placeHoldeColor ? placeHoldeColor : 'gray.400'}
                            borderColor={0}
                            borderRadius={15}
                            keyboardType={keyboardType}
                            // pl={paddingLeft}

                            rightElement={
                                <Pressable onPress={onpress}>
                                <Box
                                    
                                    alignItems={'center'} justifyContent='center'
                                    borderRadius={10}
                                    bgColor={{
                                        linearGradient: {
                                            colors: ['#0E9DAB', '#047AC3'],
                                            start: [1, 0],
                                            end: [1, 1]
                                        }
                                    }}
                                >
                                    {material && <Icon as={<MaterialIcons />} name={material} color={'#ffff'} size={5} m={4}  />}
                                    {icon && <Icon as={<Ionicons />} name={icon} color={'#ffff'} size={5} m={4} />}
                                    {heights && <Text m={4} color='#fff' fontWeight={700}>{heights}</Text>}
                                    {weight && <Text m={4} color='#fff'  fontWeight={700}>{weight}</Text>}
                                </Box>
                                </Pressable>
                            }


                        />
                    )}
                    name={fieldName}
                />
                {error && <Text fontFamily={"body"} fontWeight={500} color={"red.500"} fontSize={11}>{error?.message}</Text>}
            </>
        )
    }

export default memo(CustomInputIcon) 


const styles = StyleSheet.create({})

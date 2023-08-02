import { StyleSheet } from 'react-native'
import React, { memo } from 'react'
import { Box, CheckIcon, Center, Select, Icon, Text } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Controller } from 'react-hook-form'
import reactotron from 'reactotron-react-native'


const CommonSelectInput = ({placeholder, changeValue, selectedValue, options, optlabel, optValue, mt, label, backgroundColor, mb, fieldName, control, error,width, children,customweight}) => {

    // reactotron.log({optValue})
    
    return (

        <Box mt={mt} mb={mb}>
            <Box w="100%">
                <Text 
                    color={'#444444'} fontWeight={700} fontFamily="body" fontSize={17} 
                mb={.5} >{label}</Text>
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Select 
                            width={width}
                            borderWidth={0}
                            mt={1}
                            borderRadius={15}
                            selectedValue={selectedValue}  
                            accessibilityLabel={"placeholder"}
                            placeholder={placeholder} 
                            placeholderTextColor={'gray.400'}
                            backgroundColor={backgroundColor ? backgroundColor:'#E6F4F7'}
                            fontSize={13}
                            fontWeight={customweight ? customweight :600 }
                            _selectedItem={{
                                bg: "gray.300",
                                endIcon: <CheckIcon size="1"  />
                            }} 
                            onValueChange={itemValue => changeValue(itemValue)}
                            dropdownIcon={
                                <Box
                                    borderRadius={10}
                                    alignItems={'center'} justifyContent='center' 
                                    height={45} width={45} 
                                    bg={{
                                        linearGradient: {
                                            colors: ['#0E9DAB', '#047AC3'],
                                            start: [1, 0],
                                            end: [1, 1]
                                        }
                                    }}
                                >
                                    <Icon
                                        as={<Ionicons/>} name={'caret-down'}  
                                        size={21} color={"#fff"} m={3.5}
                                    />
                                </Box>
                            }
                        >
                            {children ? children :options && options.map((opt, index) => (
                                <Select.Item key={index} label={opt[optlabel]} value={opt[optValue]} />
                            ))}
                        </Select>
                    )}
                    name={fieldName}
                />
            </Box>
        {error && <Text fontFamily={"Quicksand"} fontWeight={customweight ? customweight : '600'} fontSize={12} color={"red.500"} ml={2}>{error?.message}</Text>}

            
        </Box>
    )
}

export default memo(CommonSelectInput) 

const styles = StyleSheet.create({})
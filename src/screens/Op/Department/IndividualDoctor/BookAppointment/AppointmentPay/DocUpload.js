import { StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { Box, Text, HStack, Pressable, Icon, Image, useToast, Modal, ScrollView, Avatar } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { TouchableHighlight } from 'react-native-gesture-handler'


const DocUpload = ({ files, onPress, mt, docName, removeFile }) => {
    return (
        <>
            <Pressable mt={mt} onPress={onPress}>
                <Text
                    color={'#444444'} fontWeight={700} fontFamily="body" fontSize={17}
                >Attachments</Text>
                <HStack
                    borderRadius={10} bg='#EFEFEF' justifyContent={'space-between'} alignItems='center'
                >
                    <Text
                        color={'#444444'} fontWeight={600} fontFamily="body" fontSize={14} ml={3} w={"80%"}
                    >{docName}</Text>
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
                            as={<Ionicons />} name={'cloud-upload'}
                            size={23} color={"#fff"} m={3.5}
                        />
                    </Box>
                </HStack>
            </Pressable>
            {files.map((file, index) => <HStack key={index} my={1}
                    borderRadius={10} bg='#EFEFEF' justifyContent={'space-between'} alignItems='center'
                >
                    <Text
                        color={'#444444'} fontWeight={600} fontFamily="body" fontSize={14} ml={3} w={"80%"}
                    >{file?.name}</Text>
                    <TouchableOpacity onPress={() => removeFile(index)}>
                    <Box
                        borderRadius={10}
                        alignItems={'center'} justifyContent='center'
                        height={45} width={45}
                        bg={{
                            linearGradient: {
                                colors: ['red.300', 'red.700'],
                                start: [1, 0],
                                end: [1, 1]
                            }
                        }}
                    >
                        <Icon
                            as={<Ionicons />} name={'close'}
                            size={23} color={"#fff"} m={3.5}
                        />
                    </Box>
                    </TouchableOpacity>
                </HStack>)}
        </>
    )
}

export default DocUpload

const styles = StyleSheet.create({})
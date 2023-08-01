import { StyleSheet, useWindowDimensions } from 'react-native'
import React, {useState} from 'react'
import { Box, Text, HStack, Pressable, Icon, Image, useToast, Modal, ScrollView, Avatar } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'

const DocDownload = ({label, data, mt, docName, onPress}) => {
  return (
    <Pressable mt={mt} onPress={onPress} minW={"90%"}>
        
        <HStack  
            borderRadius={10} bg='#EFEFEF' justifyContent={'space-between'}  alignItems='center'
        >
            <Text 
                color={'#444444'} fontWeight={600} fontFamily="body" fontSize={14} ml={3}
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
                    as={<Ionicons/>} name={'download'}  
                    size={23} color={"#fff"} m={3.5}
                />
            </Box>
        </HStack>
    </Pressable>
  )
}

export default DocDownload

const styles = StyleSheet.create({})
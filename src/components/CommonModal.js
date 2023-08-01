import { StyleSheet, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { HStack, Box, Text, Modal } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'

const CommonModal = ({isOpen, label, onClose, gotoNext, children, width, pb }) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} >
            <Box  bg={'#fff'} borderRadius={15} py={1} shadow={1} width={width} pb={pb} px={4}>
                {children}
            </Box>
        </Modal>
    )
}

export default CommonModal

const styles = StyleSheet.create({})
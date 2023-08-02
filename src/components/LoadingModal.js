import { StyleSheet, View, useWindowDimensions } from 'react-native'
import React, { memo } from 'react'
import { HStack, Box, Modal, Spinner } from 'native-base'

const LoadingModal = ({isVisible, label, closeModal, gotoNext }) => {
    
  const { width, height } = useWindowDimensions()

  return (
    <Modal isOpen={isVisible} >
        <Box 
			width={45} height={45} bg='#fff' 
			 alignItems={'center'} 
			justifyContent='center' borderRadius={10} shadow={2} 
		>
			<Spinner color={'#86fafc'} size={25}/>
		</Box>
    </Modal>
  )
}

export default memo(LoadingModal) 

const styles = StyleSheet.create({})

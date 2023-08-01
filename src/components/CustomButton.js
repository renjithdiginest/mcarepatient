import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { memo } from 'react'
import { HStack, Pressable, Text, Icon, Box } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'

const CustomButton = ({ label, onPress, selected, wid, h }) => {

  const { width, height } = useWindowDimensions()

  return (
    <Pressable onPress={onPress} >
      <Box
        width={wid ? wid : width / 3.5}
        style={selected ? styles.tabSelected : styles.tabNotSelected}
        bg={selected ? {
          linearGradient: {
            colors: ['#0E9DAB', '#047AC3'],
            start: [0, 0],
            end: [1, 0]
          }
        } : "#fff"}
        alignItems='center'
        justifyContent={'center'}
        borderRadius={10}
        h={h}
      >
        <Text style={selected ? styles.selectedText : styles.notSelectedText} fontSize={15} my={3}>{label}</Text>
      </Box>
    </Pressable>

  )
}

export default memo(CustomButton) 

const styles = StyleSheet.create({

  tabSelected: {
    backgroundColor: '#047AC3',
    shadowColor: 'gray',
    shadowOpacity: 0.9,
  },
  tabNotSelected: {
    backgroundColor: '#fff',

  },
  selectedText: {
    fontWeight: '600',
    color: '#fff',

  },
  notSelectedText: {
    fontWeight: '600',
    color: '#414141',

  },
})
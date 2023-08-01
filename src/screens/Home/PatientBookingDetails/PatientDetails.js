import { StyleSheet } from 'react-native'
import React from 'react'
import { Box, Image, HStack, Icon, Text, Pressable } from 'native-base'
import reactotron from 'reactotron-react-native'


const PatientDetails = ({onPress, patientName,patient_id}) => {
    // const { activePatient } = route.params
    // reactotron.log({activePatient})
    return (
        <HStack  mt={4} alignSelf='center'>
            <Image
                flex={.30}
                width={90} height={90} borderRadius={30}
                source={require('../../../images/user.jpeg')} alt='img' shadow={5}
            />
            <Box flex={.70} ml={3} justifyContent='space-between'py={1}>
                <Box>
                    <Text color={'#444444'} fontWeight={700} letterSpacing={1} fontSize={16}>{patientName}</Text>
                    <Text color={'#444444'} letterSpacing={1} fontSize={13}>Patient ID : {patient_id}</Text>
                </Box>
                <Box>
                </Box>
                <Pressable onPress={onPress}>
                    <Box 
                        alignItems={'center'}
                        justifyContent="center"
                        borderRadius={10}
                        bg={{
                            linearGradient: {
                            colors: ['#0E9DAB', '#047AC3'],
                            start: [0, 0],
                            end: [1, 0]
                            }
                        }}
                    >
                        <Text color={'#fff'} fontWeight={600} letterSpacing={0.5} fontSize={16} py={1}>View History</Text>
                    </Box>
                </Pressable>
            </Box>
        </HStack>
    )
}

export default PatientDetails

const styles = StyleSheet.create({})
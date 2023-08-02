import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Box, ScrollView, Select, Text, HStack, Icon } from 'native-base'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ListItem from '../components/ListItem'
import CustomLogo from '../components/CustomLogo'
import CommonModal from '../components/CommonModal'
import CommonActionButton from '../components/CommonActionButton'

const DrawerContent = ({ navigation }) => {

    const [showModal, setShowModal] = useState(false)



    
    const dispatch = useDispatch();


    // const logout = async() =>{
    //     navigation.dispatch(DrawerActions.toggleDrawer())
    //     CommonActions.reset()

    //     navigation.navigate('SignIn')

    //     await AsyncStorage.clear()

    //     dispatch({
    //         type: RESET_USER
    //     })


    // }


    


    const clearAsyncStorage = async () => {
        setShowModal(false)
        await AsyncStorage.clear();
        navigation.navigate('login')
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <HStack alignItems='center' mt={5}>
                <Box alignItems={'flex-end'} flex={0.6}>
                    <CustomLogo size={60} />
                </Box>
                <Box alignItems={'flex-end'} flex={0.35}>
                    <TouchableOpacity onPress={() => navigation.closeDrawer()} >
                        <Icon as={<Ionicons />} name={"close"} color="#098CB6" size={7} />
                    </TouchableOpacity>
                </Box>
            </HStack>
            <Box height={0.5} bg='#E6F4F7' my={5} />
            <ListItem
                label={'Patient Mapping'}
                onPress={() => navigation.navigate('PatientMapping')}

            />
            <ListItem
                label={'Service Booking'}
                onPress={() => navigation.navigate('ServiceBooking')}
            />
            <ListItem
                label={'Procedure Booking'}
                onPress={() => navigation.navigate('ProcedureBooking')}
            />
            <ListItem
                label={'Report Review'}
                onPress={() => navigation.navigate('ReportReview')}

            />
            <ListItem
                onPress={() => navigation.navigate('Blog')}
                label={'Blogs'}

            />

            <CommonActionButton
                onPress={() => { setShowModal(true) }}
                alignSelf='center' mt={230}
            >
                <Icon as={<Ionicons />} color='#fff' size={25} name='power-sharp' />
            </CommonActionButton>



            <CommonModal isOpen={showModal} >
                <Text fontSize={17} color={'#000'} mt={2} letterSpacing={0.5}>Are you sure to Logout?</Text>
                <HStack justifyContent={'space-evenly'} my={4}>
                    <CommonActionButton
                        // onPress={()=>{setShowModal(false)}}
                        onPress={clearAsyncStorage}
                    >
                        <Text color={'#fff'} fontWeight={600}>YES</Text>
                    </CommonActionButton>
                    <CommonActionButton
                        onPress={() => setShowModal(false)}
                    >
                        <Text color={'#fff'} fontWeight={600}>NO</Text>
                    </CommonActionButton>
                </HStack>

            </CommonModal>


        </ScrollView>
    )
}

export default DrawerContent

const styles = StyleSheet.create({})
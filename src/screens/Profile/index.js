import { StyleSheet, } from 'react-native'
import React,{useState} from 'react'
import CustomBackground from '../../components/CustomBackground'
import CommonProfileCard from './CommonProfileCard'
import { Box, HStack, Icon, Image, ScrollView, Text } from 'native-base'

import LogoutButton from './LogoutButton'
import ProfileDp from './ProfileDp'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CommonModal from '../../components/CommonModal'
import CommonActionButton from '../../components/CommonActionButton'

const Profile = ({ navigation }) => {
    const [showModal, setShowModal] = useState(false)
    const clearAsyncStorage = async () => {
        await AsyncStorage.clear();
        setShowModal(false)
        navigation.navigate('login')
    }

    return (
        <CustomBackground>
            <ProfileDp />

            <ScrollView showsVerticalScrollIndicator={false} bg='#fff' borderTopRadius={30} pt={3} flex={1} mt={5}>
                <CommonProfileCard label={'Profile'} onPress={() => navigation.navigate('editProfile')} />
                <CommonProfileCard label={'Consultations'} onPress={() => navigation.navigate('consultaions')} />
                <CommonProfileCard label={'Time Management'} onPress={() => navigation.navigate('timeManagement')} />
                <CommonProfileCard label={'Leave Management'} onPress={() => navigation.navigate('leaveManagement')} />
                <CommonProfileCard label={'Blogs'} onPress={() => navigation.navigate('blogs')} />
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
                <LogoutButton onPress={()=>setShowModal(true)} />
            </ScrollView>
        </CustomBackground>
    )
}

export default Profile

const styles = StyleSheet.create({})
import { StyleSheet, } from 'react-native'
import React from 'react'
import { Box, Image, Pressable, Skeleton, Text } from 'native-base'
import { useSelector } from 'react-redux';

const ProfileDp = () => {
    const { user } = useSelector(state => state.auth);

    return (
        <Box alignSelf={'center'} alignItems='center' mt={10}>
            <Pressable shadow={5}>
                <Image
                    width={100} height={100} borderRadius={10}
                    source={{uri:user?.image}} alt='img' shadow={5}
                />
            </Pressable>
            <Text color={'#444444'} fontWeight={600} fontSize={22} letterSpacing={0.5}>{user?.name}</Text>
            <Text color={'#0E0B0B4D'} fontWeight={600} fontSize={12} letterSpacing={0.5}>Doctor ID : DOC{user?.doctor_id}</Text>
        </Box>
    )
}

export default ProfileDp

const styles = StyleSheet.create({})
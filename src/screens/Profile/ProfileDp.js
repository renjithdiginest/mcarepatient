import { StyleSheet, } from 'react-native'
import React from 'react'
import { Box, Image, Pressable, Skeleton, Text } from 'native-base'
import { useSelector } from 'react-redux';
import user from '../../images/user.jpeg'
import reactotron from 'reactotron-react-native';
const ProfileDp = ({user}) => {
reactotron.log({user})

    return (
        <Box alignSelf={'center'} alignItems='center' mt={5}>
            <Pressable shadow={5}>
                <Image
                    width={130} height={130} borderRadius={10}
                    source={"user"} alt='img' shadow={5}
                />
            </Pressable>
            <Text color={'#444444'} fontWeight={600} fontSize={22} letterSpacing={0.5}>{user?.name}</Text>
            <Text color={'#0E0B0B4D'} fontWeight={600} fontSize={12} letterSpacing={0.5}>Patient ID :{user?.user_id}</Text>
        </Box>
    )
}

export default ProfileDp

const styles = StyleSheet.create({})
import { Badge, Box, HStack, Image, Pressable, StatusBar, Text } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'
import CustomLogo from './CustomLogo';
import { ImageBackground, StyleSheet } from 'react-native'
import { useContext, memo } from 'react';
import NotificationContext from '../context/Notification';
const CustomHeader =  ({length}) => {
    const navigation = useNavigation();
    const Notification = useContext(NotificationContext)
    return (
        <>
            <StatusBar hidden={false} translucent={true} barStyle="default" />
            <ImageBackground source={require('../images/homebg.png')} style={styles.image}>
                <HStack
                    px={3}
                    alignItems='center'
                >
                    <Pressable flex={0.45} >
                        <Ionicons
                            onPress={() => navigation.openDrawer()}
                            name={"menu-sharp"} size={23} color={"#057EC1"}
                        />
                    </Pressable>
                    <Box mt={2} flex={0.55}>
                        <CustomLogo size={60} />
                    </Box>
                    <Pressable onPress={() => navigation.navigate("notifications")}>
                        <Badge // bg="red.400"
                            colorScheme="danger" rounded="full" mb={-2} mr={-2} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
                                fontSize: 9
                            }}>{Notification?.notificationList}</Badge>
                        <Ionicons name={"notifications"} size={22} color={"#057EC1"} />
                    </Pressable>
                </HStack>
            </ImageBackground>
        </>
    )
}

export default memo(CustomHeader) 

const styles = StyleSheet.create({})
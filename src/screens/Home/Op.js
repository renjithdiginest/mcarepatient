import React, { useState, useEffect, useContext, useCallback } from 'react'
import { ImageBackground, StyleSheet, useWindowDimensions } from "react-native";
import { Box, Text, Image, Button, Icon, ScrollView, Pressable, HStack } from 'native-base'
import CustomButton from '../../components/CustomButton';
import CustomBackground from '../../components/CustomBackground';
import CommonHeading from '../../components/CommonHeading';
import Today from './Today';
import Upcoming from './Upcoming';
import Completed from './Completed';
import RouteContext from '../../helpers/Route';
import { useDispatch, useSelector } from 'react-redux';
import reactotron from 'reactotron-react-native';
import NotificationContext from '../../helpers/Notification';

const Op = ({ navigation }) => {
    const { user, loading } = useSelector(state => state.auth)
    const notiContext = useContext(NotificationContext);
    reactotron.log({ user })
    const dispatch = useDispatch()
    const [currentTab, setCurrentTab] = useState(0)

    const context = useContext(RouteContext)

    useEffect(() => {
        if (context.initialRoute) {
            if (context?.initialRoute?.mode === "leave") {
                setTimeout(() => {
                    navigation.navigate("tab", { screen: "Profile", params: { screen: "leaveManagement" } });
                }, 500);
            }
            else if (context?.initialRoute?.mode === "report") {
                setTimeout(() => {
                    navigation.navigate("PatientBookingDetails", { activePatient: context?.initialRoute?.data });
                }, 500);
            }

        }
    }, [context.initialRoute])

    // const setUser = async() => {
    //     const user = JSON.parse(await AsyncStorage.getItem("user"));
    //     if (user) {
    //         dispatch({
    //             type: LOGIN_SUCCESS,
    //             payload: user
    //         })
    //     }
    // }

    useEffect(()=>{
        if(user){
            notiContext.setNotificationList(user?.notification)
        }
    },[user])

    const { width, height } = useWindowDimensions()

    const setToday = useCallback(() => {
        setCurrentTab(0)
    }, [])

    const setUpcoming = useCallback(() => {
        setCurrentTab(1)
    }, [])

    const setOld = useCallback(() => {
        setCurrentTab(2)
    }, [])


    return (

        <CustomBackground>
            <Box px={5} mt={5} >

                <CommonHeading label={'My Consultations'} />

                <HStack justifyContent={'center'} borderRadius={15} alignSelf='center' bg='#fff' mt={4}>
                    <CustomButton
                        label={"Today"}
                        onPress={setToday}
                        selected={currentTab === 0 ? true : false}
                    />
                    <CustomButton
                        label={"Upcoming"}
                        onPress={setUpcoming}
                        selected={currentTab === 1 ? true : false}
                    />
                    <CustomButton
                        label={"Old"}
                        onPress={setOld}
                        selected={currentTab === 2 ? true : false}
                    />
                </HStack>
                {currentTab === 0 && <Today type="Op" />}
                {currentTab === 1 && <Upcoming type="Op" />}
                {currentTab === 2 && <Completed type="Op" />}


                {/* 
            <Box 
                height={20} width={20} 
                bg={{
                    linearGradient: {
                    colors: ['#0E9DAB', '#047AC3'],
                    start: [0, 0],
                    end: [1, 0]
                    }
                }}
            >

            </Box>
        */}
            </Box>


        </CustomBackground>

    )
}

export default Op

const styles = StyleSheet.create({

    image: {
        flex: 1,

    },
})
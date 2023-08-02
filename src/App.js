import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { NativeBaseProvider, extendTheme, Text, Box } from 'native-base'
import Navigation from './Navigations'
import store from './Redux/store'
import { Provider } from 'react-redux'
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import reactotron from 'reactotron-react-native'
import axios from 'axios'
import { API_URL } from './config/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as RootNavigation from './Navigations/RootNavigation'
import NotificationProvider from './context/Notification/NotificationContext'
import {ZoomVideoSdkProvider} from '@zoom/react-native-videosdk';


const App = () => {

    async function requestUserPermission() {
        const authorizationStatus = await messaging().requestPermission();

        if (authorizationStatus) {
            console.log('Permission status:', authorizationStatus);
            await messaging().registerDeviceForRemoteMessages();
            const token = await messaging().getToken();

            let user = JSON.parse(await AsyncStorage.getItem("user"))
            reactotron.log({ user })

            if (user?._id) {
                let data = {
                    id: user?._id,
                    token
                }
                await axios.post(`${API_URL}auth/adddevicetoken`, data)
                    .then(async response => {
                    })
                    .catch(async error => {
                    })
            }

            reactotron.log({ token })
            // save the token to the db
        }
    }

    async function onMessageReceived(message) {
        // Request permissions (required for iOS)
        await notifee.requestPermission()

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
            title: message?.title,
            body: message?.body,
            android: {
                channelId,
                smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
                // pressAction is needed if you want the notification to open the app when pressed
                pressAction: {
                    id: 'default',
                },
            },
        });
    }

    const theme = extendTheme({
        fontConfig: {
            Quicksand: {
                300: {
                    normal: 'Quicksand-Light',
                },
                500: {
                    normal: 'Quicksand-Medium',
                },
                400: {
                    normal: 'Quicksand-Regular',
                },
                600: {
                    normal: 'Quicksand-SemiBold',
                },
                700: {
                    normal: 'Quicksand-Bold',
                },
            },
        },

        fonts: {
            heading: 'Quicksand',
            body: 'Quicksand',
            mono: 'Quicksand'
        },

    });

    const config = {
        dependencies: {
            "linear-gradient": require("react-native-linear-gradient").default,
        },
    };

    useEffect(() => {
        requestUserPermission()
    }, [])

    useEffect(() => {
        // Assume a message-notification contains a "type" property in the data payload of the screen to open

        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage,
            );
            if (remoteMessage.data.mode === "leave") {
                RootNavigation.navigate("leaveManagement");
            }
            else if (remoteMessage.data.mode === "report") {

            }

        });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );

                    if (remoteMessage.data.mode === "leave") {
                        // setTimeout(() => {
                        //     RootNavigation.navigate("leaveManagement");
                        // }, 5000);
                    }
                    //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
                }
                //setLoading(false);
            });

        messaging().onMessage(onMessageReceived);
        messaging().setBackgroundMessageHandler(onMessageReceived);
    }, []);


    return (
        <NativeBaseProvider theme={theme} config={config}>

            <Provider store={store}>
                <NotificationProvider>
                    <ZoomVideoSdkProvider
                        config={{
                            appGroupId: 'group.test.sdk',
                            domain: 'zoom.us',
                            enableLog: true,
                        }}
                    >
                        <Navigation />
                    </ZoomVideoSdkProvider>
                </NotificationProvider>
            </Provider>
        </NativeBaseProvider>
    )
}

export default App

const styles = StyleSheet.create({})
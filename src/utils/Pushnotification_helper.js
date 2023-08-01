import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import reactotron from 'reactotron-react-native';

export const requestUserPermission= async ()=> {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        messaging().getToken().then((fcmToken)=>{
            reactotron({fcmToken})
        })
    }
}


// export GetFCMToken() {
//     let fcmtoken = await AsyncStorage.getItem('fcmtoken')
//     if (!fcmtoken) {
//         try {
//             const fcmtoken = await messaging().getToken();
//             if (fcmtoken) {
//                 reactotron(fcmtoken, 'new token');
//                 await AsyncStorage.setItem('fcmtoken', fcmtoken)
//             }
//         } catch (error) {

//         }
//     }
// }

export const NotificationListner=()=>{
    
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        navigation.navigate(remoteMessage.data.type);
      });

      messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          reactotron(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
       
        }
      
      });
      messaging().onMessage(async remoteMessage=>{
        reactotron('notification on foreground satte.....',remoteMessage)
      })
}
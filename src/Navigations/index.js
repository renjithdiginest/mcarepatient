import { StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Box, Spinner, Text } from 'native-base';
import Login from '../screens/auth';
import Forget from '../screens/auth/forget';
import TabNavigator from './TabNavigator';
import { navigationRef } from './RootNavigation';
import Otp from '../screens/auth/Otp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN_SUCCESS } from '../Redux/constants/authConstants';
import { getProfile } from '../Redux/actions/profileActions';
import BlogSingleView from '../screens/Profile/Blogs/BlogView';
//import ViewPdf from '../screens/Home/PatientBookingDetails/PatientHistory/ViewPdf';
import messaging from '@react-native-firebase/messaging';
import RouteContext from '../helpers/Route';
import Notifications from '../screens/Notifications';
import PatientBookingDetails from '../screens/Home/PatientBookingDetails';
import ReferService from '../screens/Home/PatientBookingDetails/ReferService';
import ReferProcedure from '../screens/Home/PatientBookingDetails/ReferProcedure';
import PatientHistory from '../screens/Home/PatientBookingDetails/PatientHistory';
import SplashScreen from "react-native-splash-screen";
import reactotron from 'reactotron-react-native';
import ViewPdf from '../screens/ViewPdf';
import LoadingModal from '../components/LoadingModal';




const Stack = createNativeStackNavigator();

const Navigation = () => {
	const [initial, setInitial] = useState(null)
	const [showModal, setShowModal] = useState(false)

	const { loading } = useSelector(state => state.auth)



	const context = useContext(RouteContext)

	const dispatch = useDispatch();

	useEffect(() => {
		// Check whether an initial notification is available
		messaging()
			.getInitialNotification()
			.then(remoteMessage => {
				if (remoteMessage) {
					// console.log(
					// 	'Notification caused app to open from quit state:',
					// 	remoteMessage.notification,
					// );

					if (remoteMessage.data.mode === "leave") {
						context.setInitialRoute({ mode: 'leave' })
					}
					else if (remoteMessage.data.mode === "report") {
						context.setInitialRoute({ mode: 'report', data: JSON.parse(remoteMessage.data.details) })
					}
					//setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
				}
				//setLoading(false);
			});
	}, []);



	const checkLogin = async () => {
		const token = await AsyncStorage.getItem("token");
		const user = JSON.parse(await AsyncStorage.getItem("user"));
		// reactotron.log({user})
		if (user) {
			//setLoading(false)
			dispatch({
				type: LOGIN_SUCCESS,
				payload: user
			})
			setInitial('tab')
			SplashScreen.hide();
			dispatch(getProfile(user?.user_id))
		} else {
			setInitial('login')
			SplashScreen.hide();
		}
	}

	useEffect(() => {
		checkLogin()
	}, [])

	useEffect(() => {

		if (loading) {
			setShowModal(true)
		} else {
			setShowModal(false)
		}

	}, [loading])

	if (!initial) {
		return (<Box>
			<Spinner />
		</Box>)
	}




	return (
		<Box flex={1} safeArea>
			<NavigationContainer ref={navigationRef}>
				<Stack.Navigator initialRouteName={initial} screenOptions={{ headerShown: false }}>
					<Stack.Screen name="login" component={Login} />
					<Stack.Screen name="forget" component={Forget} />
					<Stack.Screen name="otp" component={Otp} />
					<Stack.Screen name="tab" component={TabNavigator} />
					<Stack.Screen name='blogsView' component={BlogSingleView} />
					{/* <Stack.Screen name='ViewPdf' component={ViewPdf}/> */}

					{/* <Stack.Screen name="ViewPdf" component={ViewPdf} options={{
						presentation: 'containedTransparentModal'
					}} /> */}
					<Stack.Screen name='notifications' component={Notifications} />
					<Stack.Screen name="PatientBookingDetails" component={PatientBookingDetails} />
					<Stack.Screen name="ReferService" component={ReferService} />
					<Stack.Screen name="ReferProcedure" component={ReferProcedure} />
					<Stack.Screen name="PatientHistory" component={PatientHistory} />
					<Stack.Screen name="viewpdf" component={ViewPdf} />

				</Stack.Navigator>
			</NavigationContainer>
			<LoadingModal isVisible={showModal} />
		</Box>
	)
}

export default Navigation

const styles = StyleSheet.create({})
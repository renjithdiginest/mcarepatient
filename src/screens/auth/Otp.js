import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from 'react'
import { Box, Text, Image, Button, Icon, ScrollView, Pressable, useToast, VStack } from 'native-base'
import backgroundImage from "../../images/maskgroup.png"
import CustomLogo from "../../components/CustomLogo";
import CustomInput from "../../components/CustomInput";
import mail from "../../images/email.png"
import lock from '../../images/lock.png'
import { useForm } from "react-hook-form";
import loginbutton from "../../images/login-svgrepo-com.png"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CommonActionButton from "../../components/CommonActionButton";
import { useDispatch, useSelector } from "react-redux";
import { postLogin, postLoginOtp, postMobileReg } from "../../Redux/actions/authActions";
import { AUTH_STORE_SUCCESS, LOADING, MOBILE_STORE_SUCCESS, RESET_ERROR } from "../../Redux/constants/authConstants";
import reactotron from "reactotron-react-native";
import CommonLoginButton from "../../components/CommonLoginButton";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { background } from "native-base/lib/typescript/theme/styled-system";
import CommonOTP from "../../components/CommonOTP";
import customAxios from "../../CustomeAxios";
import { CommonActions } from "@react-navigation/native";
const Otp = ({ navigation, route }) => {
	const dispatch = useDispatch()
	const toast = useToast()
	const { res, regData } = route.params;

	const [paramsCall, setParamCall] = useState(null);
  
	const { mobileNumber, user, loginSuccess, error } = useSelector(state => state.auth);

	const schema = yup.object({
		otp: yup.number().required('OTP is required'),

	}).required();

	const { control, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	});



	const SubmitForm = async (data) => {
		if (res != null) {

			let val = {
				id: paramsCall?.id,
				otp: data?.otp
			}
			dispatch({
				type: LOADING,
				payload: true
			})
			await customAxios.post(`auth/patient/register_verification`, val)
				.then(async res => {
					dispatch({
						type: LOADING,
						payload: false
					})
					if (!toast.isActive("error")) {
						toast.show({
							id: "error",
							title: 'Success',
							description: "Login Success",
							backgroundColor: 'success.500'
						})
					}
					else{
						navigation.navigate('login')
					}
					
				})
				.catch(async error => {
					toast.show({
						description: `${error}`,
						background: 'error.500'
					})
					dispatch({
						type: LOADING,
						payload: false
					})
				});

		} else {
			let value = {
				mobile: mobileNumber?.mobile,
				otp: data?.otp
			}
			dispatch(postLogin(value))
		}

	}




	const ResndOTP = async () => {
		if (paramsCall === null) {
			let val = {
				mobile: mobileNumber?.mobile,
				role:'patient'
			}
			dispatch(postLoginOtp(val))

		} else {
			dispatch({
				type: LOADING,
				payload: true
			})
			await customAxios.post(`auth/patient/register`, regData)
				.then(async res => {
					setParamCall(res?.data)
					dispatch({
						type: LOADING,
						payload: false
					})
					toast.show({
						title: `${'OTP Send'}`,
						backgroundColor: '#047AC3'
					})
				})
				.catch(async error => {
					toast.show({
						title: `${error?.message}`,
						background: 'error.500'
					})
					dispatch({
						type: LOADING,
						payload: false
					})
				});
		}
	}


	useEffect(() => {
		if (res) {
			setParamCall(res)
		}
	}, [res])



	useEffect(() => {
		if (loginSuccess) {
			dispatch({
				type: RESET_ERROR
			})
			toast.show({
				title: 'LOGIN SUCCESS',
				backgroundColor: '#047AC3'

			})
			// navigation.navigate('Menu')
			navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [
                    { name: 'Menu' }
                  ],
                })
            );
			dispatch({
				type: MOBILE_STORE_SUCCESS,
				payload: null
			})
		
		}
		if (error) {
			dispatch({
				type: RESET_ERROR
			})
			toast.show({
				title: 'ERROR',
				description: error
			})
		}
	}, [loginSuccess, error])


	return (
		<ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
			<ScrollView mb={5}>
				<Box alignItems={'center'} px={5} pt={20}>

					<CustomLogo size={140} />
					<Text color={'#444444'} fontWeight={500} letterSpacing={3} fontSize={25} mt={5} >OTP</Text>
					<Text color={'#444444'} fontWeight={500} letterSpacing={1} fontSize={14} mt={5} px={6} textAlign={'center'}>
						A OTP has been sent to your registered mobile number
					</Text>
					<VStack justifyContent={'center'} px={10}>
						<CommonOTP
							control={control}
							error={errors.otp}
							fieldName="otp"
						/>
						<TouchableOpacity
							onPress={ResndOTP}
						>
							<Box alignItems={'flex-end'}>
								<Text fontSize={'14px'} fontWeight={'bold'} color={'#047AC3'}>Resend OTP?</Text>
							</Box>
						</TouchableOpacity>
					</VStack>
					<CommonLoginButton
						mt={10}
						onPress={handleSubmit(SubmitForm)}
					/>
				</Box>
			</ScrollView>
		</ImageBackground>
	)
}

export default Otp

const styles = StyleSheet.create({
	image: {
		flex: 1,
		//justifyContent: "center"
	},

})
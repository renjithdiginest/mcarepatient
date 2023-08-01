import { ImageBackground, StyleSheet } from "react-native";
import React, { useEffect } from 'react'
import { Box, Text, Image, Button, Icon, ScrollView, Pressable, useToast, VStack } from 'native-base'
import backgroundImage from "../../images/maskgroup.png"
import CustomLogo from "../../components/CustomLogo";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { postLogin, postMobileReg } from "../../Redux/actions/authActions";
import { AUTH_STORE_SUCCESS, RESET_ERROR } from "../../Redux/constants/authConstants";
import reactotron from "reactotron-react-native";
import CommonLoginButton from "../../components/CommonLoginButton";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import CommonOTP from "../../components/CommonOTP";
import { CommonActions } from "@react-navigation/native";
const Otp = ({ navigation }) => {
	const dispatch = useDispatch()
	const toast = useToast()
	const { mobileNumber, user, loginSuccess, error } = useSelector(state => state.auth);
	reactotron.log(user)
	const schema = yup.object({
		otp: yup.number().required('OTP is required'),

	}).required();

	const { control, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	});


	const SubmitForm = (data) => {
		let value = {
			mobile: mobileNumber?.mobile,
			otp: data?.otp
		}
		dispatch(postLogin(value))
	}


	const ResndOTP = () => {
		let val = {
			mobile: mobileNumber?.mobile,
			role:'doctor'
		}
		dispatch(postMobileReg(val))
	}

	useEffect(() => {
		if (loginSuccess) {
			dispatch({
				type: RESET_ERROR
			})
			toast.show({
				title: 'LOGIN SUCCESS',
				backgroundColor: '#047AC3'

			})
			navigation.dispatch(
				CommonActions.reset({
					index: 1,
					routes: [
						{ name: 'tab' }
					],
				})
			);
		}
		if (error) {
			reactotron.log({error},'error')
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
					<Pressable alignItems={'flex-end'} onPress={ResndOTP} >
						<Text fontSize={'14px'} fontWeight={'bold'} color={'#047AC3'}>Resend OTP?</Text>
					</Pressable>
				</VStack>
				<CommonLoginButton mt={10} onPress={handleSubmit(SubmitForm)} />
			</Box>
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
import { ImageBackground, StyleSheet } from "react-native";
import React, { useEffect } from 'react'
import { Box, Text, Image, Button, Icon, ScrollView, Pressable, useToast, VStack } from 'native-base'
import backgroundImage from "../../images/maskgroup.png"
import CustomLogo from "../../components/CustomLogo";
import mail from "../../images/email.png"
import lock from '../../images/lock.png'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CommonActionButton from "../../components/CommonActionButton";
import { useDispatch, useSelector } from "react-redux";
import { postLogin, postMobileReg, registerVerify } from "../../Redux/actions/authActions";
import { AUTH_STORE_SUCCESS, RESET_ERROR } from "../../Redux/constants/authConstants";
import reactotron from "reactotron-react-native";
import CommonLoginButton from "../../components/CommonLoginButton";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { background } from "native-base/lib/typescript/theme/styled-system";
import CommonOTP from "../../components/CommonOTP";


const RegisterVerifyOTP = ({ navigation }) => {
	const dispatch = useDispatch()
	const toast = useToast()
	const { mobileNumber, user, loginSuccess, error, regId, RegVerifySuccess } = useSelector(state => state.auth);
	// reactotron.log({regId})
	const schema = yup.object({
		otp: yup.number().required('OTP is required'),

	}).required();

	const { control, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	});

  	// reactotron.log({mobileNumber})s

	const SubmitForm = (data) => {
		let datas = {
			id: regId,
			otp: data?.otp
		}
		dispatch(registerVerify(datas))
	}


	// const ResndOTP =()=>{
	// 	let val ={
	// 		mobile:mobileNumber?.mobile
	// 	}
	//     dispatch(postMobileReg(val))
	// }

	useEffect(() => {
		if (RegVerifySuccess) {
			dispatch({
				type: RESET_ERROR
			})
			toast.show({
				title: 'REGISTER SUCCESS',
				backgroundColor: '#047AC3'

			})
			navigation.navigate('login')
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
	}, [RegVerifySuccess, error])


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
					<Pressable 
                        // onPress={ResndOTP} 
                        alignItems={'flex-end'} 
                    >
						<Text fontSize={'14px'} fontWeight={'bold'} color={'#047AC3'}>Resend OTP?</Text>
					</Pressable>
				</VStack>
				<CommonLoginButton mt={10} onPress={handleSubmit(SubmitForm)} />
			</Box>
		</ImageBackground>
	)
}

export default RegisterVerifyOTP

const styles = StyleSheet.create({
	image: {
		flex: 1,
		//justifyContent: "center"
	},

})
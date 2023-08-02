import { ImageBackground, StyleSheet, Keyboard } from "react-native";
import React, { useEffect } from 'react'
import { Box, Text, Image, Button, Icon, ScrollView, Pressable, useToast } from 'native-base'
import backgroundImage from "../../images/maskgroup.png"
import CustomLogo from "../../components/CustomLogo";
import CustomInput from "../../components/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CommonActionButton from "../../components/CommonActionButton";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_STORE_SUCCESS, MOBILE_STORE_SUCCESS, RESET_AUTH, RESET_ERROR } from "../../Redux/constants/authConstants";
import { postLoginOtp, postMobileReg } from "../../Redux/actions/authActions";
import CommonLoginButton from "../../components/CommonLoginButton";
import phone from '../../images/telephone.png'
import CustomButton from "../../components/CustomButton";
import reactotron from "reactotron-react-native";

const Login = ({ navigation }) => {
	const { mobileRegSuccess, error } = useSelector(state => state.auth);
	const dispatch = useDispatch()
	const toast = useToast()
	const match = '^[0-9\]{9,15}$'
	const schema = yup.object({
		mobile: yup.string().min(10, 'Mobile number must be 10 number').
			max(10, 'Mobile number must be 10 number').
			matches(match, 'A phone number must be number').
			required('A phone number is required')
	}).required();

	const { control, handleSubmit, formState: { errors }, setValue } = useForm({

		defaultValues:{
             role:'patient'
		},
		resolver: yupResolver(schema)
		
	});

	const SubmitForm = (data) => {
		Keyboard.dismiss()
		dispatch({
			type: MOBILE_STORE_SUCCESS,
			payload: data
		})
		dispatch(postLoginOtp(data))
		
	}

	useEffect(() => {
		if (mobileRegSuccess) {
			dispatch({
				type: RESET_ERROR
			})
			navigation.navigate('otp', {
				res: null,
				regData: null
			})
		}

		if (error) {
			dispatch({
				type: RESET_ERROR
			})
			toast.show({
				title: `Error`,
				description: error,
				background: 'error.500'
			})
		}
	}, [mobileRegSuccess, error])

	return (

		<ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
			<ScrollView px={6} mt={20}>
				<Box alignItems={'center'}>
					<CustomLogo size={140} />
					<Text color={'#444444'} fontWeight={500} letterSpacing={3} fontSize={25} mt={5} >LOGIN</Text>
					<Box w={'100%'}>
						<CustomInput
							control={control}
							error={errors.mobile}
							fieldName="mobile"
							placeholder='Enter Your Mobile Number'
							leftIconName={phone}
							inputType={'number'}
							keyboardType="phone-pad"
						/>
					</Box>
					<CommonLoginButton
						mt={10}
						// onPress={()=>navigation.navigate('otp')}
						onPress={handleSubmit(SubmitForm)}
					/>
					<Box py={8} alignItems={'center'}>
						<Text color={'#444444'} fontWeight={700} letterSpacing={.5} fontSize={18} mt={5} >Don't have an account yet?</Text>
						<CustomButton mt={2} login={true} label={'Register'} onPress={() => navigation.navigate('register')} />
					</Box>
				</Box>
			</ScrollView>
		</ImageBackground>
	)
}

export default Login

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		flex: 1
	},
	box: {
		backgroundColor: "white",
	}
})
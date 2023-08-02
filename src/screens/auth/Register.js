import { ImageBackground, StyleSheet, Keyboard } from "react-native";
import React, { useEffect, useState } from 'react'
import { Box, Text, Image, Button, Icon, ScrollView, Pressable, useToast, HStack } from 'native-base'
import backgroundImage from "../../images/maskgroup.png"
import CustomLogo from "../../components/CustomLogo";
import CustomInput from "../../components/CustomInput";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_STORE_SUCCESS, LOADING, RESET_AUTH, RESET_ERROR } from "../../Redux/constants/authConstants";
import { postMobileReg, register } from "../../Redux/actions/authActions";
import CommonLoginButton from "../../components/CommonLoginButton";
import CommonTitle from "../../components/CommonTitle";
import AuthBtn from "./AuthBtn";
import CommonSelectInput from "../../components/CommonSelectInput";
import moment from 'moment';
import DatePicker from 'react-native-date-picker'
import reactotron from "../../ReactotronConfig";
import CustomInputIcon from "../../components/CustomInputIcon";
import customAxios from "../../CustomeAxios";


const Register = ({ navigation }) => {

	const [showStatus, setShowStatus] = useState(null)
	const [date, setDate] = useState(new Date())
	const [open, setOpen] = useState(false)
	const [resData, setRes] = useState(null)
	const dispatch = useDispatch()
	const toast = useToast()

	const schema = yup.object({
		name: yup.string().required('Required'),
		mobile: yup.string().min(8).required('Required'),
		email: yup.string().email(),
		// dob: yup.string().required('Date of Birth is required'),
		gender: yup.string().required('Required'),

	}).required();

	const { control, handleSubmit, formState: { errors }, setValue, setError } = useForm({
		resolver: yupResolver(schema)
	});


	gender = [
		{
			_id: '1',
			Name: 'Male'
		},
		{
			_id: '2',
			Name: 'Female'
		},
		{
			_id: '3',
			Name: 'Other'
		},
	]

	const RegisterSubmit = async (data) => {
		Keyboard.dismiss()
		dispatch({
			type: LOADING,
			payload: true
		})
		await customAxios.post(`auth/patient/register`, data)
			.then(async res => {

				dispatch({
					type: LOADING,
					payload: false
				})
				toast.show({
					title: `${'OTP Send'}`,
					backgroundColor: '#047AC3'
				})
				navigation.navigate('otp', {
					res: res?.data,
					regData: data
				})
			})
			.catch(async error => {

		
				toast.show({
					title: `Error`,
					background: 'error.500',
					description: error
				})
				dispatch({
					type: LOADING,
					payload: false
				})
			});
	}

	return (

		<ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
			<Box alignItems={'center'} px={10} mt={5}>
				<CustomLogo size={105} mt={-8} />
				<Text color={'#444444'} fontWeight={600} letterSpacing={1} fontSize={22} mt={3} >REGISTER</Text>
				<ScrollView h={'75%'} showsVerticalScrollIndicator={false}>
					<CustomInput
						control={control}
						error={errors.name}
						fieldName="name"
						placeholder='Patient Name'
					// inputType={'number'}
					/>

					<CustomInput
						control={control}
						error={errors.mobile}
						fieldName="mobile"
						placeholder='Mobile Number'
						keyboardType="phone-pad"

					/>

					<CustomInput
						control={control}
						error={errors.email}
						fieldName="email"
						placeholder='Email Address'
						inputType={'email-address'}
					/>

					<CustomInputIcon
						readonly={true}
						control={control}
						error={errors.dob}
						fieldName="dob"
						placeholder='DOB'
						material={'date-range'}
						onpress={() => setOpen(true)}
					/>

					<CommonSelectInput
						customweight={'300'}
						placeholder={'Gender'}
						control={control}
						error={errors.gender}
						fieldName="gender"
						backgroundColor={'#fff'}
						selectedValue={showStatus}
						width={280}
						changeValue={(value) => {
							setShowStatus(value)
							setValue('gender', value)
							setError('gender', '')
						}}
						optlabel={"Name"}
						optValue={"Name"}
						options={gender}

					/>
					<Box alignItems={'center'}>
						<CommonLoginButton
							onPress={handleSubmit(RegisterSubmit)}
							mt={5} height={45} width={60} size={25}
						/>
					</Box>

					<Box alignItems={'center'}>
						<CommonTitle label={"Already have an account?"} mt={2} />
						<AuthBtn
							onPress={() => navigation.navigate('login')}
							label={'LOGIN'} mt={5}
						/>
					</Box>

				</ScrollView>


			</Box>
			{open && 
			<DatePicker
				modal
				open={open}
				date={date}
				mode={'date'}
				onConfirm={(date) => {
					setValue('dob', moment(date).format('DD-MM-YYYY'))
					setOpen(false)
					setDate(date)

				}}
				onCancel={() => {
					setOpen(false)
				}}
			/>}
		</ImageBackground>
	)
}

export default Register

const styles = StyleSheet.create({

	image: {
		flex: 1
	},

})
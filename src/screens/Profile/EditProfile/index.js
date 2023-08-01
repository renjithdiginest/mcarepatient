import { Keyboard, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomBackground from '../../../components/CustomBackground'
import { Box, ScrollView, Text, VStack, Image, useToast, Spinner, HStack, Avatar, Center } from 'native-base'
import CommonHeading from '../../../components/CommonHeading'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CommonInput from '../../../components/CommonInput'
// import CommonSelectInput from '../../../components/CommonSelectInput'
import TextAreaInput from '../../../components/TextAreaInput'
// import CustomButton from '../../../components/CustomButton'
// import CommonActionButton from '../../../components/CommonActionButton'
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import CommonImageUploader from '../../../components/CommonImageUploader'
// import ImagePicker from 'react-native-image-picker';
import reactotron from 'reactotron-react-native'
import { useDispatch, useSelector } from 'react-redux'
import { editDocProfile, getProfile } from '../../../Redux/actions/profileActions'
import { RESET_ERROR } from '../../../Redux/constants/authConstants'
const EditProfile = ({ navigation }) => {

	const dispatch = useDispatch()
	const toast = useToast()
	const { user, loading } = useSelector(state => state.auth);
	const { profileEdited, error } = useSelector(state => state.profile);
	const [preview, setPreview] = useState(null)
	const [filePath, setFilePath] = useState(null);



	const schema = yup.object({
		// name: yup.string().required('Required'),
		// specialization: yup.string().required('Required'),
		// qualifications: yup.string().required('Required'),
		// expertise: yup.string().required('Required'),

	}).required();

	const { control, handleSubmit, formState: { errors }, setValue } = useForm({
		resolver: yupResolver(schema)
	});

	// const imageGalleryLaunch = () => {
	// 	let options = {
	// 		storageOptions: {
	// 			skipBackup: true,
	// 			path: 'images',
	// 		},

	// 	};
	// 	launchImageLibrary(options, (res) => {
	// 		if (res.didCancel) {
	// 			// console.log('User cancelled image picker');
	// 		} else if (res.error) {
	// 			setFilePath(null)
	// 		} else if (res.customButton) {
	// 			// console.log('User tapped custom button: ', res.customButton);
	// 			// alert(res.customButton);
	// 		} else {
	// 			const source = { uri: res.uri };
	// 			setFilePath(res)
	// 		}
	// 	});
	// }

	// const SubmitForm = (data) => {
	// 	Keyboard.dismiss()
	// 	const formData = new FormData();
	// 	formData.append('id', user?.user_id);
	// 	formData.append('department', user?.department);
	// 	formData.append('name', data?.name);
	// 	formData.append('specialization', data?.specialization);
	// 	formData.append('qualifications', data?.qualifications);
	// 	formData.append('expertise', data?.expertise);
	// 	if (filePath) {
	// 		formData.append('image', {
	// 			name: filePath?.assets?.[0]?.fileName,
	// 			type: filePath?.assets?.[0]?.type,
	// 			uri: filePath?.assets?.[0]?.uri
	// 		});
	// 	}

	// 	dispatch(editDocProfile(formData))

	// }



	useEffect(() => {
		if (user) {
			setValue('name', user?.name)
			setValue('specialization', user?.specialization)
			setValue('qualifications', user?.qualifications)
			setValue('expertise', user?.expertise)
			setPreview(user?.image)
		}
		dispatch(getProfile(user?.user_id))
	}, [])


	useEffect(() => {
		if (profileEdited) {
			dispatch({
				type: RESET_ERROR
			})
			toast.show({
				title: `Profile Updated`,
				background: '#047AC3',
				placement: "top"
			})

		}
		if (error) {
			dispatch({
				type: RESET_ERROR
			})
			toast.show({
				title: `Error`,
				description: JSON.parse(error),
				background: 'error.500'
			})
		}
	}, [profileEdited, error])

	return (
		<CustomBackground>
			<Box px={6} pt={5}>
				<CommonHeading goBack={() => navigation.goBack()} />
				<ScrollView showsVerticalScrollIndicator={false} mb={5} mt={5} h={'85%'} keyboardShouldPersistTaps="always">
			
						{/* <CommonImageUploader onpress={imageGalleryLaunch} galleryImg={filePath?.assets?.[0]?.uri} preview={preview} DocLabel={user?.doctor_id} DeptLabel={user?.department_name} /> */}
						<Center justifyContent={'center'} w={'100%'}>
							<Image
								width={130} height={130} borderRadius={25}
								source={{ uri: preview }} alt='img' shadow={5}
							/>
							<Text mt={1} color={'#444444'} opacity={70} letterSpacing={1} fontSize={14}>Docter ID : {user?.doctor_id}</Text>
							<Text mt={.2} color={'#444444'} opacity={70} letterSpacing={1} fontSize={14}>Department :{user?.department_name} </Text>
						</Center>
						<CommonInput
							control={control}
							error={errors.name}
							fieldName="name"
							placeholder='Enter Your Name'
							label={'Name'}
							mt={3}
							mb={2}
							editable={false}
							
						/>
						<CommonInput
							control={control}
							error={errors.specialization}
							fieldName="specialization"
							placeholder='Specialization'
							inputType={'number'}
							label={'Specialization'}
							mt={3}
							mb={2}
							editable={false}
						/>
						<CommonInput
							control={control}
							error={errors.qualifications}
							fieldName="qualifications"
							placeholder='Qualifications'
							inputType={'number'}
							label={'Qualifications'}
							mt={3}
							mb={2}
							editable={false}
						/>
						<TextAreaInput
							control={control}
							error={errors.expertise}
							fieldName="expertise"
							label={'Area of Expertise'}
							mt={3}
							bg={'#fff'}
							editable={false}
						/>
						{/* <Box alignItems={'center'} mt={8} mb={10}>
							<CommonActionButton width={100} onPress={handleSubmit(SubmitForm)} >
								<Box justifyContent={'center'}>
									<Text color={'#fff'} fontWeight={'bold'}>{loading ? <Spinner color={'#fff'} /> : ' UPDATE'}</Text>
								</Box>
							</CommonActionButton>
						</Box> */}

		
				</ScrollView>
			</Box>
		</CustomBackground>
	)
}

export default EditProfile

const styles = StyleSheet.create({})
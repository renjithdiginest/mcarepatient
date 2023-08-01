import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import CustomBackground from '../../../components/CustomBackground'
import CommonHeading from '../../../components/CommonHeading'
import { Box, ScrollView, Button, HStack, Pressable, Icon, Text, VStack, useToast, Spinner } from 'native-base'
import CustomFromTimePicker from '../../../components/CustomFromTimePicker'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonActionButton from '../../../components/CommonActionButton'
import CommonInput from '../../../components/CommonInput'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux'
import reactotron from 'reactotron-react-native'
import moment from 'moment'
import { getProfile, postAddTimmings } from '../../../Redux/actions/profileActions'
import { RESET_ERROR } from '../../../Redux/constants/authConstants'
const TimeManagement = ({ navigation }) => {

	const { user, error, loading } = useSelector(state => state.auth);
	const { timingsListSuccess } = useSelector(state => state.profile);
	const toast = useToast()

	const dispatch = useDispatch()
	const schema = yup.object({
		interval: yup.number().required('Interval is Required')
	}).required();

	const { control, handleSubmit, formState: { errors }, setValue } = useForm({
		resolver: yupResolver(schema)
	});

	const { height, width } = useWindowDimensions()


	const [dates, setDates] = useState({
		monday: [
			{ from: null, to: null },
		],
		tuesday: [
			{ from: null, to: null },
		],
		wednesday: [
			{ from: null, to: null },
		],
		thursday: [
			{ from: null, to: null },
		],
		friday: [
			{ from: null, to: null },
		],
		saturday: [
			{ from: null, to: null },
		],
		sunday: [
			{ from: null, to: null },
		]
	})


	const handleAdd = (day) => {
		dates[day].push({ from: null, to: null })
		setDates({
			...dates
		})
	}

	const handleRemove = (day, index) => {
		let filterdatas = dates[day].filter((da, i) => i !== index)
		dates[day] = filterdatas
		setDates({
			...dates
		})
	}

	const changeDate = (date, day, mode, index) => {
		dates[day][index][mode] = date;
		reactotron.log({date})
		setDates({
			...dates
		})
	}

	useEffect(() => {
		if (user) {
			setDates(JSON.parse(user?.dateObject))
		}
		setValue('interval', user?.interval)
	}, [user])

	const SubmitForm = (DATA) => {

		let days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
		let datess = [];
		days.map(da => {
			dates[da].map(ti => {
				datess.push({ day: da, from: ti.from ? moment(ti.from).format("HH:mm") : null, to: ti.to ? moment(ti.to).format("HH:mm") : null })
			})
		})

		let value = {
			interval: DATA?.interval,
			id: user?._id,
			dateObject: JSON.stringify(dates),
			time: datess
		}

		dispatch(postAddTimmings(value))

	}


	useEffect(() => {
		dispatch(getProfile(user?.user_id))
	}, [])


	useEffect(() => {
		if (timingsListSuccess) {
			dispatch({
				type: RESET_ERROR
			})
			toast.show({
				title: `Timing Updated`,
				background: '#047AC3',
				placement: "top"
			})

		}
		if (error) {
			dispatch({
				type: RESET_ERROR
			})
			toast.show({
				title: `${error?.message}`,
				background: 'error.500'
			})
		}
	}, [timingsListSuccess, error])


	return (
		<CustomBackground>
			<Box px={5} pt={5}>
				<CommonHeading label={'Time Management'} goBack={() => navigation.goBack()} />
				<ScrollView showsVerticalScrollIndicator={false} h={height/1.45}>
					<Box mt={2} px={1}>
						<CommonInput
							control={control}
							error={errors.interval}
							fieldName="interval"
							placeholder='Enter Interval'
							inputType={'number'}
							label={'Interval (Minutes)'}
							mt={4}
						/>

					</Box>
					<Box mt={1}>
						<Text fontSize={16} fontWeight={'bold'} ml={2}>{"Monday"}</Text>
						{dates?.monday?.map((day, index) => (
							<HStack mt={1} key={index} alignItems={'center'}>
								<CustomFromTimePicker
									date={day?.from ? new Date(day.from) : null}
									handleChangeTime={(date) => changeDate(date, 'monday', 'from', index)}
									placeholder={'From time'}
								/>
								<CustomFromTimePicker
									date={day.to ? new Date(day.to) : null}
									handleChangeTime={(date) => changeDate(date, 'monday', 'to', index)}
									placeholder={'To time'}
								/>
								{index === 0 ? <CommonActionButton onPress={() => handleAdd('monday')}>
									<Icon as={<Ionicons />} name='add-outline' color={'#fff'} size={25} />
								</CommonActionButton>
									: <CommonActionButton onPress={() => handleRemove('monday', index)}>
										<Icon as={<Ionicons />} name='trash-outline' color={'#FF0000'} size={25} />
									</CommonActionButton>
								}

							</HStack>))}
					</Box>
					<Box mt={2}>
						<Text fontSize={16} fontWeight={'bold'} ml={2}>{"Tuesday"}</Text>
						{dates?.tuesday?.map((day, index) => (
							<HStack mt={1} key={index}  alignItems={'center'}>
								<CustomFromTimePicker
									date={day?.from ? new Date(day.from) : null}
									handleChangeTime={(date) => changeDate(date, 'tuesday', 'from', index)}
									placeholder={'From time'}
								/>
								<CustomFromTimePicker
									date={day.to ? new Date(day.to) : null}
									handleChangeTime={(date) => changeDate(date, 'tuesday', 'to', index)}
									placeholder={'To time'}
								/>
								{index === 0 ? <CommonActionButton onPress={() => handleAdd('tuesday')}>
									<Icon as={<Ionicons />} name='add-outline' color={'#fff'} size={25} />
								</CommonActionButton>
									: <CommonActionButton onPress={() => handleRemove('tuesday', index)}>
										<Icon as={<Ionicons />} name='trash-outline' color={'#FF0000'} size={25} />
									</CommonActionButton>
								}
							</HStack>))}
					</Box>
					<Box mt={2}>
						<Text fontSize={16} fontWeight={'bold'} ml={2}>{"Wednesday"}</Text>
						{dates?.wednesday?.map((day, index) => (
							<HStack mt={1} key={index}  alignItems={'center'}>
								<CustomFromTimePicker
									date={day?.from ? new Date(day.from) : null}
									handleChangeTime={(date) => changeDate(date, 'wednesday', 'from', index)}
									placeholder={'From time'}
								/>
								<CustomFromTimePicker
									date={day.to ? new Date(day.to) : null}
									handleChangeTime={(date) => changeDate(date, 'wednesday', 'to', index)}
									placeholder={'To time'}
								/>
								{index === 0 ? <CommonActionButton onPress={() => handleAdd('wednesday')}>
									<Icon as={<Ionicons />} name='add-outline' color={'#fff'} size={25} />
								</CommonActionButton>
									: <CommonActionButton onPress={() => handleRemove('wednesday', index)}>
										<Icon as={<Ionicons />} name='trash-outline' color={'#FF0000'} size={25} />
									</CommonActionButton>
								}
							</HStack>))}
					</Box>
					<Box mt={2}>
						<Text fontSize={16} fontWeight={'bold'} ml={2}>{"Thursday"}</Text>
						{dates?.thursday?.map((day, index) => (
							<HStack mt={1} key={index} alignItems={'center'}>
								<CustomFromTimePicker
									date={day?.from ? new Date(day.from) : null}
									handleChangeTime={(date) => changeDate(date, 'thursday', 'from', index)}
									placeholder={'From time'}
								/>
								<CustomFromTimePicker
									date={day.to ? new Date(day.to) : null}
									handleChangeTime={(date) => changeDate(date, 'thursday', 'to', index)}
									placeholder={'To time'}
								/>
								{index === 0 ? <CommonActionButton onPress={() => handleAdd('thursday')}>
									<Icon as={<Ionicons />} name='add-outline' color={'#fff'} size={25} />
								</CommonActionButton>
									: <CommonActionButton onPress={() => handleRemove('thursday', index)}>
										<Icon as={<Ionicons />} name='trash-outline' color={'#FF0000'} size={25} />
									</CommonActionButton>
								}

							</HStack>))}
					</Box>
					<Box mt={2}>
						<Text fontSize={16} fontWeight={'bold'} ml={2}>{"Friday"}</Text>
						{dates?.friday?.map((day, index) => (
							<HStack mt={1} key={index} alignItems={'center'}>
								<CustomFromTimePicker
									date={day?.from ? new Date(day.from) : null}
									handleChangeTime={(date) => changeDate(date, 'friday', 'from', index)}
									placeholder={'From time'}
								/>
								<CustomFromTimePicker
									date={day.to ? new Date(day.to) : null}
									handleChangeTime={(date) => changeDate(date, 'friday', 'to', index)}
									placeholder={'To time'}
								/>
								{index === 0 ? <CommonActionButton onPress={() => handleAdd('friday')}>
									<Icon as={<Ionicons />} name='add-outline' color={'#fff'} size={25} />
								</CommonActionButton>
									: <CommonActionButton onPress={() => handleRemove('friday', index)}>
										<Icon as={<Ionicons />} name='trash-outline' color={'#FF0000'} size={25} />
									</CommonActionButton>
								}

							</HStack>))}
					</Box>
					<Box mt={2}>
						<Text fontSize={16} fontWeight={'bold'} ml={2}>{"Saturday"}</Text>
						{dates?.saturday?.map((day, index) => (
							<HStack mt={1} key={index} alignItems={'center'}>
								<CustomFromTimePicker
									date={day?.from ? new Date(day.from) : null}
									handleChangeTime={(date) => changeDate(date, 'saturday', 'from', index)}
									placeholder={'From time'}
								/>
								<CustomFromTimePicker
									date={day.to ? new Date(day.to) : null}
									handleChangeTime={(date) => changeDate(date, 'saturday', 'to', index)}
									placeholder={'To time'}
								/>
								{index === 0 ? <CommonActionButton onPress={() => handleAdd('saturday')}>
									<Icon as={<Ionicons />} name='add-outline' color={'#fff'} size={25} />
								</CommonActionButton>
									: <CommonActionButton onPress={() => handleRemove('saturday', index)}>
										<Icon as={<Ionicons />} name='trash-outline' color={'#FF0000'} size={25} />
									</CommonActionButton>
								}

							</HStack>))}
					</Box>
					<Box mt={2}>
						<Text fontSize={16} fontWeight={'bold'} ml={2}>{"Sunday"}</Text>
						{dates?.sunday?.map((day, index) => (
							<HStack mt={1} key={index} alignItems={'center'}>
								<CustomFromTimePicker
									date={day?.from ? new Date(day.from) : null}
									handleChangeTime={(date) => changeDate(date, 'sunday', 'from', index)}
									placeholder={'From time'}
								/>
								<CustomFromTimePicker
									date={day.to ? new Date(day.to) : null}
									handleChangeTime={(date) => changeDate(date, 'sunday', 'to', index)}
									placeholder={'To time'}
								/>
								{index === 0 ? <CommonActionButton onPress={() => handleAdd('sunday')}>
									<Icon as={<Ionicons />} name='add-outline' color={'#fff'} size={25} />
								</CommonActionButton>
									: <CommonActionButton onPress={() => handleRemove('sunday', index)}>
										<Icon as={<Ionicons />} name='trash-outline' color={'#FF0000'} size={25} />
									</CommonActionButton>
								}
							</HStack>))}
					</Box>
					<Box justifyContent={'center'} my={5} px={20} alignItems={'center'}>
						<CommonActionButton onPress={handleSubmit(SubmitForm)} width={100}>
							<Box alignItems={'center'} justifyContent={'center'}>
								<Text fontFamily={'body'} color={'white'}>{loading ? <Spinner color="#fff" /> : 'UPDATE'}</Text>
							</Box>
						</CommonActionButton>
				</Box>
				</ScrollView>
				
			</Box>

		</CustomBackground>
	)
}

export default TimeManagement

const styles = StyleSheet.create({})
import { View } from 'react-native'
import React, { useState } from 'react'
import { Box, Button, FormControl, Input, Modal, Select, Spinner, Text, useToast, VStack } from "native-base";
import CustomButton from '../../components/CustomButton';
import CustomInputIcon from '../../components/CustomInputIcon';
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import reactotron from 'reactotron-react-native';
import { useDispatch, useSelector } from 'react-redux';

import CommonSelectInput from '../../components/CommonSelectInput';
import { consultBookingAvailibility, consultBookingReschedule } from '../../Redux/actions/consultationActions';
import customAxios from '../../CustomeAxios';
import { LOADING } from '../../Redux/constants/authConstants';

const RescheduleModal = ({ setShowModal, showModal, item, rescheduleBooking }) => {
	const dispatch = useDispatch()

	const [AvailibiltyTimeList, setAvailibiltyTimeList] = useState(null)
	const { loading } = useSelector(state => state.auth);

	const [date, setDate] = useState(new Date())
	const [open, setOpen] = useState(false)

	const toast = useToast()

	const schema = yup.object({
		time: yup.string().required('required')
	}).required();

	const { control, handleSubmit, formState: { errors }, setValue, setError } = useForm({
		resolver: yupResolver(schema)
	});

	const onChangeDate = async (result) => {
		let url = ""
		let value = {};
		if(item?.type === "procedure"){
			url = "patient/procedure/time"
			value = {
				date: moment(result).format('YYYY-MM-DD'),
				procedure_id: item?.procedure_id?.[0]?.id
			}
		}
		else if(item?.type === "service"){
			url = "patient/service/time"
			value = {
				date: moment(result).format('YYYY-MM-DD'),
				service_id: item?.service_id?.[0]?.id
			}
		}
		else{
			value = {
				doctor_id: item?.doctor_id,
				date: moment(result).format('YYYY-MM-DD'),
				type: item?.appointmenttype
			}
			url = "patient/consultation/doctor/availability"
		}
		
		//dispatch(consultBookingAvailibility(value))
		dispatch({
			type: LOADING,
			payload: true
		})
		await customAxios.post(url, value)
			.then(async response => {
				let data = response?.data?.data
				setAvailibiltyTimeList(data)
				dispatch({
					type: LOADING,
					payload: false
				})
			})
			.catch(async error => {
				setAvailibiltyTimeList(null)
				toast.show({
					title: "Error",
					description: error,
					backgroundColor: "error.500"
				})
				
				dispatch({
					type: LOADING,
					payload: false
				})
			})
	}


	const SubmitForm = (data) => {

		let datas = {
			item,
			date: moment(data?.dateTime, "DD-MM-YYYY").format("YYYY-MM-DD"),
			time: data?.time
		}
		
		rescheduleBooking(datas)


	}


	return (
		<>
			<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
				<Modal.Content maxWidth="400px">
					<Modal.CloseButton />
					<Box px={5} mt={2} alignItems={'center'}>
						<Text color={'#047AC3'} fontWeight={'bold'} fontSize={'24'} letterSpacing={1}>Reschedule</Text>
					</Box>
					<VStack alignItems={'center'}>
					
						<CustomInputIcon
                            ml={5}
                            label={'Date'}
							width={230}
							control={control}
							error={errors.dateTime}
							fieldName="dateTime"
							placeholder='dd/mm/yyyy'
							material={'date-range'}
							onpress={() => setOpen(true)}
						/>

						<CommonSelectInput
							backgroundColor={'#ffff'}
							control={control}
							error={errors.time}
							fieldName="time"
							label={'Time'}
							mt={4}
							width={230}
							changeValue={(value) => {
								setValue('time', value)
								setError('time', '')

							}}
							optlabel={"time"}
							optValue={'time'}
							options={AvailibiltyTimeList?.time ? AvailibiltyTimeList?.time.filter(res => res?.patient_id === null) : []}
						>
							{AvailibiltyTimeList?.time.filter(res => res?.patient_id === null).map((time, i) => (
								<Select.Item key={i} label={moment(time?.time, "HH:mm").format("hh:mm A")} value={time.time} />
							))}
						</CommonSelectInput>
					</VStack>
					<Box py={5} alignItems={'center'} justifyContent={'center'}>
						<CustomButton onPress={handleSubmit(SubmitForm)} label={loading ? 'conforming' : 'Confirm'} selected={true} />
					</Box >
				</Modal.Content>
				{open && <DatePicker
					modal
					open={open}
					date={date}
					mode={'date'}
					onConfirm={(date) => {
						setValue('dateTime', moment(date).format('DD-MM-YYYY'))
						setOpen(false)
						onChangeDate(date)
					}}
					onCancel={() => {
						setOpen(false)
					}}
				/>}
			</Modal>

		</>
	)
}

export default RescheduleModal
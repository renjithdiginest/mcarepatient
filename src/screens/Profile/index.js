import { StyleSheet, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomBackground from '../../components/CustomBackground'
import CommonProfileCard from './CommonProfileCard'
import { Box, Icon, Image, ScrollView, Text, useToast, Spinner } from 'native-base'
import ProfileDp from './ProfileDp'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CommonInput from '../../components/CommonInput';
import TextAreaInput from '../../components/TextAreaInput';
import CustomInputIcon from '../../components/CustomInputIcon'
import CustomButton from '../../components/CustomButton'
import reactotron from 'reactotron-react-native'
import { useDispatch, useSelector } from 'react-redux'
import CommonSelectInput from '../../components/CommonSelectInput'
import CommonImageUploader from '../../components/CommonImageUploader'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import { editPatientProfile } from '../../Redux/actions/profileActions'
import { RESET_ERROR } from '../../Redux/constants/authConstants'
const Profile = ({ navigation }) => {

    const dispatch = useDispatch()
    const toast = useToast()
    const { user, loading, privateUser } = useSelector(state => state.auth);
    const { profileEdited, error } = useSelector(state => state.profile);
    reactotron.log({ privateUser })

    const schema = yup.object({
        name: yup.string().required('Required'),
        email: yup.string().required('Required'),
        address: yup.string().required('Required'),
        gender: yup.string().required('Required'),
        height: yup.string().required('Required'),
        weight: yup.number().required('Required'),
        dob: yup.string().required('Required'),
        blood: yup.string().required('Required'),

    }).required();

    const { control, handleSubmit, formState: { errors }, setValue,setError } = useForm({

        resolver: yupResolver(schema)
    });


    const [genderStatus, setGenderStatus] = useState("")
    const [preview, setPreview] = useState(null)
    const [filePath, setFilePath] = useState(null);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)





    useEffect(() => {
        setValue('name', user?.name)
        setValue('email', user?.email)
        setValue('address', user?.address)
        setValue('gender', user?.gender)
        setValue('height', user?.height)
        setValue('weight', user?.weight)
        setValue('dob', user?.dob)
        setValue('blood', user?.bloodgroup)
        setPreview(user?.image)
    }, [])

    const Gender = [
        {
            id: '1',
            Name: 'male'
        },
        {
            id: '2',
            Name: 'female'
        },
        {
            id: '3',
            Name: 'other'
        },
    ]



    const BloodGroup = [
        {
            id: '1',
            Name: 'A+'
        },
        {
            id: '2',
            Name: 'A-'
        },
        {
            id: '3',
            Name: 'B+'
        },
        {
            id: '4',
            Name: 'B-'
        },
        {
            id: '5',
            Name: 'O+'
        },
        {
            id: '6',
            Name: 'O-'
        },
        {
            id: '7',
            Name: 'AB+'
        },
        {
            id: '8',
            Name: 'AB-'
        },
    ]

    const imageGalleryLaunch = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },

        };
        launchImageLibrary(options, (res) => {
            if (res.didCancel) {
                // console.log('User cancelled image picker');
            } else if (res.error) {
                setFilePath(null)
            } else if (res.customButton) {
                // console.log('User tapped custom button: ', res.customButton);
                // alert(res.customButton);
            } else {
                const source = { uri: res.uri };
                setFilePath(res)
            }
        });
    }


    const SubmitForm = (data) => {
        Keyboard.dismiss()
        const formData = new FormData();
        formData.append('id', user?._id);
        formData.append('name', data?.name);
        formData.append('address', data?.address);
        formData.append('email', data?.email);
        formData.append('dob', data?.dob);
        formData.append('status', user?.status);
        formData.append('height', data?.height);
        formData.append('weight', data?.weight);
        formData.append('gender', data?.gender);
        formData.append('bloodgroup', data?.blood);
        if (filePath) {
            formData.append('image', {
                name: filePath?.assets?.[0]?.fileName,
                type: filePath?.assets?.[0]?.type,
                uri: filePath?.assets?.[0]?.uri
            });
        }

        dispatch(editPatientProfile(formData))
    }

    useEffect(() => {
        if (profileEdited) {
            
            toast.show({
                title: `Profile Updated`,
                background: '#047AC3',
                placement: "top"
            })
            dispatch({
                type: RESET_ERROR
            })

        }
        if (error) {
            dispatch({
                type: RESET_ERROR
            })
            toast.show({
                title: `Error`,
                background: 'error.500',
                description:error
            })
        }
    }, [profileEdited, error])


    return (
        <CustomBackground>
            <CommonImageUploader onpress={imageGalleryLaunch} 
            galleryImg={filePath?.assets?.[0]?.uri} preview={preview} DocLabel={user?.name} DeptLabel={user?.user_id} />
            <ScrollView>
                <Box px={6} py={2}>
                    <CommonInput
                        control={control}
                        error={errors.name}
                        fieldName="name"
                        placeholder='Name'
                        inputType={'number'}
                        label={'Name'}
                        mt={1}
                        mb={2}
                        readonly={true}
                    />
                    <CommonInput
                        control={control}
                        error={errors.email}
                        fieldName="email"
                        placeholder='email'
                        inputType={'text'}
                        label={'Email Address'}
                        mt={1}
                        mb={2}
                        readonly={true}

                    />
                    <TextAreaInput
                        control={control}
                        error={errors.address}
                        fieldName="address"
                        label={'Address'}
                        mt={1}
                        bg={'#fff'}
                        borderRadius={10}
                        // readonly={true}

                    />
                    <CustomInputIcon
                        readonly={true}
                        control={control}
                        error={errors.dob}
                        fieldName="dob"
                        placeholder='DOB'
                        // material={'date-range'}
                        label={'DOB'}
                        mt={1}
                    // onpress={() => setOpen(true)}
                    />
                    <CommonSelectInput

                        backgroundColor={'#ffff'}
                        control={control}
                        error={errors.gender}
                        fieldName="gender"
                        label={'Gender'}
                        mt={4}
                        placeholder={user?.gender}
                        selectedValue={genderStatus}
                        changeValue={(value) => {
                            setGenderStatus(value)
                            setValue('gender', value)
                        }}
                        optlabel={"Name"}
                        optValue={'Name'}
                        options={Gender}
                    />

                    <CustomInputIcon
                        label={'Height'}
                        control={control}
                        error={errors.height}
                        fieldName="height"
                        placeholder='height'
                        mt={1}
                        mb={2}
                        heights={'CM'}
                        keyboardType="phone-pad"

                    />

                    <CustomInputIcon
                        label={'Weight'}
                        control={control}
                        error={errors.weight}
                        fieldName="weight"
                        placeholder='weight'
                        inputType={'number'}
                        mt={1}
                        mb={2}
                        weight={'KG'}
                        keyboardType="phone-pad"
                    />
                    <CommonSelectInput
                        backgroundColor={'#ffff'}
                        control={control}
                        error={errors.blood}
                        fieldName="blood"
                        label={'Blood Group'}
                        customweight={'500'}
                        placeholder={user?.bloodgroup}
                        selectedValue={genderStatus}
                        changeValue={(value) => {
                            setGenderStatus(value)
                            setValue('blood', value)
                            setError('blood','')
                        }}
                        optlabel={"Name"}
                        optValue={'Name'}
                        options={BloodGroup}
                    />
                    <Box alignItems={'center'} mt={3} mb={2.5}>
                        <CustomButton selected={true} label={loading ? 'Loading...' : 'UPDATE'} onPress={handleSubmit(SubmitForm)} />
                    </Box>
                </Box>
            </ScrollView>

            {open && <DatePicker
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
        </CustomBackground>
    )
}

export default Profile

const styles = StyleSheet.create({})
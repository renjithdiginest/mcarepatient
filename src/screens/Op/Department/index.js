import { StyleSheet, useWindowDimensions} from 'react-native'
import React, {useEffect, useState} from 'react'
import CustomBackground from '../../../components/CustomBackground'
import { Box, FlatList, HStack, Pressable, Text, Image, useToast } from 'native-base'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import DoctorDeptCard from './DoctorDeptCard'
import CustomHead from './CustomHead'
import CustomInputSearch from '../../../components/CustomInputIcon'
import reactotron from '../../../ReactotronConfig'
import { useDispatch, useSelector } from 'react-redux'
import { IMG_URL } from '../../../config/constants'
import { getDoctorlistBasedDept } from '../../../Redux/actions/homeActions'
import CustomInputIcon from '../../../components/CustomInputIcon';
import { filter } from 'lodash';
import { useFocusEffect } from '@react-navigation/native';


const Department = ({navigation}) => {

    const toast = useToast()


    const { width, height } = useWindowDimensions()

    const [datas, setDatas] = useState(null)


    const dispatch =useDispatch()

    const { activeDept, doctorListUnderDept, error } = useSelector(state => state.home);
    const { user, loading } = useSelector(state => state.auth);

    reactotron.log({activeDept})

    const filterResults = (value) => {
		let datas = doctorListUnderDept?.filter(con => con?.name?.toLowerCase().includes(value.toLowerCase())) 
		setDatas(datas)
	}

    useEffect(() => {
        {
            if (doctorListUnderDept) {
                setDatas(doctorListUnderDept)
            }
        }
    }, [doctorListUnderDept])



    const schema = yup.object({
        name: yup.string().required('Name is required'),
    }).required();

    const { control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema)
    });

    useFocusEffect(
        React.useCallback(() => {

            if(activeDept?._id){
                dispatch(getDoctorlistBasedDept(activeDept?._id))
            }
        }, [activeDept?._id])
    );
        
    const renderItems = ({item}) => {
        return(
            <DoctorDeptCard 
                onPress={()=>navigation.navigate('IndividualDoctor')}
                item={item} 
            />
        )
    }

    return (
        <CustomBackground>

            <Box px={7}>
                <CustomHead 
                    img={{ uri: `${IMG_URL}${activeDept?.image}` }}
                    label={activeDept?.name} onPress={()=>navigation.goBack()}
                />

                <CustomInputIcon
                    mb={2}
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    placeholder='Search...'
                    icon={'search'}
                    onChangeText={(value) => filterResults(value)}
                />

                <Box h={height/2.35} >

                <FlatList
                    data={datas}
                    keyExtractor={(item) => item?._id}
                    renderItem={renderItems}
                    showsVerticalScrollIndicator={false}
                    pt={2}
                />

                </Box>

                


            </Box>


        </CustomBackground>
    )
}

export default Department

const styles = StyleSheet.create({})
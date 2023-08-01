import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Box, HStack, Text, Pressable, useToast, FlatList, Icon, FormControl, Checkbox, ScrollView } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux';
import reactotron from '../../../../ReactotronConfig'
import CustomBackground from '../../../../components/CustomBackground'
import CommonHeading from '../../../../components/CommonHeading';
import CommonSelectInput from '../../../../components/CommonSelectInput';
import { getDeptBasedonCat, getDeptCatList, getServiceBasedDept } from '../../../../Redux/actions/homeActions';
import CommonActionButton from '../../../../components/CommonActionButton';
import { SET_REFER_SERVICE } from '../../../../Redux/constants/homeConstants';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import CustomHeader from '../../../../components/CustomHeader';


const ReferService = ({navigation}) => {

    const dispatch = useDispatch();
    const toast = useToast() 

    const { width, height } = useWindowDimensions()

    const [dept, setDept] = useState("")

    const [groupValue, setGroupValue] = useState([]);


    const { activePatient, deptCatList, deptBasedCategory, serviceBasedDept, selectedServices,  } = useSelector(state => state.home)


    // reactotron.log({selectedServices})

    const schema = yup.object({
        status : yup.string().required('Required'),
	}).required();

	const { control, handleSubmit, formState: { errors }, setValue } = useForm({
		resolver: yupResolver(schema)
	});


    useEffect(() => {
        dispatch(getDeptCatList())
    }, [])

    
    useEffect(() => {
        if(deptCatList){
            let cate = deptCatList?.find(dept => dept?.name === "Services")
            dispatch(getDeptBasedonCat(cate?._id))
            
        }
    }, [deptCatList])

    useEffect(() => {
        if(dept){
            dispatch(getServiceBasedDept(dept))
        }
    }, [dept])


    useEffect(() => {
        if(serviceBasedDept){
            let saved = selectedServices?.filter(ser => ser?.department === dept)
            if(saved){
                let services = [];
                saved.map(sa => {
                    sa.services.map(ser => {
                        services.push(ser?._id)
                    })
                })
                let servic = serviceBasedDept?.map(ser => {
                    if(services.includes(ser?._id)){
                        return {
                            ...ser,
                            selected: true
                        }
                    }
                    else{
                        return {
                            ...ser,
                            selected: false
                        }
                    }
                })
                setGroupValue(servic)
            }
            else{
                setGroupValue(serviceBasedDept)
            }
            
        }
    }, [serviceBasedDept])


    function pickType(selectedType){
        //reactotron.log(selectedType, groupValue)
        let results = groupValue.map(type => {
            if(type?._id === selectedType?._id){
                return {
                    ...type,
                    selected: type?.selected ? false : true
                }
            }
            else{
                return type
            }
        })
        setGroupValue([...results])
    }

    const addingService = () => {

        reactotron.log({groupValue, selectedServices})

        let groupable = groupValue?.filter(group => (group.selected === true && group?.groupable === true))

        let nonGroupable = groupValue?.filter(group => (group.selected === true && group?.groupable === false))

        let data = []

        if(selectedServices){
            data = selectedServices?.filter(ser => ser.department !== dept);
        }

        

        

        if(groupable && groupable.length > 0){
            data.push({
                department : dept,
                services : groupable,
                type: 'group'
            })
        }

        if(nonGroupable && nonGroupable.length > 0){
            nonGroupable?.map(non => {
                data.push({
                    department : dept,
                    services : [non],
                    type: 'nongroup'
                })
                
            })
        }


        dispatch({
            type: SET_REFER_SERVICE,
            payload: data
        })
        navigation.goBack()
    }

    return (
        <CustomBackground>
            <CustomHeader/>
            <CommonHeading label={'REFER SERVICE'} goBack={()=>navigation.goBack()} px={5}/>
            <ScrollView px={5} mt={5} showsVerticalScrollIndicator={false}>

                <CommonSelectInput 
                    control={control}
                    error={errors.status}
                    fieldName="status"

                    backgroundColor={'#fff'}
                    label={'Choose Department'}
                    mt={4}
                    selectedValue={dept}
                    changeValue={(value) => {
                        setDept(value)
                        setValue("status", value)
                    }}
                    optlabel={"name"}
                    optValue={"_id"}
                    options={deptBasedCategory}
                />
         

                {dept&&<Box>
                {groupValue?.map( option => (
                <Pressable 
                    onPress={()=> pickType(option)}
                    key={option?._id} 
                    flexDir='row'
                    mt={15}
                    alignItems='center'
                    justifyContent={'space-between'}
                    bg='#fff'
                    p={3}
                    borderRadius={20}
                    pr={5}
                >
                    <Text marginLeft={2}>{option?.name}</Text>
                    <TouchableOpacity 
                        style={{width:25, height:25, borderRadius:3, borderWidth:2, borderColor:'#057EC1', alignItems:'center', justifyContent:'center'}}
                        onPress={()=> pickType(option)}
                    >
                        {option?.selected && (<Icon 
                            as={<Ionicons name={'checkmark-sharp'} />} 
                            color={'blue.600'}
                            size={18}
                        />)}
                    </TouchableOpacity>
                </Pressable>
                ))}
                </Box>} 


            </ScrollView>

            {dept&&<CommonActionButton 
                    onPress={handleSubmit(addingService)}
                    width={100} my={5} alignSelf='center' 
                >
                    <Text color={'#fff'} fontFamily='body' fontWeight={600} letterSpacing={0.5} fontSize={15} >Confirm</Text>
                </CommonActionButton>}
        </CustomBackground>
    )
}

export default ReferService

const styles = StyleSheet.create({})
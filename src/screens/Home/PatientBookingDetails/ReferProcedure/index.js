import { StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Box, HStack, Text, Pressable, useToast, FlatList, Icon, ScrollView } from 'native-base'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux';
import CustomBackground from '../../../../components/CustomBackground'
import CommonHeading from '../../../../components/CommonHeading';
import CommonSelectInput from '../../../../components/CommonSelectInput';
import { getDeptBasedonCat, getDeptCatList, getProcedureBasedDept, getServiceBasedDept } from '../../../../Redux/actions/homeActions';
import CommonActionButton from '../../../../components/CommonActionButton';
import { SET_REFER_PROCEDURE } from '../../../../Redux/constants/homeConstants';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import reactotron from 'reactotron-react-native';
import CustomHeader from '../../../../components/CustomHeader';


const ReferProcedure = ({navigation}) => {

    const dispatch = useDispatch();
    const toast = useToast() 

    const { width, height } = useWindowDimensions()

    const [dept, setDept] = useState("")

    const [groupValue, setGroupValue] = useState([]);

    const { activePatient, deptCatList, deptBasedCategory, serviceBasedDept, procedureBasedDept, selectedProcedures } = useSelector(state => state.home)
    // reactotron.log({deptCatList})

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
            let cate = deptCatList?.find(dept => dept?.name === "Procedures")
            dispatch(getDeptBasedonCat(cate?._id))
            
        }
    }, [deptCatList])

    useEffect(() => {
        if(dept){
            dispatch(getProcedureBasedDept(dept))
        }
    }, [dept])


    useEffect(() => {

        if(procedureBasedDept){
            let saved = selectedProcedures?.filter(ser => ser?.department === dept)
            if(saved){
                let procedures = [];
                saved.map(sa => {
                    sa.procedures.map(ser => {
                        procedures.push(ser?._id)
                    })
                })
                let servic = procedureBasedDept?.map(ser => {
                    if(procedures.includes(ser?._id)){
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
                setGroupValue(procedureBasedDept)
            }
            
        }
        // if(procedureBasedDept){
        //     setGroupValue(procedureBasedDept)
        // }
    }, [procedureBasedDept])

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




    const addingProcedure = () => {

        let groupable = groupValue.filter(group => (group.selected === true && group?.groupable === true))

        let nonGroupable = groupValue.filter(group => (group.selected === true && group?.groupable === false))

        

        let data = []

        if(selectedProcedures){
            data = selectedProcedures.filter(ser => ser.department !== dept);
        }

        

        if(groupable && groupable.length > 0){
            data.push({
                department : dept,
                procedures : groupable,
                type: 'group'
            })
        }

        if(nonGroupable && nonGroupable.length > 0){
            nonGroupable?.map(non => {
                data.push({
                    department : dept,
                    procedures : [non],
                    type: 'nongroup'
                })
                
            })
        }


        dispatch({
            type: SET_REFER_PROCEDURE,
            payload: data
        })
        navigation.goBack()
        
        // let groupable = groupValue.filter(group => (group.selected === true && group?.groupable === true))

        // let nonGroupable = groupValue.filter(group => (group.selected === true && group?.groupable === false))

        // reactotron.log({groupable, nonGroupable, groupValue})

        // let data = [];

        // if(groupable && groupable.length >0){
        //     data.push({
        //         department : dept,
        //         procedures : groupable
        //     })
        // }

        // if(nonGroupable && nonGroupable.length> 0){
        //     nonGroupable?.map(non => {
        //         data.push({
        //             department : dept,
        //             procedures : [non]
        //         })
        //     })
        // }

        // if(selectedProcedures){
        //     let filterDept = selectedProcedures.filter(pro => pro.department !== dept)
        //     dispatch({
        //         type: SET_REFER_PROCEDURE,
        //         payload: [...filterDept, ...data]
        //     })
        // }
        // else{
        //     dispatch({
        //         type: SET_REFER_PROCEDURE,
        //         payload: data
        //     })
        // }
        // navigation.goBack()
    }



    return (
        <CustomBackground>
            <CustomHeader/>
            <CommonHeading label={'REFER PROCEDURE'} goBack={()=>navigation.goBack()} px={5}/>
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
                        setValue("status",value)

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
                            onPress={()=> pickType(option)}
                            style={{width:25, height:25, borderRadius:3, borderWidth:2, borderColor:'#057EC1', alignItems:'center', justifyContent:'center'}}
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
                onPress={handleSubmit(addingProcedure)}
                width={100} my={5} alignSelf='center' 
            >
                <Text color={'#fff'} fontFamily='body' fontWeight={600} letterSpacing={0.5} fontSize={15} >Confirm</Text>
            </CommonActionButton>}
        </CustomBackground>
    )
}

export default ReferProcedure

const styles = StyleSheet.create({})
import axios from '../../CustomeAxios'
import AsyncStorage from "@react-native-async-storage/async-storage"
import {
    EDIT_PROFILE_FAIL,
    EDIT_PROFILE_SUCCESS,
} from '../constants/profileConstants'
import { AUTH_INPUT, LOADING, LOGIN_FAIL, LOGIN_SUCCESS, PRIVATE_USER} from '../constants/authConstants'
import reactotron from 'reactotron-react-native'


//get Profiles while entering
export const getProfile = (id) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.get(`auth/patient/profile/show/${id}`)
        .then(async response => {
            let data = response?.data?.data
            let privateData = await AsyncStorage.getItem("private");
            if(!privateData){
                await AsyncStorage.setItem("private",JSON.stringify(data));
                dispatch({
                    type: PRIVATE_USER,
                    payload:data
                })
            }
            
            await AsyncStorage.setItem("user",JSON.stringify(data));

            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
            dispatch({
                type: LOGIN_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}


export const editPatientProfile = (data) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`auth/patient/updateProfile`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })

    
        .then(async response => {

            dispatch({
                type: AUTH_INPUT,
                payload: {
                    prop: 'user',
                    value: response.data.data
                }
            })

            // dispatch({
            //     type: PRIVATE_USER,
            //     payload: {
            //         prop: 'privateUser',
            //         value: response?.data?.data
            //     }
            // })

            dispatch({
                type: EDIT_PROFILE_SUCCESS,
                payload: response.data.data
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
            dispatch({
                type: EDIT_PROFILE_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        });
}




import { LOADING, LOGIN_FAIL, LOGIN_SUCCESS, MOBILE_REG_FAIL, MOBILE_REG_SUCCESS } from "../constants/authConstants"
import axios from '../../CustomeAxios'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getProfile } from "./profileActions"



//otp by mobileNumber
export const postMobileReg = (data) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`auth/loginotp`, data)
        .then(async response => {
            let data = response?.data?.data
            dispatch({
                type: MOBILE_REG_SUCCESS,
                payload: data
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
            dispatch({
                type: MOBILE_REG_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}


//login with otp
export const postLogin = (data) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`auth/doctor/login`, data)
        .then(async response => {
            console.log({response: response.data})
            let data = response?.data?.user
            dispatch(getProfile(data?._id))
            await AsyncStorage.setItem("token", JSON.stringify(response?.data?.access_token));
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



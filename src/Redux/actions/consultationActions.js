import { LOADING } from "../constants/authConstants"
import { CONSULTATION_DOC_AVAILBILITY_FAIL, CONSULTATION_DOC_AVAILBILITY_SUCCESS, CONSULTATION_DOC_RESCHEDULE_FAIL, CONSULTATION_DOC_RESCHEDULE_SUCCESS, GET_ALL_CONSULTATION_LIST_FAIL, GET_ALL_CONSULTATION_LIST_SUCCESS } from "../constants/consultationConstants"
import axios from '../../CustomeAxios'


//get consultation list
export const getConsultationList = (id) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.get(`patient/consultation/list/${id}`)
        .then(async response => {
            let data = response?.data?.data
            dispatch({
                type: GET_ALL_CONSULTATION_LIST_SUCCESS,
                payload:data
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
            dispatch({
                type: GET_ALL_CONSULTATION_LIST_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}

export const consultBookingAvailibility = (data) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`patient/consultation/doctor/availability`,data)
        .then(async response => {
            let data = response?.data?.data
            dispatch({
                type: CONSULTATION_DOC_AVAILBILITY_SUCCESS,
                payload:data
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
            dispatch({
                type: CONSULTATION_DOC_AVAILBILITY_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}

export const consultBookingReschedule = (data) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`patient/consultation/reschedule`,data)
        .then(async response => {
            let data = response?.data?.data
            dispatch({
                type: CONSULTATION_DOC_RESCHEDULE_SUCCESS,
                payload:data
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
            dispatch({
                type: CONSULTATION_DOC_RESCHEDULE_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}

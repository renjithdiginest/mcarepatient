import axios from '../../CustomeAxios'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { LOADING } from '../constants/authConstants'
import { COMPLETED_CONSULTATION_FAIL, COMPLETED_CONSULTATION_SUCCESS, CONSUTATION_FILTER_FAIL, CONSUTATION_FILTER_SUCCESS, DEPT_BASED_CATEGORY_FAIL, DEPT_BASED_CATEGORY_SUCCESS, DEPT_CATEGORY_LIST_FAIL, DEPT_CATEGORY_LIST_SUCCESS, PATIENT_HISTORY_FAIL, PATIENT_HISTORY_SUCCESS, PROCEDURE_BASED_DEPT_FAIL, PROCEDURE_BASED_DEPT_SUCCESS, SERVICE_BASED_DEPT_FAIL, SERVICE_BASED_DEPT_SUCCESS, TODAY_CONSULTATION_FAIL, TODAY_CONSULTATION_SUCCESS, UPCOMING_CONSULTATION_FAIL, UPCOMING_CONSULTATION_SUCCESS, UPDATE_CONSULTATION_FAIL, UPDATE_CONSULTATION_SUCCESS } from '../constants/homeConstants'



//get TODAY CONSULTAION
export const getTodayConsult = (data) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`doctor/todaysconsultations`, data)
        .then(async response => {
            let data = response?.data?.data
            dispatch({
                type: TODAY_CONSULTATION_SUCCESS,
                payload: data
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
            dispatch({
                type: TODAY_CONSULTATION_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}

//get UPCOMING CONSULTAION
export const getUpcomingConsult = (data) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`doctor/upcomingconsultations`, data)
        .then(async response => {
            let data = response?.data?.data
            dispatch({
                type: UPCOMING_CONSULTATION_SUCCESS,
                payload: data
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
            dispatch({
                type: UPCOMING_CONSULTATION_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}

//get COMPLETED CONSULTAION
export const getCompletedConsult = (data) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`doctor/oldconsultations`, data)
        .then(async response => {
            let data = response?.data?.data
            dispatch({
                type: COMPLETED_CONSULTATION_SUCCESS,
                payload: data
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
            dispatch({
                type: COMPLETED_CONSULTATION_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}

//get Patient History
export const getPatientHistory = (id) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.get(`doctor/consultationhistory/${id}`)
        .then(async response => {
            let data = response?.data?.data
            dispatch({
                type: PATIENT_HISTORY_SUCCESS,
                payload: data
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
            dispatch({
                type: PATIENT_HISTORY_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}


// consultation filter
export const consultationFilter = (data, mode) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`doctor/consultationbydate`, data)  
    .then(async response => {
        let data = response?.data?.data
        if(mode === "completed"){
            dispatch({
                type: COMPLETED_CONSULTATION_SUCCESS,
                payload: data
            })
        }
        else if(mode === "upcoming"){
            dispatch({
                type: UPCOMING_CONSULTATION_SUCCESS,
                payload: data
            })
        }
        // dispatch({
        //     type: CONSUTATION_FILTER_SUCCESS,
        //     payload: response?.data?.data
        // })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {
        dispatch({
            type: CONSUTATION_FILTER_FAIL,
            payload: error
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


//get department category list
export const getDeptCatList = () => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.get(`doctor/category`)
        .then(async response => {
            let data = response?.data?.data
            dispatch({
                type: DEPT_CATEGORY_LIST_SUCCESS,
                payload: data
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
            dispatch({
                type: DEPT_CATEGORY_LIST_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}

//get department based on category 
export const getDeptBasedonCat = (id) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.get(`doctor/category/departments/${id}`)
        .then(async response => {
            let data = response?.data?.data
            dispatch({
                type: DEPT_BASED_CATEGORY_SUCCESS,
                payload: data
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
            dispatch({
                type: DEPT_BASED_CATEGORY_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}


//get service based on dept 
export const getServiceBasedDept = (id) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.get(`doctor/department/services/${id}`)
        .then(async response => {
            let data = response?.data?.data
            dispatch({
                type: SERVICE_BASED_DEPT_SUCCESS,
                payload: data
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
            dispatch({
                type: SERVICE_BASED_DEPT_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}

//get procedure based on dept 
export const getProcedureBasedDept = (id) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.get(`doctor/department/procedures/${id}`)
        .then(async response => {
            let data = response?.data?.data
            dispatch({
                type: PROCEDURE_BASED_DEPT_SUCCESS,
                payload: data
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
            dispatch({
                type: PROCEDURE_BASED_DEPT_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}


//get UPDATE CONSULTAION
export const updateConsultation = (data) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`doctor/updateconsultation`, data)
        .then(async response => {
            let data = response?.data?.data
            dispatch({
                type: UPDATE_CONSULTATION_SUCCESS,
                payload: data
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
            dispatch({
                type: UPDATE_CONSULTATION_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}


import axios from '../../CustomeAxios'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { LOADING } from '../constants/authConstants'
import { 
    CONSULTATION_BOOKING_FAIL,
    CONSULTATION_BOOKING_SUCCESS,
    DEPT_LIST_FAIL,
    DEPT_LIST_SUCCESS,
    DOCTOR_LIST_BASED_DEPT_FAIL,
    DOCTOR_LIST_BASED_DEPT_SUCCESS,
    GET_BLOG_FAIL,
    GET_BLOG_SUCCESS,
    GET_SINGLE_BLOG_FAIL,
    GET_SINGLE_BLOG_SUCCESS,
    UPCOMING_APPOINTMENT_FAIL,
    UPCOMING_APPOINTMENT_SUCCESS,
 

} from '../constants/homeConstants'
import { GET_ALL_CONSULTATION_LIST_FAIL, GET_ALL_CONSULTATION_LIST_SUCCESS } from '../constants/consultationConstants'



//get dept list
export const getDeptlist = (id) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.get(`patient/home/${id}`)
        .then(async response => {
            let data = response?.data
            dispatch({
                type: DEPT_LIST_SUCCESS,
                payload: data
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
            dispatch({
                type: DEPT_LIST_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}

//get ucomig appontment
export const getUpcomingAppointment = (id) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.get(`patient/upcoming/list/${id}`)
        .then(async response => {
            let data = response?.data?.data
            dispatch({
                type: GET_ALL_CONSULTATION_LIST_SUCCESS,
                payload: data
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

//get blogs.....
export const getBlogs = () => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.get(`patient/blogs`)
        .then(async response => {
            let data = response?.data?.data;
            dispatch({
                type:GET_BLOG_SUCCESS,
                payload:data
            });
            dispatch({
                type: LOADING,
                payload: false
            })

        }).catch(async error => {
            dispatch({
                type:GET_BLOG_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}

//get SINGLE BLOGS
export const getSingleBlogs = (id) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.get(`admin/get-blog/${id}`)
        .then(async response => {
            let data = response?.data?.data;
            dispatch({
                type:GET_SINGLE_BLOG_SUCCESS,
                payload:data
            });
            dispatch({
                type: LOADING,
                payload: false
            })

        }).catch(async error => {
            dispatch({
                type:GET_SINGLE_BLOG_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}



//get doctor uder dept
export const getDoctorlistBasedDept = (id) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.get(`patient/department/doctor/list/${id}`)
        .then(async response => {
            let data = response?.data?.data;
            dispatch({
                type:DOCTOR_LIST_BASED_DEPT_SUCCESS,
                payload:data
            });
            dispatch({
                type: LOADING,
                payload: false
            })

        }).catch(async error => {
            dispatch({
                type:DOCTOR_LIST_BASED_DEPT_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}

//consultation booking
export const consultBooking = (data) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.post(`patient/consultation/booking`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    })
        .then(async response => {
            let data = response?.data?.data;
            dispatch({
                type:CONSULTATION_BOOKING_SUCCESS,
                payload:data
            });
            dispatch({
                type: LOADING,
                payload: false
            })

        }).catch(async error => {
            dispatch({
                type:CONSULTATION_BOOKING_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}


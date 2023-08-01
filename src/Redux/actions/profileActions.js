import axios from '../../CustomeAxios'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ADD_TIME_FAIL, ADD_TIME_SUCCESS, APPLY_LEAVE_FAIL, APPLY_LEAVE_SUCCESS, EDIT_PROFILE_FAIL, EDIT_PROFILE_SUCCESS, GET_BLOG_FAIL, GET_BLOG_SUCCESS, GET_PROFILE_FAIL, GET_PROFILE_SUCCESS, GET_SINGLE_BLOG_FAIL, GET_SINGLE_BLOG_SUCCESS, LEAVE_FILTER_FAIL, LEAVE_FILTER_SUCCESS, LEAVE_LIST_FAIL, LEAVE_LIST_SUCCESS } from '../constants/profileConstants'
import { AUTH_INPUT, LOADING, LOGIN_FAIL, LOGIN_SUCCESS } from '../constants/authConstants'
import reactotron from 'reactotron-react-native'


//get Profiles while entering
export const getProfile = (id) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.get(`doctor/get-doctor/${id}`)
        .then(async response => {
            let data = response?.data?.data
            AsyncStorage.setItem("user", JSON.stringify(data))
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


//Time Management
export const postAddTimmings = (data) => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`doctor/addtimes`,data)
        .then(async response => {
            let data = response?.data?.data
            dispatch({
                type: ADD_TIME_SUCCESS,
                payload: data
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
        .catch(async error => {
            dispatch({
                type: ADD_TIME_FAIL,
                payload: error
            })
            dispatch({
                type: LOADING,
                payload: false
            })
        })
}

// get leave list
export const getLeaveList = (id) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.get(`doctor/leave-list/${id}`)  
    .then(async response => {
        dispatch({
            type: LEAVE_LIST_SUCCESS,
            payload: response.data.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {
        dispatch({
            type: LEAVE_LIST_FAIL,
            payload: error
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

// leave filter
export const LeaveFilter = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`doctor/leave-list-filter`, data)  
    .then(async response => {
        dispatch({
            type: LEAVE_FILTER_SUCCESS,
            payload: response?.data?.data
        })
        
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {
        dispatch({
            type: LEAVE_FILTER_FAIL,
            payload: error
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

// apply leave
export const applyLeave = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`doctor/apply-leave`, data)  
    .then(async response => {
        dispatch({
            type: APPLY_LEAVE_SUCCESS,
            payload: response.data
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    })
    .catch(async error => {
        dispatch({
            type: APPLY_LEAVE_FAIL,
            payload: error
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    });
}


export const editDocProfile = (data) => async(dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })
    await axios.post(`doctor/edit-doctor`, data, {
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
            type:EDIT_PROFILE_FAIL,
            payload: error
        })
        dispatch({
            type: LOADING,
            payload: false
        })
    });
}

//get blogs.....
export const getBlogs = () => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true
    })

    await axios.get(`doctor/blogs`)
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
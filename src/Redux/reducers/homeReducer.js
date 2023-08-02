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
    RESET,
    RESET_ERROR,
    SET_ACTIVE_DEPT,
    SET_ACTIVE_DOCTOR,
    SET_DATE_TIME_TYPE,
    UPCOMING_APPOINTMENT_FAIL,
    UPCOMING_APPOINTMENT_SUCCESS,
} from "../constants/homeConstants"

export const homeReducer = (state = {}, action) => {
    switch (action.type) {
        case RESET_ERROR:
            return {
                ...state,
                error: null,
            }

        case RESET:
            return {
                ...state,
                error: null,
             
            }
        case DEPT_LIST_SUCCESS:
            return {
                ...state,
                deptList: action.payload,
            }

        case DEPT_LIST_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case SET_ACTIVE_DEPT:
            return {
                ...state,
                activeDept: action.payload,
            }

        case SET_ACTIVE_DOCTOR:
            return {
                ...state,
                activeDoctor: action.payload,
            }

        case SET_DATE_TIME_TYPE:
            return {
                ...state,
                dateTimeType: action.payload,
            }
    

        case UPCOMING_APPOINTMENT_SUCCESS:
            return {
                ...state,
                upcomAppointList: action.payload,
            }

        case UPCOMING_APPOINTMENT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case GET_BLOG_SUCCESS:
            return {
                ...state,
                blogList: action.payload
            }
        case GET_BLOG_FAIL:
            return {
                ...state,
                error: action.payload

            }

            
    case GET_SINGLE_BLOG_SUCCESS:
        return {
            ...state,
            singleBlogList: action.payload
        }
    case GET_SINGLE_BLOG_FAIL:
        return {
            ...state,
            error: action.payload
        }

    case DOCTOR_LIST_BASED_DEPT_SUCCESS:
        return {
            ...state,
            doctorListUnderDept: action.payload
        }
    case DOCTOR_LIST_BASED_DEPT_FAIL:
        return {
            ...state,
            error: action.payload
        }

    case CONSULTATION_BOOKING_SUCCESS:
        return {
            ...state,
            booking: action.payload,
            bookingSuccess : true
        }
    case CONSULTATION_BOOKING_FAIL:
        return {
            ...state,
            error: action.payload
        }    
    


        default:
            return state;
    }
}


import {
    AUTH_INPUT,
    AUTH_STORE_SUCCESS,
    LOADING, LOGIN_FAIL, LOGIN_SUCCESS, MOBILE_REG_FAIL, MOBILE_REG_SUCCESS, RESET_AUTH, RESET_ERROR
} from "../constants/authConstants";


export const authReducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case RESET_ERROR:
            return {
                ...state,
                error: null,
                loginSuccess: null,
                mobileRegSuccess: null
            }
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                user:action.payload,
                loginSuccess: true,
            }

        case LOGIN_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case AUTH_STORE_SUCCESS:
            return {
                ...state,
                mobileNumber: action.payload
            }

        case MOBILE_REG_SUCCESS:
            return {
                ...state,
                mobileRegSuccess: true
            }

        case MOBILE_REG_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case AUTH_INPUT:
            return{
                ...state,
                [action.payload.prop] : action.payload.value
            }
            
        default:
            return state;
    }
}


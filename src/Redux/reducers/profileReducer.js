import reactotron from "../../ReactotronConfig";
import {
    RESET_ERROR
} from "../constants/authConstants";
import {
    ADD_TIME_FAIL,
    ADD_TIME_SUCCESS,
    APPLY_LEAVE_FAIL,
    APPLY_LEAVE_SUCCESS,
    EDIT_PROFILE_FAIL,
    EDIT_PROFILE_SUCCESS,
    GET_BLOG_FAIL,
    GET_BLOG_SUCCESS,
    GET_PROFILE_FAIL,
    GET_PROFILE_SUCCESS,
    GET_SINGLE_BLOG_FAIL,
    GET_SINGLE_BLOG_SUCCESS,
    LEAVE_FILTER_FAIL,
    LEAVE_FILTER_SUCCESS,
    LEAVE_LIST_FAIL,
    LEAVE_LIST_SUCCESS,
    RESET,
} from "../constants/profileConstants";


export const profileReducer = (state = {}, action) => {
    switch (action.type) {

        
        case RESET_ERROR:
            return {
                ...state,
                error: null,
                timingsListSuccess: null,
                profileEdited: null
            }

        case RESET:
            return {
                ...state,
                error: null,
                leaveSuccess: null

            }

        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                userProfileList: action.payload,
            }

        case GET_PROFILE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case ADD_TIME_SUCCESS:
            return {
                ...state,
                timingsList: action?.payload,
                timingsListSuccess: true
            }
        case ADD_TIME_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case LEAVE_LIST_SUCCESS:
            return {
                ...state,
                leaveList: action?.payload,
            }
        case LEAVE_LIST_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case LEAVE_FILTER_SUCCESS:
            return {
                ...state,
                leaveList: action?.payload,
            }
        case LEAVE_FILTER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case APPLY_LEAVE_SUCCESS:
            return {
                ...state,
                // leaveList: state.leaveList ? [action?.payload.data[0], ...state.leaveList] : [action?.payload.data],
                leaveList:action.payload,
                leaveSuccess: true
            }

        case APPLY_LEAVE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case EDIT_PROFILE_SUCCESS:
            return {
                ...state,
                profileEdited: true,
            }
        case EDIT_PROFILE_FAIL:
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
        default:
            return state;
    }
}


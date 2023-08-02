import reactotron from "../../ReactotronConfig";
import {
    RESET_ERROR
} from "../constants/authConstants";
import {


    EDIT_PROFILE_FAIL,
    EDIT_PROFILE_SUCCESS,
    GET_PROFILE_FAIL,
    GET_PROFILE_SUCCESS,


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

        case EDIT_PROFILE_SUCCESS:
            return {
                ...state,
                profileEdited: true
            }
        case EDIT_PROFILE_FAIL:
            return {
                ...state,
                error: action.payload
            }


        default:
            return state;
    }
}


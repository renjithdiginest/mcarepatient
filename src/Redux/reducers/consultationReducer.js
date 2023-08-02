import { RESET_ERROR } from "../constants/authConstants";
import { CONSULTATION_DOC_AVAILBILITY_FAIL, CONSULTATION_DOC_AVAILBILITY_SUCCESS, CONSULTATION_DOC_RESCHEDULE_FAIL, CONSULTATION_DOC_RESCHEDULE_SUCCESS, GET_ALL_CONSULTATION_LIST_FAIL, GET_ALL_CONSULTATION_LIST_SUCCESS } from "../constants/consultationConstants";

export const consultationReducer = (state = {}, action) => {
    switch (action.type) {
        case RESET_ERROR:
            return {
                ...state,
                error: null,
                consultationResheduled:null

            }
        case GET_ALL_CONSULTATION_LIST_SUCCESS:
            return {
                ...state,
                consultationList: action.payload
            }
        case GET_ALL_CONSULTATION_LIST_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CONSULTATION_DOC_AVAILBILITY_SUCCESS:
            return {
                ...state,
                AvailibiltyTimeList: action.payload
            }
        case CONSULTATION_DOC_AVAILBILITY_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CONSULTATION_DOC_RESCHEDULE_SUCCESS:
            return {
                ...state,
                consultationList: state?.consultationList.map(con => con._id === action.payload._id ? action.payload : con),
                consultationResheduled: true
            }
        case CONSULTATION_DOC_RESCHEDULE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}


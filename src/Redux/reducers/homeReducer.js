import {
    COMPLETED_CONSULTATION_FAIL,
    COMPLETED_CONSULTATION_SUCCESS,
    CONSUTATION_FILTER_FAIL,
    CONSUTATION_FILTER_SUCCESS,
    DEPT_BASED_CATEGORY_FAIL,
    DEPT_BASED_CATEGORY_SUCCESS,
    DEPT_CATEGORY_LIST_FAIL,
    DEPT_CATEGORY_LIST_SUCCESS,
    PATIENT_HISTORY_FAIL,
    PATIENT_HISTORY_SUCCESS,
    PROCEDURE_BASED_DEPT_FAIL,
    PROCEDURE_BASED_DEPT_SUCCESS,
    RESET,
    RESET_ERROR,
    SERVICE_BASED_DEPT_FAIL,
    SERVICE_BASED_DEPT_SUCCESS,
    SET_ACTIVE_PATIENT,
    SET_REFER_PROCEDURE,
    SET_REFER_SERVICE,
    TODAY_CONSULTATION_FAIL,
    TODAY_CONSULTATION_SUCCESS,
    UPCOMING_CONSULTATION_FAIL,
    UPCOMING_CONSULTATION_SUCCESS,
    UPDATE_CONSULTATION_FAIL,
    UPDATE_CONSULTATION_SUCCESS
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
                updateSuccess: null,
                selectedServices: null,
                selectedProcedures: null
            }

        case TODAY_CONSULTATION_SUCCESS:
            return {
                ...state,
                todayConsultList: action.payload,
            }

        case TODAY_CONSULTATION_FAIL:
            return {
                ...state,
                error: action.payload
            }


        case UPCOMING_CONSULTATION_SUCCESS:
            return {
                ...state,
                upcomingConsultList: action.payload,
            }

        case UPCOMING_CONSULTATION_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case COMPLETED_CONSULTATION_SUCCESS:
            return {
                ...state,
                completedConsultList: action.payload,
            }

        case COMPLETED_CONSULTATION_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CONSUTATION_FILTER_SUCCESS:
            return {
                ...state,
                filter: action.payload,
            }


        case SET_ACTIVE_PATIENT:
            return {
                ...state,
                activePatient: action.payload
            }

        case PATIENT_HISTORY_SUCCESS:
            return {
                ...state,
                patientHistory: action.payload,
            }

        case PATIENT_HISTORY_FAIL:
            return {
                ...state,
                error: action.payload
            }


        case CONSUTATION_FILTER_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DEPT_CATEGORY_LIST_SUCCESS:
            return {
                ...state,
                deptCatList: action.payload,
            }

        case DEPT_CATEGORY_LIST_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DEPT_BASED_CATEGORY_SUCCESS:
            return {
                ...state,
                deptBasedCategory: action.payload,
            }

        case DEPT_BASED_CATEGORY_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case SERVICE_BASED_DEPT_SUCCESS:
            return {
                ...state,
                serviceBasedDept: action.payload,
            }

        case SERVICE_BASED_DEPT_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case PROCEDURE_BASED_DEPT_SUCCESS:
            return {
                ...state,
                procedureBasedDept: action.payload,
            }

        case PROCEDURE_BASED_DEPT_FAIL:
            return {
                ...state,
                error: action.payload
            }


        case SET_REFER_SERVICE:
            return {
                ...state,
                selectedServices: action.payload,
            }

        case SET_REFER_PROCEDURE:
            return {
                ...state,
                selectedProcedures: action.payload,
            }

        case UPDATE_CONSULTATION_SUCCESS:
            return {
                ...state,
                
                updatedConsultation: action.payload,
                updateSuccess: true,
            }

        case UPDATE_CONSULTATION_FAIL:
            return {
                ...state,
                error: action.payload
            }









        default:
            return state;
    }
}


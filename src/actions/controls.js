import * as api from '../api/index.js';

import {
    FETCH_ALL_CONTROLS,
    SEARCH_CONTROLS,
    CREATE_CONTROL,
    UPDATE_CONTROL,
    START_LOADING_CONTROL,
    FAILED_CONTROL_REQUEST,
    SET_CONTROL,
    CLOSE_CONTROL_FORM_DIALOG,
    OPEN_CONTROL_FORM_DIALOG,
    FETCH_CONTROLS_BY_RISK,
    FETCH_AUTOMATION_LEVELS,
    FETCH_CONTROL_STATES,
    FETCH_CONTROL_TYPES

} from '../constants/actionTypes'

// Generic Action creators

export const FailedRequest = error => {
    return {
        type: FAILED_CONTROL_REQUEST,
        payload: error
    }
}


// Set user to null 
export const ResetControl = () => ({ type: SET_CONTROL, payload: null });

export const SetControl = (control) => ({
    type: SET_CONTROL, payload: control
});

export const GetControls = (page, itemsPerPage) => async (dispatch) => {

    dispatch({ type: START_LOADING_CONTROL })
    await api.fetchControls(page, itemsPerPage)
        .then(response => {
            const { controls, currentPage, amountOfPages, totalOfItems } = response.data
            dispatch({ type: FETCH_ALL_CONTROLS, payload: { controls, currentPage, amountOfPages, totalOfItems } })

        })
        .catch(error => {
            dispatch(FailedRequest(error.message))
        })


};

export const GetControlsByRisk = (riskId, page, itemsPerPage) => async (dispatch) => {

    dispatch({ type: START_LOADING_CONTROL })
    await api.fetchControlsByRisk(riskId, page, itemsPerPage)
        .then(response => {
            const { controls } = response.data
            dispatch({ type: FETCH_CONTROLS_BY_RISK, payload: { controls} })

        })
        .catch(error => {
            dispatch(FailedRequest(error.message))
        })


};



export const SearchControlsByCode = (page, itemsPerPage, code) => {
    return async function (dispatch) {
        dispatch({ type: START_LOADING_CONTROL })
        await api.searchControlsByCode(page, itemsPerPage, code)
            .then(response => {
                const { controls, currentPage, amountOfPages } = response.data

                dispatch({
                    type: SEARCH_CONTROLS,
                    payload: { controls, currentPage, amountOfPages }
                })
            })
            .catch(error => {
                dispatch(FailedRequest(error))
            })
    }
}


// CREATE  
export const AddControl = (control) => {
    return async function (dispatch) {
        dispatch({ type: START_LOADING_CONTROL })
        await api.addControl(control)
            .then(response => {
                const control = response.data
                dispatch({
                    type: CREATE_CONTROL,
                    payload: control
                })
            })
            .catch(error => {
                dispatch(FailedRequest(error.message))
            })
    }
}

// UPDATE  
export const UpdateControl = (control) => {
    return async function (dispatch) {
        dispatch({ type: START_LOADING_CONTROL })
        api.updateControl(control)
            .then(response => {
                const control = response.data
                dispatch({
                    type: UPDATE_CONTROL,
                    payload: control
                })
            })
            .catch(error => {
                dispatch(FailedRequest(error.message))
            })
    }
}

export function openFormDialog() {
    return {
        type: OPEN_CONTROL_FORM_DIALOG
    }

}

export function closeFormDialog() {
    return {
        type: CLOSE_CONTROL_FORM_DIALOG

    }
}

// Data dropdowns 

export const GetAutomationLevels = (page, itemsPerPage) => async (dispatch) => {

    await api.fetchAutomationLevels()
        .then(response => {
            const { automationLevels } = response.data
            dispatch({ type: FETCH_AUTOMATION_LEVELS, payload: automationLevels })

        })
        .catch(error => {
            dispatch(FailedRequest(error.message))
        })

};

export const GetControlStates = () => async (dispatch) => {

    await api.fetchControlStates()
        .then(response => {
            const { controlStates } = response.data
            dispatch({ type: FETCH_CONTROL_STATES, payload: controlStates })

        })
        .catch(error => {
            dispatch(FailedRequest(error.message))
        })

};

export const GetControlTypes = () => async (dispatch) => {

    await api.fetchControlTypes()
        .then(response => {
            const { controlTypes } = response.data
            dispatch({ type: FETCH_CONTROL_TYPES, payload: controlTypes })

        })
        .catch(error => {
            dispatch(FailedRequest(error.message))
        })

};

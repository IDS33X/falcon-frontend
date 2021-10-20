import * as api from '../api/index.js';

import {
    FETCH_RISKS,
    SEARCH_RISKS,
    CREATE_RISK,
    UPDATE_RISK,
    START_LOADING_RISK,
    FAILED_RISK_REQUEST,
    SET_RISK,
    CLOSE_RISK_FORM_DIALOG,
    OPEN_RISK_FORM_DIALOG

} from '../constants/actionTypes'

// Generic Action creators

export const FailedRequest = error => {
    return {
        type: FAILED_RISK_REQUEST,
        payload: error
    }
}


// Set user to null 
export const ResetRisk = () => ({ type: SET_RISK, payload: null });

export const SetRisk = (risk) => ({
    type: SET_RISK, payload: risk
});

export const GetRisksByCategory = (riskCategoryId, page, itemsPerPage) => async (dispatch) => {

    dispatch({ type: START_LOADING_RISK })
    await api.fetchRiskByCategory(riskCategoryId, page, itemsPerPage)
        .then(response => {
            const { risks, currentPage, amountOfPages } = response.data
            dispatch({ type: FETCH_RISKS, payload: { risks, currentPage, amountOfPages } })

        })
        .catch(error => {
            dispatch(FailedRequest(error.message))
        })


};

export const SearchRiskByCode = (riskCategoryId, page, itemsPerPage, filter) => {
    return async function (dispatch) {
        dispatch({ type: START_LOADING_RISK })
        await api.searchRiskByCode(riskCategoryId, page, itemsPerPage, filter)
            .then(response => {
                const { risks, currentPage, amountOfPages } = response.data

                dispatch({
                    type: SEARCH_RISKS,
                    payload: { risks, currentPage, amountOfPages }
                })
            })
            .catch(error => {
                dispatch(FailedRequest(error))
            })
    }
}


// CREATE  
export const AddRisk = (risk) => {
    return async function (dispatch) {
        dispatch({ type: START_LOADING_RISK })
        await api.addRisk(risk)
            .then(response => {
                const risk = response.data
                dispatch({
                    type: CREATE_RISK,
                    payload: risk
                })
            })
            .catch(error => {
                dispatch(FailedRequest(error.message))
            })
    }
}

// UPDATE  
export const UpdateRisk = (risk) => {
    return async function (dispatch) {
        dispatch({ type: START_LOADING_RISK })
        api.updateRisk(risk)
            .then(response => {
                const risk = response.data
                dispatch({
                    type: UPDATE_RISK,
                    payload: risk
                })
            })
            .catch(error => {
                dispatch(FailedRequest(error.message))
            })
    }
}

export function openFormDialog() {
    return {
        type: OPEN_RISK_FORM_DIALOG
    }

}

export function closeFormDialog() {
    return {
        type: CLOSE_RISK_FORM_DIALOG

    }
}
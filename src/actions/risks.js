import * as api from '../api/index.js';

import {
    FETCH_BY_SEARCH,
    START_LOADING,
    FAILED_REQUEST,
    FETCH_ALL,
    SET_ONE,
    SET_OBJECT_NULL,
    CREATE,
    OPEN_FORM,
    CLOSE_FORM,
} from '../constants/actionTypes'

// Generic Action creators

export const FailedRequest = error => {
    return {
        type: FAILED_REQUEST,
        payload: error
    }
}


// Set user to null 
export const ResetRisk = () => ({ type: SET_OBJECT_NULL });

export const SetRisk = (risk) => ({
    type: SET_ONE, payload: risk
});

export const GetRisksByCategory = (riskCategoryId, page, itemsPerPage) => async (dispatch) => {

    dispatch({ type: START_LOADING })
    await api.fetchRiskByCategory(riskCategoryId, page, itemsPerPage)
        .then(response => {
            const { risks, currentPage, amountOfPages } = response.data
            dispatch({ type: FETCH_ALL, payload: { risks, currentPage, amountOfPages } })

        })
        .catch(error => {
            dispatch(FailedRequest(error.message))
        })


};

export const SearchRiskByCode = (riskCategoryId, page, itemsPerPage, filter) => {
    return async function (dispatch) {
        dispatch({ type: START_LOADING })
        await api.searchRiskByCode(riskCategoryId, page, itemsPerPage, filter)
            .then(response => {
                const { risks, currentPage, amountOfPages } = response.data

                dispatch({
                    type: FETCH_BY_SEARCH,
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
        dispatch({ type: START_LOADING })
        await api.addRisk(risk)
            .then(response => {
                const risk = response.data
                dispatch({
                    type: CREATE,
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
        dispatch({ type: START_LOADING })
        api.updateRisk(risk)
            .then(response => {
                const risk = response.data
                dispatch({
                    type: CREATE,
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
        type: OPEN_FORM
    }

}

export function closeFormDialog() {
    return {
        type: CLOSE_FORM

    }
}
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
    OPEN_RISK_FORM_DIALOG,
    FETCH_RISKS_IMPACTS,
    ADD_RISK_CONTROLS,
    REMOVE_RISK_CONTROLS

} from '../constants/actionTypes'

// Generic Action creators

export const FailedRequest = error => {
    return {
        type: FAILED_RISK_REQUEST,
        payload: error
    }
}


// Set risk to null 
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

export const GetRiskImpacts = () => async (dispatch) => {

    await api.fetchRiskImpacts()
        .then(response => {
            const { riskImpacts } = response.data
            dispatch({ type: FETCH_RISKS_IMPACTS, payload: riskImpacts })

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

// RISK CONTROLS

export const AddRiskControls = (riskControls) => {
    return async function (dispatch) {
        dispatch({ type: START_LOADING_RISK })
        await api.AddRangeRiskControls(riskControls)
            .then(response => {
                //const risk = response.data
                dispatch({
                    type: ADD_RISK_CONTROLS
                })
            })
            .catch(error => {
                dispatch(FailedRequest(error.message))
            })
    }
}

export const RemoveRiskControls = (riskControls) => {
    return async function (dispatch) {
        await api.RemoveRangeRiskControls(riskControls)
            .then(response => {
                //const risk = response.data
                dispatch({
                    type: REMOVE_RISK_CONTROLS
                })
            })
            .catch(error => {
                dispatch(FailedRequest(error.message))
            })
    }
}

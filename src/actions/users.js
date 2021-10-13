import axios from 'axios'
import * as api from '../api/index.js';

import {
    FETCH_BY_SEARCH,
    START_LOADING,
    FAILED_REQUEST,
    FETCH_ALL,
    FETCH_ONE,
    SET_OBJECT_NULL, CREATE
} from '../constants/actionTypes'

// Generic Action creators

export const FailedRequest = error => {
    return {
        type: FAILED_REQUEST,
        payload: error
    }
}


// Set user to null 
export const ResetUser = () => ({ type: SET_OBJECT_NULL });

export const GetUsers = (departmentId, page, itemsPerPage) => async (dispatch) => {

    dispatch({ type: START_LOADING })
    await api.fetchUsers(departmentId, page, itemsPerPage)
        .then(response => {
            const { users, currentPage, amountOfPages } = response.data
            dispatch({ type: FETCH_ALL, payload: { users, currentPage, amountOfPages } })

        })
        .catch(error => {
            dispatch(FailedRequest(error))
        })

    //dispatch({ type: GET_USERS_SUCCESS, payload: { users, currentPage, amountOfPages } });


};

export const SearchUsersByDepartment = (departmentId, page, filter, itemsPerPage) => {
    return async function (dispatch) {
        dispatch({ type: START_LOADING })
        await api.fetchUsersBySearch(departmentId, page, filter, itemsPerPage)
            .then(response => {
                const users = response.data
                dispatch({
                    type: FETCH_BY_SEARCH,
                    payload: users
                })
            })
            .catch(error => {
                //dispatch(GetUsersFailure(error.message))
            })
    }
}





export const GetById = (id) => {
    return async function (dispatch) {
        dispatch({ type: START_LOADING })
        await api.fetchUser(id)
            .then(response => {
                const user = response.data
                dispatch({
                    type: FETCH_ONE,
                    payload: user
                })
            })
            .catch(error => {
                dispatch(FailedRequest(error.message))
            })
    }
}

// CREATE  
export const AddUser = (user) => {
    return async function (dispatch) {
        dispatch({ type: START_LOADING })
        await api.addUser(user)
            .then(response => {
                const user = response.data
                dispatch({
                    type: CREATE,
                    payload: user
                })
            })
            .catch(error => {
                dispatch(FailedRequest(error.message))
            })
    }
}

// UPDATE  
export const UpdateProfile = (user) => {
    return async function (dispatch) {
        dispatch({ type: START_LOADING })
        api.updateUser(user)
            .then(response => {
                const user = response.data
                console.log('UPDATE USER SUCCESS  ', response.data);
                dispatch({
                    type: CREATE,
                    payload: user
                })
            })
            .catch(error => {
                dispatch(FailedRequest(error.message))
            })
    }
}


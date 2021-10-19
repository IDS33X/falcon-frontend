
import * as api from '../api/index.js';

import {
<<<<<<< Updated upstream
    FETCH_BY_SEARCH,
    START_LOADING,
    FAILED_REQUEST,
    FETCH_ALL,
    FETCH_ONE,
    RESET_USER, CREATE
=======
    FAILED_USER_REQUEST,

    SET_USER,
    FETCH_USERS,
    SEARCH_USERS,
    FETCH_USER,
    CREATE_USER,
    UPDATE_USER,
    START_LOADING_USER

>>>>>>> Stashed changes
} from '../constants/actionTypes'

// Generic Action creators

export const FailedRequest = error => {
    return {
        type: FAILED_USER_REQUEST,
        payload: error
    }
}


// Set user to null 
<<<<<<< Updated upstream
export const ResetUser = () => ({ type: RESET_USER });
=======
export const ResetUser = () => ({ type: SET_USER, payload: null });
>>>>>>> Stashed changes

export const GetUsers = (departmentId, page, itemsPerPage) => async (dispatch) => {

    dispatch({ type: START_LOADING_USER })
    await api.fetchUsers(departmentId, page, itemsPerPage)
        .then(response => {
            const { users, currentPage, amountOfPages, totalOfItems } = response.data
            dispatch({ type: FETCH_USERS, payload: { users, currentPage, totalOfItems, amountOfPages } })

        })
        .catch(error => {
            dispatch(FailedRequest(error))
        })

    //dispatch({ type: GET_USERS_SUCCESS, payload: { users, currentPage, amountOfPages } });


};

export const SearchUsersByDepartment = ( departmentId, page, filter, itemsPerPage ) => {
    return async function (dispatch) {
        dispatch({ type: START_LOADING_USER })
        await api.fetchUsersBySearch(departmentId, page, filter, itemsPerPage)
            .then(response => {
                const users = response.data
                dispatch({
                    type: SEARCH_USERS,
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
        dispatch({ type: START_LOADING_USER })
        await api.fetchUser(id)
            .then(response => {
                const user = response.data
                dispatch({
                    type: FETCH_USER,
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
        dispatch({ type: START_LOADING_USER })
        await api.addUser(user)
            .then(response => {
                const user = response.data
                dispatch({
                    type: CREATE_USER,
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
        dispatch({ type: START_LOADING_USER })
        api.updateUser(user)
            .then(response => {
                const user = response.data
                console.log('UPDATE USER SUCCESS  ', response.data);
                dispatch({
                    type: UPDATE_USER,
                    payload: user
                })
            })
            .catch(error => {
                dispatch(FailedRequest(error.message))
            })
    }
}


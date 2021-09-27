import axios from 'axios'
import {
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE,
    SEND_REQUEST,
    SUCCESSFUL_REQUEST,
    FAILED_REQUEST,
    SET_NULL_USER
} from '../constants/actionTypes'

const options = {
    headers: {
        'Content-Type': 'application/json',
    }
};

// Generic Action creators 

export const GetUsersRequest = () => {
    return {
        type: GET_USERS_REQUEST
    }
}

export const GetUsersSuccess = users => {
    return {
        type: GET_USERS_SUCCESS,
        payload: users
    }
}

export const GetUsersFailure = error => {
    return {
        type: GET_USERS_FAILURE,
        payload: error
    }
}


export const SendRequest = () => {
    return {
        type: SEND_REQUEST
    }
}

export const SuccessfulRequest = payload => {
    return {
        type: SUCCESSFUL_REQUEST,
        payload: payload
    }
}

export const FailedRequest = error => {
    return {
        type: FAILED_REQUEST,
        payload: error
    }
}


// Set user to null 
export const ResetUser = () => ({ type: SET_NULL_USER });

// READ
export const GetUsers = ({ departmentId, page, itemsPerPage }) => {
    return async function (dispatch) {
        dispatch(GetUsersRequest())
        await axios
            .get(`https://localhost:44382/api/User/GetUsersByDepartment?DepartmentId=${departmentId}&Page=${page}&ItemsPerPage=${itemsPerPage}`)
            .then(response => {
                const users = response.data
                dispatch(GetUsersSuccess(users))
            })
            .catch(error => {
                dispatch(GetUsersFailure(error.message))
            })
    }
}

export const SearchUsersByDepartment = ({ departmentId, page, filter, itemsPerPage }) => {
    return async function (dispatch) {
        dispatch(GetUsersRequest())
        await axios
            .get(`https://localhost:44382/api/User/SearchUsersByDepartment?DepartmentId=${departmentId}&Filter=${filter}&Page=${page}&ItemsPerPage=${itemsPerPage}`)
            .then(response => {
                const users = response.data
                dispatch(GetUsersSuccess(users))
            })
            .catch(error => {
                dispatch(GetUsersFailure(error.message))
            })
    }
}


export const GetById = (id) => {
    return async function (dispatch) {
        dispatch(SendRequest())
        await axios
            .get(`https://localhost:44382/api/User/GetById?id=${id}`)
            .then(response => {
                const user = response.data
                dispatch(SuccessfulRequest(user))
            })
            .catch(error => {
                dispatch(FailedRequest(error.message))
            })
    }
}

// CREATE  
export const AddUser = (user) => {
    return async function (dispatch) {
        dispatch(SendRequest())
        await axios
            .post(`https://localhost:44382/api/User/Add`, user, { "headers": options.headers })
            .then(response => {
                const user = response.data
                console.log('ADD USER SUCCESS  ', response.data);
                dispatch(SuccessfulRequest(user))
            })
            .catch(error => {
                dispatch(FailedRequest(error.message))
            })
    }
}

// UPDATE  
export const UpdateProfile = (user) => {
    return async function (dispatch) {
        dispatch(SendRequest())
        await axios
            .post(`https://localhost:44382/api/User/UpdateProfile`, user, { "headers": options.headers })
            .then(response => {
                const user = response.data
                console.log('UPDATE USER SUCCESS  ', response.data);
                dispatch(SuccessfulRequest(user))
            })
            .catch(error => {
                dispatch(FailedRequest(error.message))
            })
    }
}


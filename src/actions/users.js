import axios from 'axios'
import {
    GET_USERS_REQUEST,
    GET_USERS_SUCCESS,
    GET_USERS_FAILURE
} from '../constants/actionTypes'

export const GetUsers = ({departmentId, page, itemsPerPage}) => {
    return async function(dispatch) {
        dispatch(GetUsersRequest())
        await axios
            .get(`https://localhost:44382/falconapi/Employee/GetEmployeesByDepartment?DepartmentId=${departmentId}&Page=${page}&ItemsPerPage=${itemsPerPage}`)
            .then(response => {
                const users = response.data
                console.log(response.data);
                dispatch(GetUsersSuccess(users))
            })
            .catch(error => {
                dispatch(GetUsersFailure(error.message))
            })
    }
}

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
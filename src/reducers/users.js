import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE
} from '../constants/actionTypes'

const initialState = {
  loading: false, 
  users: [],
  error: ''
};

const Users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: ''
      }
    case GET_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload
      }
    default: return state
  }
}

export default Users



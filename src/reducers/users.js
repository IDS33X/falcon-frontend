import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  SEND_REQUEST,
  SUCCESSFUL_REQUEST,
  FAILED_REQUEST,
  SET_NULL_USER
} from '../constants/actionTypes'

const initialState = {
  loading: false,
  users: [],
  error: '',
  user: null,
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

    case SEND_REQUEST:
      return {
        ...state,
        loading: true
      }
    case SUCCESSFUL_REQUEST:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: ''

      }
    case FAILED_REQUEST:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload
      }
    case SET_NULL_USER:
      return {
        ...state,
        user: null,
      }


    default: return state
  }
}

export default Users



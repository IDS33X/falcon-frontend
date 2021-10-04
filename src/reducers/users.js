import {

  FETCH_BY_SEARCH,
  START_LOADING,
  FETCH_ONE,
  FETCH_ALL,
  FAILED_REQUEST,
  RESET_USER,
  UPDATE,
  CREATE
} from '../constants/actionTypes'

const initialState = {
  loading: false,
  users: [],
  error: '',
  user: null,
  currentPage: 0,
  amountOfPages: 0

};

const Users = (state = initialState, { type, payload }) => {
  switch (type) {

    case FETCH_ALL:
      return {
        ...state,
        loading: false,
        error: '',
        currentPage: payload.currentPage,
        amountOfPages: payload.amountOfPages,
        users: payload.users,
      }
    case START_LOADING:
      return {
        ...state,
        loading: true
      }

    case FETCH_BY_SEARCH:
      return {
        ...state,
        loading: false,
        users: payload,
        user: null,

      }


    case CREATE:
      return {
        ...state,
        loading: false,
        user: payload,
        error: '',
        users: [...state.users, payload]

      }

    case FETCH_ONE:
      return { ...state, loading: false, user: payload };

    case UPDATE:
      return {
        ...state,
        users: [...state.users.filter(user => user.id !== payload.id), payload]

      };
    //state.users.map((user) => (user._id === action.payload.id ? action.payload : user))

    case FAILED_REQUEST:
      return {
        ...state,
        loading: false,
        error: payload
      }
    case RESET_USER:
      return {
        ...state,
        user: null,
      }


    default: return state
  }
}

export default Users



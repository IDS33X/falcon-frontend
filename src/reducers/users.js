import {

<<<<<<< Updated upstream
  FETCH_BY_SEARCH,
  START_LOADING,
  FETCH_ONE,
  FETCH_ALL,
  FAILED_REQUEST,
  RESET_USER,
  UPDATE,
  CREATE
=======
  FAILED_USER_REQUEST,
  FETCH_USERS,
  SEARCH_USERS,
  FETCH_USER,
  CREATE_USER,
  UPDATE_USER,
  START_LOADING_USER,
  SET_USER
>>>>>>> Stashed changes
} from '../constants/actionTypes'

const initialState = {
  loading: false,
  users: [],
  error: '',
  user: null,
  currentPage: 0,
  amountOfPages: 0,
  totalOfItems: 0

};

const Users = (state = initialState, { type, payload }) => {
  switch (type) {

    case FETCH_USERS:
      return {
        ...state,
        loading: false,
        error: '',
        currentPage: payload.currentPage,
        amountOfPages: payload.amountOfPages,
        users: payload.users,
        totalOfItems: payload.totalOfItems,
      }
    case START_LOADING_USER:
      return {
        ...state,
        loading: true
      }

    case SEARCH_USERS:
      return {
        ...state,
        loading: false,
        error: '',
        currentPage: payload.currentPage,
        amountOfPages: payload.amountOfPages,
        users: payload.users,
        totalOfItems: payload.totalOfItems,


      }


    case CREATE_USER:
      return {
        ...state,
        loading: false,
        user: payload,
        error: '',
        users: [...state.users, payload.user],
        totalOfItems: state.totalOfItems+1,


      }

    case FETCH_USER:
      return { ...state, loading: false, user: payload };

    case UPDATE_USER:
      return {
        ...state,
        users: [state.users?.filter(user => user.id !== payload.id), payload]

      };

    case FAILED_USER_REQUEST:
      return {
        ...state,
        loading: false,
        error: payload
      }
<<<<<<< Updated upstream
    case RESET_USER:
=======
    case SET_USER:
>>>>>>> Stashed changes
      return {
        ...state,
        user: null,
      }


    default: return state
  }
}

export default Users



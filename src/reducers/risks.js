import {

  FETCH_BY_SEARCH,
  START_LOADING,
  FETCH_ONE,
  FETCH_ALL,
  FAILED_REQUEST,
  SET_OBJECT_NULL,
  UPDATE,
  CREATE,
  SET_ONE,
  CLOSE_FORM,
  OPEN_FORM
} from '../constants/actionTypes'

const initialState = {
  loading: false,
  risks: [],
  error: '',
  risk: null,
  currentPage: 0,
  amountOfPages: 0,
  showRiskFormDialog: false,
};

const risks = (state = initialState, { type, payload }) => {
  switch (type) {

    case FETCH_ALL:
      return {
        ...state,
        loading: false,
        error: '',
        currentPage: payload.currentPage,
        amountOfPages: payload.amountOfPages,
        risks: payload.risks,
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
        error: '',
        currentPage: payload.currentPage,
        amountOfPages: payload.amountOfPages,
        risks: payload.risks,

      }


    case CREATE:
      return {
        ...state,
        loading: false,
        error: '',
        risks: [...state.risks, payload]
      }

    case FETCH_ONE:
      return { ...state, loading: false, risk: payload };

    case SET_ONE:
      return {
        ...state,
        risk: payload
      };

    case UPDATE:
      return {
        ...state,
        risks: [...state.riks.filter(risk => risk.id !== payload.id), payload]

      };
    //state.users.map((user) => (user._id === action.payload.id ? action.payload : user))

    case FAILED_REQUEST:
      return {
        ...state,
        loading: false,
        error: payload
      }
    case SET_OBJECT_NULL:
      return {
        ...state,
        risk: null,
      }

    case OPEN_FORM:
      return {
        ...state,
        showRiskFormDialog: true
      }

    case CLOSE_FORM:
      return {
        ...state,
        showRiskFormDialog: false
      }



    default: return state
  }
}

export default risks



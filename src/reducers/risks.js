import {

  FETCH_RISKS,
  SEARCH_RISKS,
  CREATE_RISK,
  UPDATE_RISK,
  START_LOADING_RISK,
  FAILED_RISK_REQUEST,
  SET_RISK,
  CLOSE_RISK_FORM_DIALOG,
  OPEN_RISK_FORM_DIALOG
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

    case FETCH_RISKS:
      return {
        ...state,
        loading: false,
        error: '',
        currentPage: payload.currentPage,
        amountOfPages: payload.amountOfPages,
        risks: payload.risks,
      }
    case START_LOADING_RISK:
      return {
        ...state,
        loading: true
      }

    case SEARCH_RISKS:
      return {
        ...state,
        loading: false,
        error: '',
        currentPage: payload.currentPage,
        amountOfPages: payload.amountOfPages,
        risks: payload.risks,

      }


    case CREATE_RISK:
      return {
        ...state,
        loading: false,
        error: '',
        risks: [...state.risks, payload.risk]
      }



    case SET_RISK:
      return {
        ...state,
        risk: payload
      };

    case UPDATE_RISK:
      let index = state.risks.findIndex(risk => risk.id === payload.risk.id);
      const newArray = [...state.risks]; //making a new array
      newArray[index] = {...payload.risk}//changing value in the new array
      
      return {
        ...state,
        risks: newArray,
        loading: false,

      };
      

    case FAILED_RISK_REQUEST:
      return {
        ...state,
        loading: false,
        error: payload
      }


    case OPEN_RISK_FORM_DIALOG:
      return {
        ...state,
        showRiskFormDialog: true
      }

    case CLOSE_RISK_FORM_DIALOG:
      return {
        ...state,
        showRiskFormDialog: false
      }



    default: return state
  }
}

export default risks



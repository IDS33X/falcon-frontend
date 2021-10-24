import {

  FETCH_ALL_CONTROLS,
  FETCH_CONTROLS_BY_RISK,
  SEARCH_CONTROLS,
  CREATE_CONTROL,
  UPDATE_CONTROL,
  START_LOADING_CONTROL,
  FAILED_CONTROL_REQUEST,
  SET_CONTROL,
  CLOSE_CONTROL_FORM_DIALOG,
  OPEN_CONTROL_FORM_DIALOG,
  FETCH_AUTOMATION_LEVELS,
  FETCH_CONTROL_STATES,
  FETCH_CONTROL_TYPES
} from '../constants/actionTypes'

const initialState = {
  loading: false,
  controls: [],
  controlsByRisk: [],
  error: '',
  control: null,
  currentPage: 0,
  amountOfPages: 0,
  totalOfItems: 0,
  showControlFormDialog: false,
  automationLevels: [],
  controlStates: [],
  controlTypes: []

};

const controls = (state = initialState, { type, payload }) => {
  switch (type) {

    case FETCH_ALL_CONTROLS:
      return {
        ...state,
        loading: false,
        error: '',
        currentPage: payload.currentPage,
        amountOfPages: payload.amountOfPages,
        totalOfItems: payload.totalOfItems,
        controls: payload.controls,
      }

    case FETCH_CONTROLS_BY_RISK:
      return {
        ...state,
        controlsByRisk: payload.controls,
      }

    case START_LOADING_CONTROL:
      return {
        ...state,
        loading: true
      }

    case SEARCH_CONTROLS:
      return {
        ...state,
        loading: false,
        error: '',
        currentPage: payload.currentPage,
        amountOfPages: payload.amountOfPages,
        controls: payload.controls,
        totalOfItems: payload.totalOfItems,

      }


    case CREATE_CONTROL:
      return {
        ...state,
        loading: false,
        error: '',
        controls: [...state.controls, payload.control]
      }


    case SET_CONTROL:
      return {
        ...state,
        control: payload
      };

    case UPDATE_CONTROL:
      let index = state.controls.findIndex(control => control.id === payload.control.id);
      const newArray = [...state.controls]; //making a new array
      newArray[index] = { ...payload.control }//changing value in the new array

      return {
        ...state,
        controls: newArray,
        loading: false,

      };


    case FAILED_CONTROL_REQUEST:
      return {
        ...state,
        loading: false,
        error: payload
      }


    case OPEN_CONTROL_FORM_DIALOG:
      return {
        ...state,
        showControlFormDialog: true
      }

    case CLOSE_CONTROL_FORM_DIALOG:
      return {
        ...state,
        showControlFormDialog: false
      }

    case FETCH_AUTOMATION_LEVELS:
      return {
        ...state,
        automationLevels: payload
      }

    case FETCH_CONTROL_STATES:
      return {
        ...state,
        controlStates: payload
      }

    case FETCH_CONTROL_TYPES:
      return {
        ...state,
        controlTypes: payload
      }


    default: return state
  }
}

export default controls;



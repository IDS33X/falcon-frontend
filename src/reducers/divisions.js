import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_ONE, CREATE_DIVISION, UPDATE_DIVISION, FETCH_DIVISIONS_BY_SEARCH, START_LOADING, END_LOADING, FETCH_BY_AREA, FETCH_ALL_DIVISIONS, FETCH_AMOUNT_OF_DIVISIONS, SET_CURRENT_DIVISION_TITLE} from '../constants/actionTypes';

const divisionsReducer = (state = { isLoading: true, divisions: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
          return { ...state, isLoading: true };
        case END_LOADING:
          return { ...state, isLoading: false };
        case FETCH_ALL_DIVISIONS:
          return {
            ...state,
            divisions: action.payload.divisions,
            currentPage: action.payload.currentPage,
            amountOfPages: action.payload.amountOfPages, // Refactor in backend the name amountOfPages to numberOfPages cause its more explicit.
          };
        case FETCH_BY_AREA:
            return { ...state, divisions: action.payload.divisions };
        case FETCH_DIVISIONS_BY_SEARCH:
          return { ...state, 
                      divisions: action.payload.divisions,
                      currentPage: action.payload.currentPage,
                      amountOfPages: action.payload.amountOfPages, };
        case FETCH_ONE:
          return { ...state, area: action.payload.area };
        case FETCH_AMOUNT_OF_DIVISIONS:
          return { 
            ...state,
            amountOfLastPageDivisions: action.payload
          } 
        case SET_CURRENT_DIVISION_TITLE:
          return { 
            ...state,
            currentDivisionTitle: action.payload
          }
        case CREATE_DIVISION:
          return { ...state, divisions: [...state.divisions, action.payload] };
        case UPDATE_DIVISION:
          return { ...state, divisions: state.divisions.map((division) => (division.id === action.payload.id ? action.payload : division)) };
        default:
          return state;
    }
}

export default divisionsReducer;
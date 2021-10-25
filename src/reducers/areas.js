import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_ONE, CREATE, UPDATE, START_LOADING, END_LOADING, UPDATE_AREA, CREATE_AREA, FETCH_AMOUNT_OF_AREAS, SET_CURRENT_AREA_TITLE} from '../constants/actionTypes';

const areasReducer = (state = { isLoading: true, areas: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
          return { ...state, isLoading: true };
        case END_LOADING:
          return { ...state, isLoading: false };
        case FETCH_ALL:
          return {
            ...state,
            areas: action.payload.areas,
            currentPage: action.payload.currentPage,
            amountOfPages: action.payload.amountOfPages, // Refactor in backend the name amountOfPages to numberOfPages cause its more explicit.
          };
        case FETCH_BY_SEARCH:
          return { ...state, 
                    areas: action.payload.areas,
                    currentPage: action.payload.currentPage,
                    amountOfPages: action.payload.amountOfPages,
                  };
        case FETCH_ONE:
          return { ...state, area: action.payload.area };
        case FETCH_AMOUNT_OF_AREAS:
          return { 
            ...state,
            amountOfLastPageAreas: action.payload
          }
        case SET_CURRENT_AREA_TITLE:
          return { 
            ...state,
            currentAreaTitle: action.payload
          }
        case CREATE_AREA:
          return { ...state, areas: [...state.areas, action.payload] };
        case UPDATE_AREA:
          return { ...state, areas: state.areas.map((area) => (area.id === action.payload.id ? action.payload : area)) };
        default:
          return state;
    }
}

export default areasReducer;
import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_ONE, CREATE, UPDATE, START_LOADING, END_LOADING} from '../constants/actionTypes';

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
          return { ...state, areas: action.payload.areas };
        case FETCH_ONE:
          return { ...state, area: action.payload.area };
        case CREATE:
          return { ...state, areas: [...state.areas, action.payload] };
        case UPDATE:
          return { ...state, areas: state.areas.map((area) => (area._id === action.payload._id ? action.payload : area)) };
        default:
          return state;
    }
}

export default areasReducer;
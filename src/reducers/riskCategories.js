import { START_LOADING, END_LOADING, FETCH_ALL_RISK_CATEGORIES, FETCH_BY_DEPARTMENT, FETCH_RISK_CATEGORIES_BY_SEARCH, FETCH_AMOUNT_OF_RISK_CATEGORIES, CREATE_DEPARTMENT, UPDATE_DEPARTMENT, CREATE_RISK_CATEGORY, UPDATE_RISK_CATEGORY} from '../constants/actionTypes';

const riskCategoriesReducer = (state = { isLoading: true, riskCategories: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
          return { ...state, isLoading: true };
        case END_LOADING:
          return { ...state, isLoading: false };
        case FETCH_ALL_RISK_CATEGORIES:
          return {
            ...state,
            riskCategories: action.payload.riskCategories,
            currentPage: action.payload.currentPage,
            amountOfPages: action.payload.amountOfPages, // Refactor in backend the name amountOfPages to numberOfPages cause its more explicit.
          };
        case FETCH_BY_DEPARTMENT:
            return { ...state, riskCategories: action.payload.riskCategories };
        case FETCH_RISK_CATEGORIES_BY_SEARCH:
          return { ...state, 
                      riskCategories: action.payload.riskCategories,
                      currentPage: action.payload.currentPage,
                      amountOfPages: action.payload.amountOfPages, };
        // case FETCH_ONE:
        //   return { ...state, area: action.payload.area };
        case FETCH_AMOUNT_OF_RISK_CATEGORIES:
          return { 
            ...state,
            amountOfLastPageRiskCategories: action.payload
          } 
        case CREATE_RISK_CATEGORY:
          return { ...state, riskCategories: [...state.riskCategories, action.payload] };
        case UPDATE_RISK_CATEGORY:
          return { ...state, riskCategories: state.riskCategories.map((riskCategory) => (riskCategory.id === action.payload.id ? action.payload : riskCategory)) };
        default:
          return state;
    }
}

export default riskCategoriesReducer;
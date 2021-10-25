import { START_LOADING, END_LOADING, FETCH_ALL_DEPARTMENTS, FETCH_BY_DIVISION, FETCH_DEPARTMENTS_BY_SEARCH, FETCH_ONE, FETCH_AMOUNT_OF_DEPARTMENTS, CREATE_DEPARTMENT, UPDATE_DEPARTMENT, SET_CURRENT_DEPARTMENT_TITLE } from '../constants/actionTypes';

const departmentsReducer = (state = { isLoading: true, departments: [] }, action) => {
    switch (action.type) {
        case START_LOADING:
          return { ...state, isLoading: true };
        case END_LOADING:
          return { ...state, isLoading: false };
        case FETCH_ALL_DEPARTMENTS:
          return {
            ...state,
            departments: action.payload.departments,
            currentPage: action.payload.currentPage,
            amountOfPages: action.payload.amountOfPages, // Refactor in backend the name amountOfPages to numberOfPages cause its more explicit.
          };
        case FETCH_BY_DIVISION:
            return { ...state, departments: action.payload.departments };
        case FETCH_DEPARTMENTS_BY_SEARCH:
          return { ...state, 
                      departments: action.payload.departments,
                      currentPage: action.payload.currentPage,
                      amountOfPages: action.payload.amountOfPages, };
        // case FETCH_ONE:
        //   return { ...state, area: action.payload.area };
        case FETCH_AMOUNT_OF_DEPARTMENTS:
          return { 
            ...state,
            amountOfLastPageDepartments: action.payload
          }
        case SET_CURRENT_DEPARTMENT_TITLE:
          return { 
            ...state,
            currentDepartmentTitle: action.payload
          }
        case CREATE_DEPARTMENT:
          return { ...state, departments: [...state.departments, action.payload] };
        case UPDATE_DEPARTMENT:
          return { ...state, departments: state.departments.map((department) => (department.id === action.payload.id ? action.payload : department)) };
        default:
          return state;
    }
}

export default departmentsReducer;
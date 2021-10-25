import * as api from '../api/index.js';
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_ONE, START_LOADING, END_LOADING, FETCH_BY_SEARCH, FETCH_BY_AREA, FETCH_ALL_DIVISIONS, CREATE_DIVISION, FETCH_AMOUNT_OF_DIVISIONS, FETCH_DIVISIONS_BY_SEARCH, UPDATE_DIVISION, SET_CURRENT_DIVISION_TITLE} from '../constants/actionTypes';

export const getDivisionsByArea = (searchQuery) => async(dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data: { divisions, currentPage, amountOfPages } } = await api.fetchDivisionsByArea(searchQuery);
      //console.log(amountOfPages);
      dispatch({ type: FETCH_ALL_DIVISIONS, payload: { divisions, currentPage, amountOfPages }});
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
};

export const createDivision = (newDivision) => async(dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { division } } = await api.createDivision(newDivision);
    dispatch({ type: END_LOADING });

    dispatch({ type: CREATE_DIVISION, payload: division });
  } catch (error) {
    console.log(error);
  }
};

export const getDivisionsBySearch = (searchQuery) => async(dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { divisions, amountOfPages, currentPage } } = await api.fetchDivisionsBySearch(searchQuery);
    console.log(divisions);
    dispatch({ type: FETCH_DIVISIONS_BY_SEARCH, payload: { divisions, amountOfPages, currentPage } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getAmountOfDivisions = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { divisions } }  = await api.fetchDivisionsByArea(searchQuery);
    dispatch({ type: FETCH_AMOUNT_OF_DIVISIONS, payload: divisions.length });
    dispatch({ type: END_LOADING });

  } catch (error) {
    console.log(error);
  }
};

export const updateDivision = (updatedDivision) => async(dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { division } } = await api.updateDivision(updatedDivision);
    dispatch({ type: END_LOADING });

    dispatch({ type: UPDATE_DIVISION, payload: division });
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentDivisionTitle = (divisionTitle) => async (dispatch) => {
  try {
    dispatch({ type: SET_CURRENT_DIVISION_TITLE, payload: divisionTitle });
  } catch (error) {
    console.log(error);
  }
};

// export const updateArea = (updatedArea) => async(dispatch) => {
//   try {
//     dispatch({ type: START_LOADING });
//     const { data: { area } } = await api.updateArea(updatedArea);
//     dispatch({ type: END_LOADING });

//     dispatch({ type: UPDATE_AREA, payload: area });
//   } catch (error) {
//     console.log(error);
//   }
// };


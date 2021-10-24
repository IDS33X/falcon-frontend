import * as api from '../api/index.js';
import { START_LOADING, END_LOADING, FETCH_ALL_DEPARTMENTS, CREATE_DEPARTMENT, FETCH_DEPARTMENTS_BY_SEARCH, FETCH_AMOUNT_OF_DEPARTMENTS, UPDATE_DEPARTMENT } from '../constants/actionTypes';

export const getDepartmentsByDivision = (searchQuery) => async(dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data: { departments, currentPage, amountOfPages } } = await api.fetchDepartmentsByDivision(searchQuery);
      //console.log(amountOfPages);
      dispatch({ type: FETCH_ALL_DEPARTMENTS, payload: { departments, currentPage, amountOfPages }});
      dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
};

export const createDepartment = (newDepartment) => async(dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { department } } = await api.createDepartment(newDepartment);
    dispatch({ type: END_LOADING });

    dispatch({ type: CREATE_DEPARTMENT, payload: department });
  } catch (error) {
    console.log(error);
  }
};

export const getDepartmentsBySearch = (searchQuery) => async(dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { departments, amountOfPages, currentPage } } = await api.fetchDepartmentsBySearch(searchQuery);
    console.log(departments);
    dispatch({ type: FETCH_DEPARTMENTS_BY_SEARCH, payload: { departments, amountOfPages, currentPage } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getAmountOfDepartments = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { departments } }  = await api.fetchDepartmentsByDivision(searchQuery);
    dispatch({ type: FETCH_AMOUNT_OF_DEPARTMENTS, payload: departments.length });
    dispatch({ type: END_LOADING });

  } catch (error) {
    console.log(error);
  }
};

export const updateDepartment = (updatedDepartment) => async(dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { department } } = await api.updateDepartment(updatedDepartment);
    dispatch({ type: END_LOADING });

    dispatch({ type: UPDATE_DEPARTMENT, payload: department });
  } catch (error) {
    console.log(error);
  }
};
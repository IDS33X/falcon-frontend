import * as api from '../api/index.js';
import { START_LOADING, END_LOADING, FETCH_ALL_RISK_CATEGORIES, CREATE_RISK_CATEGORY, FETCH_RISK_CATEGORIES_BY_SEARCH, FETCH_AMOUNT_OF_RISK_CATEGORIES, UPDATE_RISK_CATEGORY, SET_CURRENT_RISK_CATEGORY_TITLE } from '../constants/actionTypes';

export const getRiskCategoriesByDepartment = (searchQuery) => async(dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      //console.log(searchQuery.departmentId);
      const { data: { riskCategories, currentPage, amountOfPages } } = await api.fetchRiskCategoriesByDepartment(searchQuery);
      dispatch({ type: END_LOADING });
      //console.log(riskCategories[0].title);
      dispatch({ type: FETCH_ALL_RISK_CATEGORIES, payload: { riskCategories, currentPage, amountOfPages }});
    } catch (error) {
      console.log(error);
    }
};

export const createRiskCategory = (newRiskCategory) => async(dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { riskCategory } } = await api.createRiskCategory(newRiskCategory);
    dispatch({ type: END_LOADING });

    dispatch({ type: CREATE_RISK_CATEGORY, payload: riskCategory });
  } catch (error) {
    console.log(error);
  }
};

export const getRiskCategoriesBySearch = (searchQuery) => async(dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { riskCategories, amountOfPages, currentPage } } = await api.fetchRiskCategoriesBySearch(searchQuery);
    console.log(riskCategories);
    dispatch({ type: FETCH_RISK_CATEGORIES_BY_SEARCH, payload: { riskCategories, amountOfPages, currentPage } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getAmountOfRiskCategories = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { riskCategories } }  = await api.fetchRiskCategoriesByDepartment(searchQuery);
    dispatch({ type: FETCH_AMOUNT_OF_RISK_CATEGORIES, payload: riskCategories.length });
    dispatch({ type: END_LOADING });

  } catch (error) {
    console.log(error);
  }
};

export const updateRiskCategory = (updatedRiskCategory) => async(dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { riskCategory } } = await api.updateRiskCategory(updatedRiskCategory);
    dispatch({ type: END_LOADING });

    dispatch({ type: UPDATE_RISK_CATEGORY, payload: riskCategory });
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentRiskCategoryTitle = (riskCategoryTitle) => async (dispatch) => {
  try {
    dispatch({ type: SET_CURRENT_RISK_CATEGORY_TITLE, payload: riskCategoryTitle });
  } catch (error) {
    console.log(error);
  }
};
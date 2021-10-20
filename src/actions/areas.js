import * as api from '../api/index.js';
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_ONE, START_LOADING, END_LOADING, FETCH_BY_SEARCH } from '../constants/actionTypes';

export const getAreas = (page, itemsPerPage) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { areas, currentPage, amountOfPages } }  = await api.fetchAreas(page, itemsPerPage);
    dispatch({ type: FETCH_ALL, payload: { areas, currentPage, amountOfPages } });
    dispatch({ type: END_LOADING });

  } catch (error) {
    console.log(error);
  }
};

export const getAreasBySearch = (searchQuery) => async(dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { areas } } = await api.fetchAreasBySearch(searchQuery);
    //console.log(areas);
    dispatch({ type: FETCH_BY_SEARCH, payload: { areas } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};
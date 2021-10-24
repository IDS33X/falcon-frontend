import * as api from '../api/index.js';
import { itemsPerPage } from '../components/common/Pagination/Pagination.jsx';
import { FETCH_ALL, CREATE, UPDATE_AREA, DELETE, LIKE, FETCH_ONE, START_LOADING, END_LOADING, FETCH_BY_SEARCH, CREATE_AREA, FETCH_AMOUNT_OF_AREAS} from '../constants/actionTypes';

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
    const { data: { areas, amountOfPages, currentPage } } = await api.fetchAreasBySearch(searchQuery);
    //console.log(areas);
    dispatch({ type: FETCH_BY_SEARCH, payload: { areas, amountOfPages, currentPage } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createArea = (newArea) => async(dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { area } } = await api.createArea(newArea);
    dispatch({ type: END_LOADING });

    dispatch({ type: CREATE_AREA, payload: area });
  } catch (error) {
    console.log(error);
  }
};

export const updateArea = (updatedArea) => async(dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { area } } = await api.updateArea(updatedArea);
    dispatch({ type: END_LOADING });

    dispatch({ type: UPDATE_AREA, payload: area });
  } catch (error) {
    console.log(error);
  }
};

export const getAmountOfAreas = (lastPage) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data: { areas } }  = await api.fetchAreas(lastPage, itemsPerPage);
    dispatch({ type: FETCH_AMOUNT_OF_AREAS, payload: areas.length });
    dispatch({ type: END_LOADING });

  } catch (error) {
    console.log(error);
  }
};

import { combineReducers } from 'redux';
import confirmationDialog from './alertDialog';
import successDialog from './successDialog';
import editCardDialog from './editCardDialog';

export const reducers = combineReducers({ confirmationDialog, successDialog, editCardDialog });
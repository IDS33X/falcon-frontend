import { combineReducers } from 'redux';
import auth from './auth';
import confirmationDialog from './alertDialog';
import successDialog from './successDialog';
import editCardDialog from './editCardDialog';
import users from './users';

export const reducers = combineReducers({ auth, confirmationDialog, successDialog, editCardDialog, users });
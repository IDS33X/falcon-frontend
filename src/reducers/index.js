import { combineReducers } from 'redux';
import auth from './auth';
import confirmationDialog from './alertDialog';
import successDialog from './successDialog';
import editCardDialog from './editCardDialog';
import users from './users';
import areas from './areas';
import divisions from './divisions';
import departments from './departments';
import riskCategories from './riskCategories';
import userFormDialog from './userFormDialog'
import risks from './risks';
import controls from './controls';

export const reducers = combineReducers({ auth, confirmationDialog, successDialog, editCardDialog, users, userFormDialog, areas, divisions, departments, riskCategories, risks, controls });

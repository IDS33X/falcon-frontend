import { OPEN_USER_FORM_DIALOG, CLOSE_USER_FORM_DIALOG } from '../constants/actionTypes';

const initialState = {
  showUserFormDialog: false
};

export default function userFormDialog(state = initialState, { type }) {
  switch (type) {
    case OPEN_USER_FORM_DIALOG:
      return { ...state, showUserFormDialog: true }

    case CLOSE_USER_FORM_DIALOG:
      return { ...state, showUserFormDialog: false }

    default:
      return state

  }


}



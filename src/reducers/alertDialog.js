import { OPEN_CONFIRMATION_DIALOG, CLOSE_CONFIRMATION_DIALOG } from '../constants/actionTypes';

const initialState = {
  showConfirmationDialog: false
};

export default function confirmationDialog(state = initialState, { type }) {
  switch (type) {
    case OPEN_CONFIRMATION_DIALOG:
      return { ...state, showConfirmationDialog: true }

    case CLOSE_CONFIRMATION_DIALOG:
      return { ...state, showConfirmationDialog: false }

    default:
      return state

  }


}



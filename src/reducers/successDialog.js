import { OPEN_SUCCESS_DIALOG, CLOSE_SUCCESS_DIALOG } from '../constants/actionTypes/successDialogActions';

const initialState = {
  showSuccessDialog: false
};

export default function successDialog(state = initialState, { type }) {
  switch (type) {
    case OPEN_SUCCESS_DIALOG:
      return { ...state, showSuccessDialog : true}

    case CLOSE_SUCCESS_DIALOG:
      return { ...state, showSuccessDialog: false }

    default:
      return state

  }


}



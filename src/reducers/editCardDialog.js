import { OPEN_EDIT_CARD_DIALOG, CLOSE_EDIT_CARD_DIALOG } from '../constants/actionTypes/editCardDialogActions';

const initialState = {
  showEditCardDialog: false
};

export default function editCardDialog(state = initialState, { type }) {
  switch (type) {
    case OPEN_EDIT_CARD_DIALOG:
      return { ...state, showEditCardDialog: true }

    case CLOSE_EDIT_CARD_DIALOG:
      return { ...state, showEditCardDialog: false }

    default:
      return state

  }


}



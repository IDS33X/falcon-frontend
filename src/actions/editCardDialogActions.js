import {OPEN_EDIT_CARD_DIALOG, CLOSE_EDIT_CARD_DIALOG} from '../constants/actionTypes' 

export function openEditCardDialog(payload) {
  return {
    type: OPEN_EDIT_CARD_DIALOG,
    payload: payload
  }

}

export function closeEditCardDialog() {
  return {
    type: CLOSE_EDIT_CARD_DIALOG
    // it doesn't need any payload cause it's not gonna show anything 
  }
}
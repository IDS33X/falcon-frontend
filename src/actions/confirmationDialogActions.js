import {OPEN_CONFIRMATION_DIALOG, CLOSE_CONFIRMATION_DIALOG} from '../constants/actionTypes' 
export function openConfirmationDialog(payload) {
  return {
    type: OPEN_CONFIRMATION_DIALOG,
    payload: payload
  }

}

export function closeConfirmationDialog() {
  return {
    type: CLOSE_CONFIRMATION_DIALOG
    // it doesn't need any payload cause it's not gonna show anything 
  }
}
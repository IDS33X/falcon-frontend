import {OPEN_SUCCESS_DIALOG, CLOSE_SUCCESS_DIALOG} from '../constants/actionTypes' 

export function openSuccessDialog(payload) {
  return {
    type: OPEN_SUCCESS_DIALOG,
    payload: payload
  }

}

export function closeSuccessDialog() {
  return {
    type: CLOSE_SUCCESS_DIALOG
  }
}
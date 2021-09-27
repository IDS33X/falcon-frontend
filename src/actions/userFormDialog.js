import { OPEN_USER_FORM_DIALOG, CLOSE_USER_FORM_DIALOG } from '../constants/actionTypes'

export function openUserFormDialog(payload) {
  return {
    type: OPEN_USER_FORM_DIALOG,
    payload: payload
  }

}

export function closeUserFormDialog() {
  return {
    type: CLOSE_USER_FORM_DIALOG

  }
}
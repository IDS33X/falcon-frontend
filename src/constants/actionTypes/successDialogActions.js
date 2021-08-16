export const OPEN_SUCCESS_DIALOG = 'OPEN_SUCCESS_DIALOG';
export const CLOSE_SUCCESS_DIALOG = 'CLOSE_SUCCESS_DIALOG';

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
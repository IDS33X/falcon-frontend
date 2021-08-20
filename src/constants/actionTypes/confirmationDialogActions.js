export const OPEN_CONFIRMATION_DIALOG = 'OPEN_CONFIRMATION_DIALOG';
export const CLOSE_CONFIRMATION_DIALOG = 'CLOSE_CONFIRMATION_DIALOG';

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

import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

// Base component for all the dialogs in the application (the title and the size of the dialog will be sent as parameters)
export default function DialogWrapper({ children, fullWidth, title, open, close }) {

  return (

    <Dialog
      open={open}
      fullWidth={fullWidth}
      maxWidth={fullWidth}
      onClose={close}
      keepMounted>
      {title &&

        <DialogTitle id="alert-dialog-slide-title">
          <Typography variant='h5' align="center">{title}</Typography>

        </DialogTitle>
      }

      <DialogContent>
        {children}
      </DialogContent>


    </Dialog>
  )


}




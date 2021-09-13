import DialogWrapper from "../Dialog/DialogWrapper";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import useStyles from './styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from "react-redux"
import { closeConfirmationDialog } from '../../../actions/confirmationDialogActions'

// This is the dialog that will show up when an user is about to make a permanent action 
const ConfirmationDialog = ({ onYesAction }) => {
    const classes = useStyles();
    const { showConfirmationDialog } = useSelector(state => state.confirmationDialog);
    const dispatch = useDispatch();

    return (
        <DialogWrapper fullWidth="xs" open={showConfirmationDialog} close={() => dispatch(closeConfirmationDialog())}>
            <DialogContentText>
                <Typography>¿Está seguro que desea realizar esta acción?</Typography>
            </DialogContentText>
            <DialogActions>
                <Button variant="contained" color="secondary"
                    onClick={() => dispatch(closeConfirmationDialog())}
                    className={classes.button}>
                    Cancelar
                </Button>
                <Button variant="contained" color="primary"
                    onClick={onYesAction}
                    className={classes.button}> Sí </Button>
            </DialogActions>


        </DialogWrapper>
    );
}

export default ConfirmationDialog;
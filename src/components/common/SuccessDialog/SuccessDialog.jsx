import DialogWrapper from "../Dialog/DialogWrapper";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import useStyles from './styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from "react-redux"
import { closeSuccessDialog } from '../../../actions/successDialogActions'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { IconButton } from "@material-ui/core";

// Dialog that is shown when some action is done succesfully. 
const SuccessDialog = ({ mensaje, iconButton }) => {
    const classes = useStyles();
    const { showSuccessDialog } = useSelector(state => state.successDialog);
    const dispatch = useDispatch();

    return (
        <DialogWrapper fullWidth="xs" maxWidth="xs" open={showSuccessDialog} close={() => dispatch(closeSuccessDialog())}>
            <DialogContentText className={classes.iconTextFormat}>
                <IconButton>
                    <iconButton.Icon className={classes.iconStyle} style={{color: iconButton.color}}/>
                </IconButton>
                {/* <CheckCircleIcon className={classes.successIcon} fontSize="large" /> */}
                <Typography className={classes.iconText}>{mensaje}</Typography>
            </DialogContentText>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={() => dispatch(closeSuccessDialog())}
                    className={classes.button}>Ok</Button>

            </DialogActions>


        </DialogWrapper>
    );
}

export default SuccessDialog;
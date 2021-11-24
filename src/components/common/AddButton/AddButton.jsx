import useStyles from './styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {useDispatch } from 'react-redux'
import { openEditCardDialog } from '../../../actions/editCardDialogActions';

const AddButton = ({ title, color = "primary", onClick, setFormType}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    let titleTooltip = "Agregar ";
    titleTooltip += title ? title : "";
    
    const handleOnClick = () => {
        if (setFormType) {
            setFormType('Crear')
            dispatch(openEditCardDialog());
        } else{
            dispatch(onClick());
        }
    }

    return (
        <Tooltip title={titleTooltip} placement="bottom">
            <IconButton aria-label="add" variant="contained" onClick={handleOnClick} >
                <AddCircleIcon color={color} className={classes.button} />
            </IconButton>
        </Tooltip>


    );
}

export default AddButton;
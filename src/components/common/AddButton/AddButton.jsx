import useStyles from './styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const AddButton = ({ title, color = "primary", onClick }) => {
    const classes = useStyles();
    let titleTooltip = "Agregar ";
    titleTooltip += title ? title : "";

    return (
        <Tooltip title={titleTooltip} placement="bottom">
            <IconButton aria-label="add" variant="contained" onClick={onClick} >
                <AddCircleIcon color={color} className={classes.button} />
            </IconButton>
        </Tooltip>


    );
}

export default AddButton;
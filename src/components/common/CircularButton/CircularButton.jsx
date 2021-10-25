import useStyles from './styles';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';

// The style of all the buttons is defined here 
const CircularButton = ({ children, color = "primary", onClick }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <Button variant="contained" color={color} onClick={onClick} className={classes.button}>
            {children}
        </Button>

    );
}

export default CircularButton;
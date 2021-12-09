import useStyles from './styles';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';

// The style of all the buttons is defined here 
const CircularButton = ({ children, color = "primary", onClick, testId }) => {
    const classes = useStyles();

    return (
        <Button testId={testId} variant="contained" color={color} onClick={onClick} className={classes.button}>
            {children}
        </Button>

    );
}

export default CircularButton;
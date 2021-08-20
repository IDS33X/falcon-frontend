import useStyles from './styles';

import Button from '@material-ui/core/Button';

// The style of all the buttons is defined here 
const CircularButton = ({children, color = "primary", onClick}) => {
    const classes = useStyles();

    return (  
        <Button variant="contained" color={color} onClick={onClick} className={classes.button}>
            {children}
        </Button>          

    );
}
 
export default CircularButton;
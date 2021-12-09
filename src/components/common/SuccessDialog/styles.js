import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        borderRadius: "5em",
        textTransform: 'none'
    },
    iconStyle: {
        paddingTop: '0.5rem',
        fontSize: '2em'
    },
    iconText: {
        color: 'black',
        fontSize: '18px',
        paddingTop: '1rem',
        paddingLeft: '1rem'
    },
    iconTextFormat: {
        display: 'flex',
        marginLeft: '1rem',
        alignItems: 'center'
    },
}));

export default useStyles;



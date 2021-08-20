import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
        borderRadius: "5em",
        textTransform: 'none'

    },

    successIcon: {
        color: "#1A9445",
        fontSize: '3em',
        paddingTop: '0.5rem',


    },
    successText: {
        fontSize: '1.3rem',
        paddingTop: '1rem',
        paddingLeft: '1rem'

    },


    textFormat: {
        display: 'flex',
        marginLeft: '1rem',
        alignItems: 'center'
    },


}));

export default useStyles;



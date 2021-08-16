import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,

    },
    media: {
        height: 140,
    },
    title:{
        textAlign: 'center',
    },
    cardBottom: {
        backgroundColor: '#023E7D',
        height: 20,
        justifyContent: 'flex-end',
    },
    bottomBtn: {
        color: 'rgba(255, 255, 255, 0.95)',

    }

}));
export default useStyles;
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 300,

    },
    media: {
        height: 140,
    },
    title: {
        textAlign: 'center',
    },
    cardBottom: {
        backgroundColor: '#023E7D',
        height: 40,
        justifyContent: 'flex-end',
    },
    bottomBtn: {
        color: 'rgba(255, 255, 255, 0.95)',

    }

}));
export default useStyles;
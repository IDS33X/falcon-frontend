import { makeStyles, withTheme } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    // root: {
    //     minHeight: '400px'
    // },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: '15px',
        height: '100%',
        position: 'relative',
        minHeight: '170px',
    },
    overlay: {
        position: 'absolute',
        justifyContent: 'center',
        color: 'black',
        padding: '0px 10px',

    },
    topActions: {
        ///backgroundColor: '#023E7D',
        display: 'flex',
        justifyContent: 'flex-end',
        margin: '5px 10px',
    },
    bottomButtons: {
        color: 'white'
    },
    editButton: {
        color: 'gray',
        transition: '0.2s',
        '&:hover': {
            color: "#176ECB",
        },
    },
    cardText: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0px 20px'
    },
    title: {
        fontSize: '18px',
        fontWeight: 550,
        color: '#032850'
        //fontSize: '20px',
        //padding: '20px 16px',
    },
    description: {
        padding: '10px 0px'
    },
    cardAction: {
        display: 'block',
        textAlign: 'initial',
        borderRadius: '15px'
    },
    // cardActions: {
    //     padding: '0 16px 8px 16px',
    //     display: 'flex',
    //     justifyContent: 'space-between',
    // },
    cardBottom: {
        backgroundColor: '#023E7D',
        height: 40,
        justifyContent: 'flex-end',
    },

}));
export default useStyles;
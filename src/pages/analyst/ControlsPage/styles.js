import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

    gridContainer: {
        marginBottom: '20px',

        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column-reverse',
        },
    },
}));
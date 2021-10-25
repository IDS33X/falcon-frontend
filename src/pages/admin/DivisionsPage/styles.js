import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({

  pagination: {
    borderRadius: 50,
    padding: '5px',
  },
  paginationGrid: {
    position: 'absolute',
    width: 'Auto',
    height: 'Auto',
    right: '50px',
    marginTop: '2em',
  },
  // gridContainer: {
  //   [theme.breakpoints.down('xs')]: {
  //     flexDirection: 'column-reverse',
  //   },
  // },
}));
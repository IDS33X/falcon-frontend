import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple, red } from '@material-ui/core/colors';

const drawerWidth = 240;

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: 'linear-gradient(to left, #0d3ca1, #023E7D 50%, #000d29 100%);',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    color: '#85caff',
    fontSize: '17px'
  },
  brandContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    textDecoration: 'none'
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: '#0a7bd1',
    height: '40px',
    width: '40px',
  },
  image: {
    marginLeft: '15px',
  },
  logoutButton:{
    color: 'white',
    textTransform: 'none',
    fontSize: '14px',
    "&:hover":{
      color: 'yellow',
    }
  },
  logoText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 800,
    textDecoration: 'none',
    marginLeft: "1px",
    marginBottom: '10px',
    fontSize: '20px'
  },
  sectionName: {
    fontSize: '16px',
    fontWeight: 200,
    color: '#85caff',
    position:'fixed', 
    textAlign:'center', 
    transform: 'translate(65px, 16px)'
  }
}));
import { React, useState, useEffect } from 'react';
import clsx from 'clsx';

import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Avatar, Button, IconButton} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import falconLogo from '../../../images/falconLogo7.png'
import { LOGOUT } from '../../../constants/actionTypes';
import { blue } from '@material-ui/core/colors';


const Layout = ({ children, user, setUser, section }) => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  //const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


  const logout = () => {
    dispatch({ type: LOGOUT }) //Check this
    setUser(null);

    history.push('/');

  };

  useEffect(() => {
    //const token = user?.token;

    // if (token) {
    //   //const decodedToken = decode(token);

    //   //if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    // }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <Link to="/" className={classes.brandContainer} style={{flexGrow: 1}}>
            <IconButton
                size="large"
                disableFocusRipple='true'
                disableRipple='true'
                disableTouchRipple='true'
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
              <img className={classes.image} component={Link} to='/' src={falconLogo} alt="icon" height="40px" />
            </IconButton>
            <Typography className={classes.logoText}>
              Falcon
            </Typography>
            <Typography className={classes.sectionName}>{section}</Typography>
          </Link>
          {user?.user ? (
            <div className={classes.profile} style={{flexGrow: 1}} >
              <Typography className={classes.userName} variant="h6" style={{position: 'fixed', right: 10, transform: 'translate(-70px, -23px)'}} >{user?.user.username}</Typography>
              <Avatar className={classes.purple} alt={user?.user.name} style={{position: 'fixed', right: 10, transform: 'translate(-20px, -19px)'}}>{user?.user.name.charAt(0)}</Avatar>
              <Button variant="text" className={classes.logoutButton} color="secondary" onClick={logout} style={{position: 'fixed', right: 10, transform: 'translate(-66px, -5px)'}}>Cerrar Sesión</Button>
            </div>
          ) : (
            <Button component={Link} to="/areas" variant="contained" color="primary">Sign In</Button>
            )}
        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default Layout;
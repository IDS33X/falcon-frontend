import { React, useState, useEffect } from 'react';
import clsx from 'clsx';

import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Avatar, Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import falconLogo from '../../../images/falconLogo.png'
import { LOGOUT } from '../../../constants/actionTypes';


const Layout = ({ children, user, setUser }) => {
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
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
        
          <Link to="/" className={classes.brandContainer}>
            <img className={classes.image} component={Link} to='/' src={falconLogo} alt="icon" height="40px" />
            <Typography variant="h6" noWrap color='primary'>
              Falcon
            </Typography>
          </Link>
          {user?.employee ? (
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user?.employee.name}>{user?.employee.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6">{user?.employee.name}</Typography>
              <Button variant="contained" className={classes.logout} color="primary" onClick={logout}>Logout</Button>
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
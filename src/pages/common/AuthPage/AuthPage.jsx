import { React, useState, useEffect } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, IconButton } from '@material-ui/core';
import SuccessDialog from '../../../components/common/SuccessDialog/SuccessDialog';
import useStyles from './styles';
import Input from '../../../components/common/Input/Input';
import falconLogo from '../../../images/falconLogo7.png';
import { openSuccessDialog } from '../../../actions/successDialogActions';
import Warning from '@material-ui/icons/Warning';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signIn } from '../../../actions/auth';

const initialState = { username: '', password: '' };


const AuthPage = ({ setUser }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signIn(formData, history));
        
        setUser(JSON.parse(localStorage.getItem('profile'))); // updating the state of the user logged to be accesible from App Component.
    }

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value });

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleContactAdminModal = () => {
        // Maybe not necessary.
    }

    const iconButton = {
      title: "AuthenticationError",
      Icon: Warning,
      onClick: openSuccessDialog,
      color: '#808080'
    }

    return (
      <Container component="main" maxWidth="lg" >
          <Grid style={{position: 'fixed', marginTop: '70px'}}>
            <img src={falconLogo} alt="icon" height="500px" className={classes.falconLogo}/>
            <Typography variant="h1" className={classes.falconText}>FALCON</Typography>
            <Typography style={{fontWeight: 100, fontSize: '25px', textTransform: 'none', color: 'white', opacity: '0.7',marginLeft: '12px', fontStyle: 'italic'}}>Risk Control Management System</Typography>
          </Grid>
          <Container maxWidth="xs" style={{width: '24em', marginRight: '80px', marginLeft: '50px', marginTop: '200px', padding: '30px', position: 'absolute', right: '100px', backgroundColor: '#023E7D', borderRadius: 5}}>
            <Typography style={{fontWeight: 100, fontSize: '18px', textTransform: 'none', color: 'white',marginLeft: '60px', fontStyle: 'italic'}}>¡Bienvenid@, otra vez!</Typography>
          <Paper className={classes.paper} elevation={3} style={{marginRight: '5px', borderRadius: 5}}>
            <Typography variant="button" style={{fontWeight: 500, fontSize: '18px', textTransform: 'none'}}>Iniciar Sesión</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Input name="username" label="Usuario" handleChange={handleChange} type="username"/>
                <Input name="password" label="Contraseña" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
              </Grid>
              <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} style={{textTransform: 'none', borderRadius: 30}} testId='submitButton'>
                    <Typography style={{textTransform: 'none'}}>Ingresar</Typography>
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Button onClick={handleContactAdminModal} style={{textTransform: 'none'}}>
                    No tienes una cuenta? Contacta al administrador.
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
          <SuccessDialog mensaje="Credenciales Incorrectas. Por favor intente de nuevo." iconButton={iconButton}></SuccessDialog>
        </Container>
      </Container>
    );        
}

export default AuthPage;
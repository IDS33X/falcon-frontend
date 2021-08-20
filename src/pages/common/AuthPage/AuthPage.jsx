import { React, useState, useEffect } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from '../../../components/common/Input/Input';
import falconLogo from '../../../images/falconLogo.png';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signIn } from '../../../actions/auth';

const initialState = { employeeCode: '', password: '' };


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

    return (
        <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <img src={falconLogo} alt="icon" height="40px" />
          <Typography component="h1" variant="button">FALCON</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Input name="employeeCode" label="Código de Empleado" handleChange={handleChange} type="employeeCode" />
              <Input name="password" label="Contraseña" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
             Iniciar Sesión
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Button onClick={handleContactAdminModal}>
                  No tienes una cuenta? Contacta al administrador.
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    );        
}

export default AuthPage;

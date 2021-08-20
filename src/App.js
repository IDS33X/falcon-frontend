import { React, useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';


import AuthPage from './pages/common/AuthPage/AuthPage';
import AuthRoute from './pages/common/AuthPage/AuthRoute';
import AreasPage from './pages/admin/AreasPage/AreasPage';
import RiskCategoriesPage from './pages/riskanalyst/RiskCategoriesPage/RiskCategoriesPage';
import DeviationMatrixPage from './pages/internalcontrol/DeviationMatrixPage/DeviationMatrixPage';
import MyControlsPage from './pages/employee/MyControlsPage/MyControlsPage';
import PrivateRoute from './pages/PrivateRoute';
import Layout from './components/common/Layout/Layout';

const App = () => {
  var [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')));
  
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        {!user? <AuthRoute path="/" exact type = {'notLogged'} setUser = {setUser}/> : <Layout user = {user} setUser = {setUser}>
          <Switch>
            
            
            { /* <Route path="/areas" exact component={ () => ((user?.employee?.rol !== 'admin' || !user) ? <Redirect to = "/"/> : <AreasPage/> )}/>
            <Route path="/riskcategories" exact component={ () =>  ((user?.employee?.rol !== 'analyst' || !user) ? <Redirect to = "/"/> : <AreasPage/> )}/>
            <Route path="/deviationmatrix" exact component={ () => ((user?.employee?.rol !== 'internalcontrol' || !user) ? <Redirect to = "/"/> : <DeviationMatrixPage/> )}/>
            <Route path="/mycontrols" exact component={ () => ((user?.employee?.rol !== 'employee' || !user) ? <Redirect to = "/"/> : <MyControlsPage/> )}/>
          */}

            <AuthRoute path="/" exact type = {!user ? 'notLogged' : user.employee.rol } setUser = {setUser}/> {/*Its here too because other components need it for redirect in case of a restricted route.*/}
            <PrivateRoute path="/areas" exact roleWithAccess = 'admin' component = {AreasPage}/>
            <PrivateRoute path="/riskcategories" exact roleWithAccess = 'analyst' component = {RiskCategoriesPage}/>
            <PrivateRoute path="/deviationmatrix" exact roleWithAccess = 'internalcontrol' component = {DeviationMatrixPage}/>
            <PrivateRoute path="/mycontrols" exact roleWithAccess = 'employee' component = {MyControlsPage}/>
          
            
            {/*
              <Route path="/areas/search" exact component={AreasPage} />
              <Route path="/departments/:id" exact component={AreasPage} />
            */ }
          </Switch>
        </Layout>}
      </Container>
    </BrowserRouter>
  );
};

export default App;


//TASK : FIX SIGN IN BUTTON, ITS NOT REDIRECTING.
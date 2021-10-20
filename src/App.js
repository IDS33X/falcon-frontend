import { React, useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TestPage from './pages/TestPage/TestPage';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';

import AuthPage from './pages/common/AuthPage/AuthPage';
import AuthRoute from './pages/common/AuthPage/AuthRoute';
import AreasPage from './pages/admin/AreasPage/AreasPage';
import UsersPage from './pages/admin/UsersPage/UsersPage';
import RisksPage from './pages/analyst/RisksPage/RisksPage';


import RiskCategoriesPage from './pages/riskanalyst/RiskCategoriesPage/RiskCategoriesPage';
import DeviationMatrixPage from './pages/internalcontrol/DeviationMatrixPage/DeviationMatrixPage';
import MyControlsPage from './pages/employee/MyControlsPage/MyControlsPage';
import PrivateRoute from './pages/PrivateRoute';
import Layout from './components/common/Layout/Layout';

const App = () => {
  var [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          {!user ? <AuthRoute path="/" exact type={'notLogged'} setUser={setUser} /> : <Layout user={user} setUser={setUser}>
            <Switch>


              { /* <Route path="/areas" exact component={ () => ((user?.employee?.rol !== 'admin' || !user) ? <Redirect to = "/"/> : <AreasPage/> )}/>
              <Route path="/riskcategories" exact component={ () =>  ((user?.employee?.rol !== 'analyst' || !user) ? <Redirect to = "/"/> : <AreasPage/> )}/>
              <Route path="/deviationmatrix" exact component={ () => ((user?.employee?.rol !== 'internalcontrol' || !user) ? <Redirect to = "/"/> : <DeviationMatrixPage/> )}/>
              <Route path="/mycontrols" exact component={ () => ((user?.employee?.rol !== 'employee' || !user) ? <Redirect to = "/"/> : <MyControlsPage/> )}/>
            */}

              <AuthRoute path="/" exact type={!user ? 'notLogged' : user.employee.rol} setUser={setUser} /> {/*Its here too because other components need it for redirect in case of a restricted route.*/}
              <PrivateRoute path="/areas/:areaId/divisions/:divisionId/departments/:departmentId/users" exact roleWithAccess='admin' component={UsersPage} />
              <PrivateRoute path="/areas/:areaId/divisions/:divisionId/departments/:departmentId/users/edit" exact roleWithAccess='admin' component={UsersPage} />
              <PrivateRoute path="/areas/:areaId/divisions/:divisionId/departments/:departmentId/users/search" exact
                roleWithAccess='admin' component={UsersPage} />

              <PrivateRoute path="/areas/:areaId/divisions/:divisionId/departments/:departmentId/categories/:categoryId/risks" exact roleWithAccess='admin' component={RisksPage} />
              <PrivateRoute path="/areas/:areaId/divisions/:divisionId/departments/:departmentId/categories/:categoryId/risks/edit" exact roleWithAccess='admin' component={RisksPage} />
              <PrivateRoute path="/areas/:areaId/divisions/:divisionId/departments/:departmentId/categories/:categoryId/risks/search" exact roleWithAccess='admin' component={RisksPage} />



              <PrivateRoute path="/areas" exact roleWithAccess='admin' component={AreasPage} />
              <PrivateRoute path="/areas/search" exact roleWithAccess='admin' component={AreasPage} />
              <PrivateRoute path="/riskcategories" exact roleWithAccess='analyst' component={RiskCategoriesPage} />
              <PrivateRoute path="/deviationmatrix" exact roleWithAccess='internalcontrol' component={DeviationMatrixPage} />
              <PrivateRoute path="/mycontrols" exact roleWithAccess='employee' component={MyControlsPage} />
              <PrivateRoute path="/test" exact roleWithAccess='admin' component={TestPage} />

              {/*
                <Route path="/areas/search" exact component={AreasPage} />
                <Route path="/departments/:id" exact component={AreasPage} />
              */ }
            </Switch>
          </Layout>}
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
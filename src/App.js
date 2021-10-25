import { React, useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TestPage from './pages/TestPage/TestPage';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import { useStyles } from './styles';

import AuthPage from './pages/common/AuthPage/AuthPage';
import AuthRoute from './pages/common/AuthPage/AuthRoute';
import AreasPage from './pages/admin/AreasPage/AreasPage';
import DivisionsPage from './pages/admin/DivisionsPage/DivisionsPage';
import DepartmentsPage from './pages/admin/DepartmentsPage/DepartmentsPage';
import UsersPage from './pages/admin/UsersPage/UsersPage';
import RisksPage from './pages/analyst/RisksPage/RisksPage';
import ControlsPage from './pages/analyst/ControlsPage/ControlsPage';


import RiskCategoriesPage from './pages/riskanalyst/RiskCategoriesPage/RiskCategoriesPage';
import MyControlsPage from './pages/employee/MyControlsPage/MyControlsPage';
import PrivateRoute from './pages/PrivateRoute';
import Layout from './components/common/Layout/Layout';

const App = () => {
  var [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  var [section, setSection] = useState('');
  const classes = useStyles();

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl" className={!user ? "" : classes.mainContainer}>
          {!user ? <AuthRoute path="/" exact type={'notLogged'} setUser={setUser} /> : <Layout user={user} setUser={setUser} section={section}>
            <Switch>

              <AuthRoute path="/" exact type={!user ? 'notLogged' : user.employee.rol} setUser={setUser} /> {/*Its here too because other components need it for redirect in case of a restricted route.*/}
              {/* <PrivateRoute path="/areas/:areaId/divisions/:departmentId/users" exact roleWithAccess='admin' component={UsersPage} /> */}
              <PrivateRoute path="/areas" exact roleWithAccess='admin' component={AreasPage} setSection={setSection} sectionName="Administrador"/>
              <PrivateRoute path="/areas/search" exact roleWithAccess='admin' component={AreasPage} setSection={setSection} sectionName="Administrador"/>
              <PrivateRoute path="/divisions" exact roleWithAccess='admin' component={DivisionsPage} setSection={setSection} sectionName="Administrador"/>
              <PrivateRoute path="/divisions/search" exact roleWithAccess='admin' component={DivisionsPage} setSection={setSection}sectionName="Administrador"/>
              <PrivateRoute path="/departments" exact roleWithAccess='admin' component={DepartmentsPage} setSection={setSection} sectionName="Administrador"/>
              <PrivateRoute path="/departments/search" exact roleWithAccess='admin' component={DepartmentsPage} setSection={setSection} sectionName="Administrador"/>
              <PrivateRoute path="/riskcategories" exact roleWithAccess='analyst' component={RiskCategoriesPage} setSection={setSection} sectionName="Analista de Riesgo"/>
              <PrivateRoute path="/riskcategories/search" exact roleWithAccess='analyst' component={RiskCategoriesPage} setSection={setSection} sectionName="Analista de Riesgo"/>
              
              <PrivateRoute path="/departments/:departmentId/users" exact roleWithAccess='admin' component={UsersPage} setSection={setSection} sectionName="Administrador"/>
              <PrivateRoute path="/departments/:departmentId/users/edit" exact roleWithAccess='admin' component={UsersPage} setSection={setSection} sectionName="Administrador"/>
              <PrivateRoute path="/departments/:departmentId/users/search" exact roleWithAccess='admin' component={UsersPage} setSection={setSection} sectionName="Administrador"/>


              <PrivateRoute path="/riskcategories/:categoryId/risks" exact roleWithAccess='analyst' component={RisksPage} setSection={setSection} sectionName="Analista de Riesgo"/>
              <PrivateRoute path="/riskcategories/:categoryId/risks/edit" exact roleWithAccess='analyst' component={RisksPage} setSection={setSection} sectionName="Analista de Riesgo"/>
              <PrivateRoute path="/riskcategories/:categoryId/risks/search" exact roleWithAccess='analyst' component={RisksPage} setSection={setSection} sectionName="Analista de Riesgo"/>
              <PrivateRoute path="/riskcategories/:categoryId/risks/:riskId/controls" exact roleWithAccess='analyst' component={RisksPage} setSection={setSection} sectionName="Analista de Riesgo"/>



              <PrivateRoute path="/riskcategories/:categoryId/controls" exact roleWithAccess='analyst' component={ControlsPage} setSection={setSection} sectionName="Analista de Riesgo"/>
              <PrivateRoute path="/riskcategories/:categoryId/controls/edit" exact roleWithAccess='analyst' component={ControlsPage} setSection={setSection} sectionName="Analista de Riesgo"/>
              <PrivateRoute path="/riskcategories/:categoryId/controls/search" exact roleWithAccess='analyst' component={ControlsPage} setSection={setSection} sectionName="Analista de Riesgo"/>


              <PrivateRoute path="/riskcategories/:categoryId/controls/delete" exact roleWithAccess='analyst' component={ControlsPage} setSection={setSection} sectionName="Analista de Riesgo" />

              <PrivateRoute path="/test" exact roleWithAccess='admin' component={TestPage} setSection={setSection} sectionName="Tests"/>

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
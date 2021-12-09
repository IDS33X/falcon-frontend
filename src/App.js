import { React, useState } from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, } from 'react-router-dom';
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
import PrivateRoute from './pages/PrivateRoute';
import Layout from './components/common/Layout/Layout';

const App = () => {
  var [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  var [section, setSection] = useState('');
  const classes = useStyles();
  //console.log(user?.user?.roleId);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl" className={!user ? "" : classes.mainContainer}>
          {!user ? <AuthRoute path="/" exact type={'notLogged'} setUser={setUser} /> : <Layout user={user} setUser={setUser} section={section}>
            <Switch>
              
              <AuthRoute path="/" exact type={!user ? 'notLogged' : (user?.user?.roleId).toString()} setUser={setUser} /> {/*Its here too because other components need it for redirect in case of a restricted route.*/}
              {/* <PrivateRoute path="/areas/:areaId/divisions/:departmentId/users" exact roleWithAccess='admin' component={UsersPage} /> */}
              <PrivateRoute path="/areas" exact roleWithAccess='2' component={AreasPage} setSection={setSection} sectionName="Administrador"/>
              <PrivateRoute path="/areas/search" exact roleWithAccess='2' component={AreasPage} setSection={setSection} sectionName="Administrador"/>
              <PrivateRoute path="/divisions" exact roleWithAccess='2' component={DivisionsPage} setSection={setSection} sectionName="Administrador"/>
              <PrivateRoute path="/divisions/search" exact roleWithAccess='2' component={DivisionsPage} setSection={setSection}sectionName="Administrador"/>
              <PrivateRoute path="/departments" exact roleWithAccess='2' component={DepartmentsPage} setSection={setSection} sectionName="Administrador"/>
              <PrivateRoute path="/departments/search" exact roleWithAccess='2' component={DepartmentsPage} setSection={setSection} sectionName="Administrador"/>
              <PrivateRoute path="/riskcategories" exact roleWithAccess='3' component={RiskCategoriesPage} setSection={setSection} sectionName="Analista de Riesgo"/>
              <PrivateRoute path="/riskcategories/search" exact roleWithAccess='3' component={RiskCategoriesPage} setSection={setSection} sectionName="Analista de Riesgo"/>
              
              <PrivateRoute path="/departments/:departmentId/users" exact roleWithAccess='2' component={UsersPage} setSection={setSection} sectionName="Administrador"/>
              <PrivateRoute path="/departments/:departmentId/users/edit" exact roleWithAccess='2' component={UsersPage} setSection={setSection} sectionName="Administrador"/>
              <PrivateRoute path="/departments/:departmentId/users/search" exact roleWithAccess='2' component={UsersPage} setSection={setSection} sectionName="Administrador"/>


              <PrivateRoute path="/riskcategories/:categoryId/risks" exact roleWithAccess='3' component={RisksPage} setSection={setSection} sectionName="Analista de Riesgo"/>
              <PrivateRoute path="/riskcategories/:categoryId/risks/edit" exact roleWithAccess='3' component={RisksPage} setSection={setSection} sectionName="Analista de Riesgo"/>
              <PrivateRoute path="/riskcategories/:categoryId/risks/search" exact roleWithAccess='3' component={RisksPage} setSection={setSection} sectionName="Analista de Riesgo"/>
              <PrivateRoute path="/riskcategories/:categoryId/risks/:riskId/controls" exact roleWithAccess='3' component={RisksPage} setSection={setSection} sectionName="Analista de Riesgo"/>



              <PrivateRoute path="/riskcategories/:categoryId/controls" exact roleWithAccess='3' component={ControlsPage} setSection={setSection} sectionName="Analista de Riesgo"/>
              <PrivateRoute path="/riskcategories/:categoryId/controls/edit" exact roleWithAccess='3' component={ControlsPage} setSection={setSection} sectionName="Analista de Riesgo"/>
              <PrivateRoute path="/riskcategories/:categoryId/controls/search" exact roleWithAccess='3' component={ControlsPage} setSection={setSection} sectionName="Analista de Riesgo"/>

              <PrivateRoute path="/riskcategories/:categoryId/risks" exact roleWithAccess='analyst' component={RisksPage} />
              <PrivateRoute path="/riskcategories/:categoryId/risks/edit" exact roleWithAccess='analyst' component={RisksPage} />
              <PrivateRoute path="/riskcategories/:categoryId/risks/search" exact roleWithAccess='analyst' component={RisksPage} />
              <PrivateRoute path="/riskcategories/:categoryId/risks/:riskId/controls" exact roleWithAccess='analyst' component={RisksPage} />



              <PrivateRoute path="/riskcategories/:categoryId/controls" exact roleWithAccess='analyst' component={ControlsPage} />
              <PrivateRoute path="/riskcategories/:categoryId/controls/edit" exact roleWithAccess='analyst' component={ControlsPage} />
              <PrivateRoute path="/riskcategories/:categoryId/controls/search" exact roleWithAccess='analyst' component={ControlsPage} />


              <PrivateRoute path="/riskcategories/:categoryId/controls/delete" exact roleWithAccess='analyst' component={ControlsPage} />

              <PrivateRoute path="/riskcategories/:categoryId/controls/delete" exact roleWithAccess='3' component={ControlsPage} setSection={setSection} sectionName="Analista de Riesgo" />

              <PrivateRoute path="/test" exact roleWithAccess='2' component={TestPage} setSection={setSection} sectionName="Tests"/>

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
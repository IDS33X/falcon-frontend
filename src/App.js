import React from 'react';
import { Container } from '@material-ui/core'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TestPage from './pages/TestPage/TestPage';
// import AuthPage from './pages/common/AuthPage/AuthPage';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <Switch>
            <Route path="/" exact component={TestPage} />
          </Switch>
        </Container>
      </ThemeProvider>

    </BrowserRouter>

  );
};

export default App;

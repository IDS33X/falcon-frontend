import React from "react";
import { Redirect, Route } from "react-router";
import AuthPage from "./AuthPage";

const AuthRoute = props => {
  const { type, setUser } = props;

  if (type === 'notLogged') return <AuthPage setUser={setUser}/>;
  else if (type === '2') return <Redirect to="/areas"/>;
  else if (type === '3') return <Redirect to="/riskcategories"/>;
  else if (type === 'internalcontrol') return <Redirect to="/deviationmatrix"/>;
  else if (type === 'employee') return <Redirect to="/mycontrols"/>;


  return <Route {...props} />;
};

export default AuthRoute;

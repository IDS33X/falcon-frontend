import React from "react";
import { Redirect, Route } from "react-router";
import AuthPage from "./AuthPage";

const AuthRoute = props => {
  const { type, setUser } = props;

  if (type === 'notLogged') return <AuthPage setUser={setUser}/>;
  else if (type === 'admin') return <Redirect to="/areas"/>;
  else if (type === 'analyst') return <Redirect to="/riskcategories"/>;
  else if (type === 'internalcontrol') return <Redirect to="/deviationmatrix"/>;
  else if (type === 'employee') return <Redirect to="/mycontrols"/>;


  return <Route {...props} />;
};

export default AuthRoute;

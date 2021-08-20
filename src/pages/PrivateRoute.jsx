import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = props => {
    const { roleWithAccess, path} = props;         
    const user = JSON.parse(localStorage.getItem('profile'));
  
    console.log(`Rol with acces ${roleWithAccess}`);
    console.log(user?.employee?.rol);

    if(user?.employee?.rol !== roleWithAccess || !user ){
        return <Redirect to="/"/>   
     } 
    else {
        <Redirect to={path} />
     }

     return <Route {...props} />;
};

export default PrivateRoute;

import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = props => {
    const { roleWithAccess, path, setSection, sectionName } = props;         
    const user = JSON.parse(localStorage.getItem('profile'));
    
    console.log(`Rol with acces ${roleWithAccess}`);
    console.log(user?.user?.roleId);

    if((user?.user?.roleId).toString() !== roleWithAccess || !user ){
        return <Redirect to="/"/>   
    } 
    else {
        setSection(sectionName);
        <Redirect to={path} />
     }

     return <Route {...props} />;
};

export default PrivateRoute;

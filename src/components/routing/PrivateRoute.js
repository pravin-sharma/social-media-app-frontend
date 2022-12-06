import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
const PrivateRoute = (props) => {
  const { Component }= props
  const { isAuthenticated, loading } = useContext(AuthContext);

  return !isAuthenticated && !loading?<Navigate to='/' />:<Component />
};

export default PrivateRoute

import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateProps = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={routeProps => {
        if (localStorage.getItem("token")) {
          return <Component {...routeProps} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default PrivateProps;

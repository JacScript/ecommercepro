import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { useSelector } from "react-redux";

const PrivateRoute = ({redirect, component: Component, ...rest }) => {
//   const { userInfo } = useSelector((state) => state.auth);
const user = true;
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to={redirect} /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
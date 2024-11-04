import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({redirect, component: Component, ...rest }) => {
  const  user  = useSelector((state) => state.user.currentUser);
// const user = false;
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         // user ?  <Component {...props} /> : <Redirect to={redirect} />
//         user ? <Redirect to={redirect} /> : <Component {...props} />
//       }
//     />
//   );
// };

return (
  <Route
    {...rest}
    render={(props) =>
      user ? <Component {...props} /> : <Redirect to={redirect} />
    }
  />
);
};

export default PrivateRoute;
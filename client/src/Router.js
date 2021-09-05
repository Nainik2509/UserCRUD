// ** React Imports
import React, { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// @@ Views Component's to render
const Login = lazy(() => import("./views/Auth/Login/Login"));
const Home = lazy(() => import("./views/Home/Home"));

// @@ Function to check is User Logged In or Not
const isUserLoggedIn = () => localStorage.getItem("token");

class AppRouter extends React.Component {
  render() {
    if (isUserLoggedIn()) {
      return (
        // ** START Routes To display path routes
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
        // ** END To display path routes
      );
    } else {
      return (
        <Switch>
          <Route exact path="/login" component={Login} />
        </Switch>
      );
    }
  }
}
export default AppRouter;

/** @format */

import React, { memo } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import NotFoundScreen from "pages/NotFound";
import FormScreen from "pages/Form";
import LoginScreen from "pages/Login";

export default memo((): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/form" />;
          }}
        />
        <Route exact path="/form" component={FormScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route path="/dashboard" component={PrivateRoute} />
        <Route path="*" component={NotFoundScreen} />
      </Switch>
    </Router>
  );
});

import React, { memo, Suspense } from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";

import Layout from "layout/Dashboard";
import DashboardScreen from "pages/Dashboard";
import NotFoundScreen from "pages/NotFound";


export default memo(({ match }: RouteComponentProps<{}>): JSX.Element => {
  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }
  return (
    <Suspense fallback={<div />}>
      <Layout>
        <Switch>
          <Route path={`${match.path}`} component={DashboardScreen} />
          <Route path="*" component={NotFoundScreen} />
        </Switch>
      </Layout>
    </Suspense>
  );
});

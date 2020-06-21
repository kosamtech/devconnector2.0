import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import Landing from '../layout/Landing';
import Alert from '../layout/Alert';
import Login  from '../auth/Login';
import Register from '../auth/Register';

const BaseRoutes = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Alert />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </React.Fragment>
  );
}

export default BaseRoutes;

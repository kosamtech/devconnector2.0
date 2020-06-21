import React, { useEffect } from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
import BaseRoutes from './components/routing/BaseRoutes';
import './App.css';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

if (localStorage.getItem('token')) {
  setAuthToken(localStorage.getItem('token'));
  setTimeout(() => {
    localStorage.removeItem('token');
  }, 3600 * 1000);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
    <Router>
      <BaseRoutes />
    </Router>
  );
}

export default App;

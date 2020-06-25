import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoutes = ({ component: Component, isAuthenticated, loading, ...rest }) => (
  <Route
   {...rest} 
   render={props => !loading && !isAuthenticated ? (<Redirect to="/login" />) : 
   (<Component {...props} />)}  
  />
);

PrivateRoutes.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(PrivateRoutes);
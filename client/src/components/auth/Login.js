import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { signin } from '../../actions/auth';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';


const  Login = ({ signin, loading, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    signin({ email, password });
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard"/ >
  }
  
  return (
    <section className="container">
      <div className="form-container my-3">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
        <form onSubmit={e => handleSubmit(e)} className="form">
          <div className="form-group">
            <input
            type="email" 
            placeholder="someone@example.com" 
            name="email"
            value={email}
            onChange={e => handleChange(e)} 
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={e => handleChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-primary">{ loading ? <Loader type="Oval" color="#424242" height={25} width={25} />: "Login" }</button> <span className="pull-right"><Link to="/forgotpassword">Forgot Password?</Link></span>
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </section>
  );
}

Login.propTypes = {
  signin: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signin })(Login);
import React, { useEffect, Fragment } from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import { deleteAccount, deactivateAccount} from '../../actions/profile';
import DashboardActions from './DasboardActions';
import Experience from './Experience';
import Education from './Education';


const Dashboard = ({ loading, getCurrentProfile, profile, auth: { user }, deleteAccount, deactivateAccount }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return  loading && profile === null ? 
  ( <div className="mx-center"><Loader type="Bars" color="#424242" height={80} width={80} /></div>) : (<Fragment>
    <h1 className="large text-primary">Dashboard</h1>
    <p className="lead">
      <i className="fas fa-user"></i> Welcome { user && user.name }
    </p>
    { profile !== null ? 
      <Fragment>
        <DashboardActions /> 
        <Experience experience={profile.experience} />
        <Education education={profile.education} />

        <div>
        <p className="danger-para">Danger Zone</p>
        <div className="danger-zone">
          <button onClick={() => deactivateAccount()} className="btn btn-danger">Deactivate Account</button>
          <button onClick={() => deleteAccount()} className="btn btn-danger">Delete Account</button>
        </div>
        </div>
      </Fragment> : 
      <Fragment>
        <p>You have not yet setup a profile, Please add some info</p>
        <Link to="/create-profile" className="btn btn-primary my-1">Create Profile</Link>
      </Fragment> 
    }
  </Fragment>)
}

Dashboard.propTypes = {
  profile: PropTypes.object,
  loading: PropTypes.bool,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  deactivateAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount, deactivateAccount })(Dashboard);
import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ profiles, loading, getProfiles }) => {
  useEffect(() => {
    getProfiles()
  }, [getProfiles]);

  return loading ? <div className="mx-center"><Loader type="Bars" color="#424242" height={80} width={80} /></div> : <Fragment>
    <h1 className="large text-primary">Developers</h1>
    <p className="lead">
      <i className="fab fa-connectdevelop"> Browse and connect with developers</i>
    </p>
    <div className="profiles">
      { profiles.length > 0 ? profiles.map(profile => (
        <ProfileItem key={profile._id} profile={profile} />
      )) : <h4>No Profiles Found</h4> }
    </div>
  </Fragment>;
}

Profiles.propTypes = {
  profiles: PropTypes.array.isRequired,
  loading: PropTypes.bool
}

const mapStateToProps = state => ({
  profiles: state.profile.profiles,
  loading: state.profile.loading
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
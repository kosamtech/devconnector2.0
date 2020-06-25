import React, { Fragment, useEffect } from 'react';
import { connect }  from 'react-redux';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({ getProfileById, match, loading, profile, isAuthenticated, user }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {
        loading || profile === null ? <div className="mx-center"><Loader type="Bars" color="#424242" height={80} width={80} /></div> : <Fragment>
        <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
        {
          !loading && isAuthenticated && user._id === profile.user._id && (<Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>)
        }
        <div className="profile-grid my-1">
          <ProfileTop profile={profile} />
          <ProfileAbout profile={profile} />
          <div className="profile-exp bg-white p-2">
            <h2 className="text-primary">Experience</h2>
            {profile.experience.length > 0 ? (
              <Fragment>
                {profile.experience.map(exp => (
                  <ProfileExperience key={exp._id} experience={exp} />
                ))}
              </Fragment>
            ) : (
              <h4>No Experience Credentials</h4>
            )}
          </div>
          <div className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {profile.education.length > 0 ? (
              <Fragment>
                {profile.education.map(edu => (
                  <ProfileEducation key={edu._id} education={edu} />
                ))}
              </Fragment>
            ) : (
              <h4>No Education Credentials</h4>
            )}
          </div>
          {profile.githubusername && (
            <ProfileGithub username={profile.githubusername} />
          )}
        </div>
        </Fragment>
      }
    </Fragment>
  );
}

Profile.propTypes = {
  profile: PropTypes.object,
  loading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  getProfileById: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile.profile,
  loading: state.profile.loading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { getProfileById })(Profile);
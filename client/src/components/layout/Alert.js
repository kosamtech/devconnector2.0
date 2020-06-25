import React from 'react';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert'
import PropTypes from 'prop-types';


class Alert extends React.Component {
  componentDidUpdate(prevProps) {
    const { message, errors, alert } = this.props;

    if (message !== prevProps.message) {
      if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
      if (message.profileCreated) alert.success(message.profileCreated);
      if (message.profileUpdated) alert.success(message.profileUpdated);
      if (message.addExp) alert.success(message.addExp);
      if (message.addEdu) alert.success(message.addEdu);
      if (message.deleteExp) alert.error(message.deleteExp);
      if (message.deleteEdu) alert.error(message.deleteEdu);
      if (message.NoProfile) alert.error(message.NoProfile);
    }

    if (errors !== prevProps.errors) {
      if (errors.msg.msg) alert.error(errors.msg.msg);
    }
  }

  render() {
    return (
      <React.Fragment />
    );
  }
}

Alert.propTypes = {
  message: PropTypes.object,
  errors: PropTypes.object
}

const mapStateToProps = state => ({
  message: state.messages,
  errors: state.alerts
});

export default connect(mapStateToProps)(withAlert()(Alert));
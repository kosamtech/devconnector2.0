import React from 'react';
import { connect } from 'react-redux';
import { withAlert } from 'react-alert'
import PropTypes from 'prop-types';


class Alert extends React.Component {
  componentDidUpdate(prevProps) {
    const { message, errors, alert } = this.props;

    if (message !== prevProps.message) {
      if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
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
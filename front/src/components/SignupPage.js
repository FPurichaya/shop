import React, { Component } from 'react';
import SignupForm from './SignupForm';
import PropTypes from 'prop-types';
import api from '../api';

class SignupPage extends Component {
  submit = (data) =>
    api.users.create(data).then(() => {
      this.props.setMessage('You have been successfully signed up!');
      this.props.history.push('/login');
    });

  render() {
    return (
      <div className="ui segment">
        <SignupForm submit={this.submit} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  setMessage: PropTypes.func.isRequired,
};

export default SignupPage;

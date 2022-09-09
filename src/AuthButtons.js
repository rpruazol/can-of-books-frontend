import React from 'react';
import Login from './Login';
import Logout from './Logout';
import { withAuth0 } from "@auth0/auth0-react";

class AuthButtons extends React.Component {
  render() {
    return (
      <>
        {this.props.auth0.isAuthenticated ?
          <Logout />
          :
          <Login />
        }
      </>
    );
  }
}

export default withAuth0(AuthButtons);

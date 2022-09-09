import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';


class LoginButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { loginWithRedirect } = this.props.auth0;
    return <button onClick={() => loginWithRedirect()}>Log in</button>;
  }
}

export default withAuth0(LoginButton);

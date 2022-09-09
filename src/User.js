import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default class Profile extends React.Component {

  render() {
    ({ user } = useAuth0());
    return (
      <div>Hello {user.name}</div>
    )
  }
}
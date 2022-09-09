import React from 'react';
import useAuth0 from '@auth0/auth0-react';


export default class Wrapper extends React.Component {


  render() {

    ({ isLoading, error } = useAuth0());

    if (isLoading) {
      return <div>Loading...</div>
    }
    if (error) {
      return <div>Something went wrong</div>
    }
    return (
      <>{children}</>
    )
  }
}
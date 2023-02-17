import {React} from "react";
import Button from 'react-bootstrap/Button';
import { useAuth0 } from "@auth0/auth0-react";


function LoginButton(props) {


  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();


  const loginFunction = () => {
    console.log('loginStatus: ', props.loginStatus)
    if(!isAuthenticated) {
      loginWithRedirect()
      return props.setLoginStatus('Log Out', () => {console.log('logged in')})
    } else {
      logout({ returnTo: window.location.origin })
      console.log('logged out')
      return props.setLoginStatus('Log In', () => {console.log('logged out')})
    }

  }
  return (
    <>    
    {console.log('loginStatus: ', props.loginStatus)}

    {console.log('isAuth', isAuthenticated) }
      <style type="text/css">
        {`
    .btn-flat {
      background-color: #EF3054;
      color: white;
      // box-shadow: 5px 10px #F9D8DE;
    }

    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }

    p {
      margin-bottom: 0;
    }
    `}
      </style>

      <Button variant="flat" size="xxl" onClick={() => loginFunction()}>
      {isAuthenticated ?
        <p>Log Out</p>
        :
        <p>Log In</p>
        }
      </Button>
    </>
  );
  
}

export default LoginButton;

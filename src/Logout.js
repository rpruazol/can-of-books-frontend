import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import CustomButton from './CustomButton.js';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <CustomButton variant="test" onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </CustomButton>
  );
};

export default LogoutButton;


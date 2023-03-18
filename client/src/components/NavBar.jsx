import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import LoginButton from '../components/LoginButton'
import LogoutButton from '../components/LogoutButton'

const NavBar = () => {

  return (
    <div>
      <LoginButton />
      <LogoutButton />
  
    </div>
  )

}

export default NavBar;
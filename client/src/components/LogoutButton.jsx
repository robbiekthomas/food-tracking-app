import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    // Log Out Button shows only when the user is authenticated
    isAuthenticated && (
      <button className="bg-blue-500 text-white font-medium px-4 py-2 rounded hover:bg-blue-600" onClick={() => logout()} >
        Log Out
      </button>
    )
  )
}

export default LogoutButton
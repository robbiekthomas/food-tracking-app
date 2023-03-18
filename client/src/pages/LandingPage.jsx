import { User } from '@auth0/auth0-react'
import React from 'react'
import LoginButton from '../components/LoginButton'
import LogoutButton from '../components/LogoutButton'
import UserProfile from '../components/UserProfile'
import { useAuth0 } from '@auth0/auth0-react'

const LandingPage = () => {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1>Landing Page</h1>

      <LoginButton />
      <LogoutButton />
      
  {/* User Profile should show on Dashboard */}
      <UserProfile />

    </div>

  )
}

export default LandingPage

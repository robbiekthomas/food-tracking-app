import { User } from '@auth0/auth0-react'
import React from 'react'

import NavBar from '../components/NavBar'
import UserProfile from '../components/UserProfile'
import { useAuth0 } from '@auth0/auth0-react'

const LandingPage = () => {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <NavBar />
      <h1>Landing Page Welcome</h1>

  {/* User Profile should show on Dashboard */}
      <UserProfile />

    </div>

  )
}

export default LandingPage

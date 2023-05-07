import React from 'react'
import Jumbotron from '../../components/cards/Jumbotron'
import { useAuth } from '../../context/auth'
import UserMenu from '../../components/nav/UserMenu'


const UserProfile = () => {
    const [auth, setAuth] = useAuth()

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
         
        </div>
      </div>
    </div>
  )
}

export default UserProfile
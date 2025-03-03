import React, { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'

const UserHome = () => {

    const { user, setUser } = useContext(UserDataContext);

  return (
    <div>
      User name = {user.fullName.firstName + " " + user.fullName.lastName} | 
      email = {user.email} | 
      password = {user.password}
    </div>
  )
}

export default UserHome

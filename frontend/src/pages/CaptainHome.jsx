import React, { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'

const CaptainHome = () => {

    const { captain, setCaptain } = useContext(UserDataContext);

  return (
    <div>
      User name = {captain.fullName.firstName + " " + captain.fullName.lastName} | 
      email = {captain.email} | 
      password = {captain.password}
    </div>
  )
}

export default CaptainHome

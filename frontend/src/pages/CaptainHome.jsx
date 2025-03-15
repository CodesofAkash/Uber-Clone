import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'

const UserHome = () => {
  
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(()=> {
    if(captain) {
      console.log(captain);
      setIsLoading(false);
    }
  }, [captain])

  if(isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
    <h2>Welcome, {captain.fullName.firstName} {captain.fullName.lastName}!</h2>
    <p>Email: {captain.email}</p>
    <button onClick={() => setCaptain(prev => ({
      ...prev, 
      fullName: { firstName: 'Tony', lastName: 'Stark' }
    }))}>
      Update Name
    </button>
  </div>
  )
}

export default UserHome

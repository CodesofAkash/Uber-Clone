import React, {useState} from 'react'
import { createContext } from 'react';

export const UserDataContext = createContext();

const UserContext = ({children}) => {

    const [user, setUser] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        }
    })

  return (
    <div>
      <UserDataContext.Provider value={user}>
        {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext

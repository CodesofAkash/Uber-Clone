import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('user-token');

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200) {
            localStorage.removeItem('user-token');
        }
        navigate('/login')
    })

  return (
    <div>
      <div>UserLogout</div>
    </div>
  )
}

export default UserLogout

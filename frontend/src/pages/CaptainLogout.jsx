import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('captain-token');

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200) {
            localStorage.removeItem('captain-token');
        }
        navigate('/captain/login')
    })

  return (
    <div>
      <div>CaptainLogout</div>
    </div>
  )
}

export default CaptainLogout

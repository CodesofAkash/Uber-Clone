import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const captainCredentials = {email: email, password: password};    
    
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainCredentials);
    if(res.status === 200) {
      const data = res.data;
      setCaptain(data.captain);
      localStorage.setItem('captain-token', data.token);
      navigate('/captain/home');
    }

    setEmail('');
    setPassword('');
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <Link to='/'>
          <img className='w-20 mb-3 mt-4 ml-4' src="/uber-driver.svg" alt="uber" />
        </Link>
        <form onSubmit={(e) => {
          submitHandler(e);
        }}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>

          <input required
          type="email"
          name="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-2 focus:border-[#d4b60f] focus:border-[3px] w-full text-lg placeholder:text-base outline-none'
          placeholder='email@example.com'/>

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input required
          type="password"
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-2 focus:border-[#d4b60f] focus:border-[3px] w-full text-lg placeholder:text-base outline-none'
          placeholder="password" />

          <button
          className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'
          >LogIn</button>
          <p className='text-center'>Join a fleet? <Link to='/captain/signup' className='text-blue-600 hover:underline'>Register as a Captain</Link>
          </p>
        </form>
      </div>

      <div>
        <Link to='/login'
        className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin

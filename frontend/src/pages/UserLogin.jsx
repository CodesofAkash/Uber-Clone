import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const {user, setUser} = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userCredentials = {email: email, password: password};
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userCredentials);
    if(response.status === 201) {
      const data = response.data;
      setUser(data.user);
      localStorage.setItem('user-token', data.token);
      navigate('/user/home');
    }

    setEmail('');
    setPassword('');
  }
  
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <Link to='/'>
          <img className='w-28 mb-3' src="/uber.png" alt="uber" />
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
          <p className='text-center'>New here? <Link to='/signup' className='text-blue-600 hover:underline'>Create new Account</Link>
          </p>
        </form>
      </div>

      <div>
        <Link to='/captain/login'
        className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin

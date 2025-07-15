import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import toast from 'react-hot-toast'

const UserLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const {setUser} = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const userCredentials = {email: email, password: password};
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userCredentials);
      if(response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('user-token', data.token);
        toast.success('Login successful!');
        navigate('/user/home');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data.message || 'Login failed';
        toast.error(errorMessage);
      } else if (error.request) {
        // Network error
        toast.error('Network error. Please check your connection.');
      } else {
        // Other error
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
      setEmail('');
      setPassword('');
    }
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
          type="submit"
          disabled={isLoading}
          className={`${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#111] hover:bg-gray-800'} text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base transition-colors`}
          >{isLoading ? 'Logging in...' : 'LogIn'}</button>
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

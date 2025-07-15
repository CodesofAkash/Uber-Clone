import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
import toast from 'react-hot-toast'

const UserSignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { setUser } = React.useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newUser = {
        fullName: {
          firstName : firstName,
          lastName: lastName
        },
        email: email,
        password: password
      }
      
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      if(response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('user-token', data.token);
        toast.success('Account created successfully!');
        navigate('/user/home');
      }
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response) {
        // Server responded with error status
        const errorMessage = error.response.data.message || 
                             (error.response.data.errors && error.response.data.errors[0]?.msg) || 
                             'Registration failed';
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
      setFirstName('');
      setLastName('');
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

          <h3 className='text-lg font-medium mb-2'>What's your name</h3>
          <div className='flex items-center justify-around'>
            <input required
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-2 focus:border-[#d4b60f] focus:border-[3px] w-[45%] text-lg placeholder:text-base outline-none'
            placeholder='first name'/>
            <input required
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-2 focus:border-[#d4b60f] focus:border-[3px] w-[45%] text-lg placeholder:text-base outline-none'
            placeholder='last name'/>
          </div>


          <h3 className='text-base font-medium mb-2'>What's your email</h3>
          <div className='flex justify-center items-center'>
            <input required
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-2 focus:border-[#d4b60f] focus:border-[3px] w-[95%] text-lg placeholder:text-base outline-none'
            placeholder='email@example.com'/>
          </div>

          <h3 className='text-base font-medium mb-2'>Enter Password</h3>
          <div className='flex justify-center items-center'>
            <input required
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border-2 focus:border-[#d4b60f] focus:border-[3px] w-[95%] text-lg placeholder:text-base outline-none'
            placeholder="password" />
          </div>

          <button
          type="submit"
          disabled={isLoading}
          className={`${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#111] hover:bg-gray-800'} text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base transition-colors`}
          >{isLoading ? 'Creating account...' : 'Create account'}</button>
        </form>
          <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-600 hover:underline'>Login here</Link></p>
      </div>

      <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='text-blue-800 hover:underline'>Google Privacy Policy</span> and <span className='text-blue-800 hover:underline'>Terms and Services</span> apply.</p>
      </div>
    </div>
  )
}

export default UserSignUp

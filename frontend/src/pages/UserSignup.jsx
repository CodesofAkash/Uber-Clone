import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignUp = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');


  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      fullName: {
        firstName : firstName,
        lastName: lastName
      },
      email: email,
      password: password
    });
    // fetch
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }

  useEffect(() => {
    console.log(userData);
  }, [userData]);
  
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
          className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'
          >Register</button>
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

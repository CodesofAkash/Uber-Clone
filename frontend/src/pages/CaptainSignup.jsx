import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'
import toast from 'react-hot-toast'

const CaptainSignup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [vehicle, setVehicle] = useState({
    color: '', plate: '', capacity: '', type: ''
  })

    const { setCaptain } = useContext(CaptainDataContext);
    const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const captainData = {
        fullName: {
          firstName : firstName,
          lastName: lastName
        },
        email: email,
        password: password,
        vehicle: {
          color: vehicle.color,
          plate: vehicle.plate,
          capacity: vehicle.capacity,
          type: vehicle.type
        }
      };    
      
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
      if(res.status === 201) {
        const data = res.data;
        setCaptain(data.captain);
        localStorage.setItem('captain-token', data.token);
        toast.success('Account created successfully!');
        navigate('/captain/home');
      }
    } catch (error) {
      console.error('Captain registration error:', error);
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
      setVehicle({color: '', plate: '', capacity: '', type :''});
    }
  }
  
  return (
    <div className='px-7 pb-7 h-screen flex flex-col justify-between'>
      <div>
      <Link to='/'>
        <img className='w-20 mb-2 ml-4' src="/uber-driver.svg" alt="uber" />
      </Link>
      <form onSubmit={(e) => {
          submitHandler(e);
        }}>

          <h3 className='text-base font-medium mb-2'>What's your name</h3>
          <div className='flex items-center justify-around'>
            <input required
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e)=>setFirstName(e.target.value)}
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border-2 focus:border-[#d4b60f] focus:border-[3px] w-[45%] text-lg placeholder:text-base outline-none'
            placeholder='first name'/>
            <input required
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e)=>setLastName(e.target.value)}
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border-2 focus:border-[#d4b60f] focus:border-[3px] w-[45%] text-lg placeholder:text-base outline-none'
            placeholder='last name'/>
          </div>

          <h3 className='text-base font-medium mb-2'>What's your email</h3>
          <div className='flex justify-center items-center'>
            <input required
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border-2 focus:border-[#d4b60f] focus:border-[3px] w-[95%] text-lg placeholder:text-base outline-none'
            placeholder='email@example.com'/>
          </div>

          <h3 className='text-base font-medium mb-2'>Enter Password</h3>
          <div className='flex justify-center items-center'>
            <input required
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border-2 focus:border-[#d4b60f] focus:border-[3px] w-[95%] text-lg placeholder:text-base outline-none'
            placeholder="password" />
          </div>

          <h3 className='text-base font-medium mb-2'>What's your vehicle</h3>
          <div className='flex gap-2 w-full justify-around items-center flex-wrap'>
            <input required value={vehicle.color} onChange={(e)=>setVehicle({...vehicle, color: e.target.value})}
            className='bg-[#eeeeee] rounded px-4 mb-3 py-2 border-2 w-[45%] focus:border-[#d4b60f] focus:border-[3px] text-lg placeholder:text-base outline-none'
            type="text" name="color" placeholder='color' />

            <input required value={vehicle.plate} onChange={(e)=>setVehicle({...vehicle, plate: e.target.value})}
            className='bg-[#eeeeee] rounded px-4 mb-3 py-2 border-2 w-[45%] focus:border-[#d4b60f] focus:border-[3px] text-lg placeholder:text-base outline-none'
            type="text" name="plate" placeholder='plate' />

            <input required value={vehicle.capacity} onChange={(e)=>setVehicle({...vehicle, capacity: e.target.value})}
            className='bg-[#eeeeee] rounded px-4 mb-3 py-2 border-2 w-[45%] focus:border-[#d4b60f] focus:border-[3px] text-lg placeholder:text-base outline-none'
            type="number" name="capacity" placeholder='capacity' />

            <select required value={vehicle.type}
            className='bg-[#eeeeee] rounded px-4 mb-3 py-2 border-2 w-[45%] focus:border-[#d4b60f] focus:border-[3px] text-sm'
            name="type" onChange={(e)=>setVehicle({...vehicle, type: e.target.value})}>
              <option value="" disabled>-- Vehicle Type --</option>
              <option value="car">car</option>
              <option value="bike">bike</option>
              <option value="auto">auto</option>
            </select>
          </div>

          <button
          type="submit"
          disabled={isLoading}
          className={`${isLoading ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#111] hover:bg-gray-800'} text-white mt-4 font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base transition-colors`}
          >{isLoading ? 'Registering...' : 'Register'}</button>
          <p className='text-center'>Already have an account? <Link to='/captain/login' className='text-blue-600 hover:underline'>Login here</Link>
          </p>
        </form>
      </div>

      <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='text-blue-800 hover:underline'>Google Privacy Policy</span> and <span className='text-blue-800 hover:underline'>Terms and Services</span> apply.</p>
      </div>
    </div>
  )
}

export default CaptainSignup

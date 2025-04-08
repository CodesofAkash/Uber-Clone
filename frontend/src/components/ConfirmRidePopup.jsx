import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ConfirmRidePopup = (props) => {

  const [otp, setOtp] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  }

  if(props.ride) {
    return (
      <div className='w-full'>
      <h3 className='my-2 font-bold text-center text-xl'>Confirm this ride to Start</h3>
      <div className='flex items-center justify-between my-4 p-3 bg-yellow-400 rounded-lg'>
        <div className='flex items-center gap-3'>
            <img src="/woman.jpg" alt="people" className='size-12 rounded-full object-cover' />
            <h2 className='text-lg font-medium'>{props.ride.user.fullName.firstName + " " + props.ride.user.fullName.lastName}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>
      <div>
        <div className="destination p-2 flex justify-start items-center gap-4 border-b-2 border-gray-300 mb-3">
          <div className='flex justify-center items-center w-5 h-5'>
            <img src="/pin.png" className='w-5 h-5' alt="pin" />
          </div>
            <div className='flex flex-col justify-around items-start'>
              <h4 className='font-medium text-lg'>562/11-A</h4>
              <p className='text-sm text-gray-600'>{props.ride.pickup}</p>
          </div>
        </div>
        <div className="pickup p-2 flex justify-start items-center gap-4 border-b-2 border-gray-300 mb-3">
          <div className='flex justify-center items-center w-5 h-5'>
            <img src="/box.png" className='w-3 h-3' alt="pin" />
          </div>
            <div className='flex flex-col justify-around items-start'>
              <h4 className='font-medium text-lg'>562/11-A</h4>
              <p className='text-sm text-gray-600'>{props.ride.destination}</p>
          </div>
        </div>
        <div className="price p-2 flex justify-start items-center gap-4 border-b-2 border-gray-300 mb-3">
          <div className='flex justify-center items-center w-5 h-5'>
            <img src="/layer.png" className='w-5 h-5' alt="pin" />
          </div>
            <div className='flex flex-col justify-around items-start'>
              <h4 className='font-medium text-lg'>₹ {props.ride.fare}</h4>
              <p className='text-sm text-gray-600'>Total Fare</p>
          </div>
        </div>
        <div className='mt-6'>
          <form onSubmit={(e)=>submitHandler(e)}>
            <input onChange={(e)=>setOtp(e.target.value)} name='otp' value={otp} type="text" placeholder='Enter OTP' className='bg-[#eee] rounded px-6 py-4 font-mono border-2 focus:border-[#d4b60f] focus:border-[3px] w-full text-lg placeholder:text-base outline-none'/>
            <button onClick={()=>{
              props.confirmRide(otp);
            }} className='w-full mt-12 bg-green-600 text-white font-semibold p-2 rounded-xl active:scale-95 transition-transform duration-150 ease-in-out'>Confirm</button>
          </form>
        </div>
        <div>
          <button onClick={()=>{
            props.cancelRide();
          }} className='w-full mt-4 bg-red-600 text-white font-semibold p-2 rounded-xl active:scale-95 transition-transform duration-150 ease-in-out'>Cancel</button>
        </div>

      </div>
    </div>
    )
  }
  return (
    <div>Loading...</div>
  )
}

export default ConfirmRidePopup

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ConfirmRidePopup = (props) => {

  const [otp, setOtp] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Otp : " , otp);
  }

  return (
    <div className='w-full'>
      <h3 className='my-2 font-bold text-center text-xl'>Confirm this ride to Start</h3>
      <div className='flex items-center justify-between my-4 p-3 bg-yellow-400 rounded-lg'>
        <div className='flex items-center gap-3'>
            <img src="/woman.jpg" alt="people" className='size-12 rounded-full object-cover' />
            <h2 className='text-lg font-medium'>Harsh Patel</h2>
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
              <p className='text-sm text-gray-600'>Kankariya Talab, Ahamdabad</p>
          </div>
        </div>
        <div className="pickup p-2 flex justify-start items-center gap-4 border-b-2 border-gray-300 mb-3">
          <div className='flex justify-center items-center w-5 h-5'>
            <img src="/box.png" className='w-3 h-3' alt="pin" />
          </div>
            <div className='flex flex-col justify-around items-start'>
              <h4 className='font-medium text-lg'>562/11-A</h4>
              <p className='text-sm text-gray-600'>Kankariya Talab, Bhopal</p>
          </div>
        </div>
        <div className="price p-2 flex justify-start items-center gap-4 border-b-2 border-gray-300 mb-3">
          <div className='flex justify-center items-center w-5 h-5'>
            <img src="/layer.png" className='w-5 h-5' alt="pin" />
          </div>
            <div className='flex flex-col justify-around items-start'>
              <h4 className='font-medium text-lg'>₹193.20</h4>
              <p className='text-sm text-gray-600'>Cash Cash</p>
          </div>
        </div>
        <div className='my-6'>
          <form onSubmit={(e)=>submitHandler(e)}>
            <input onChange={(e)=>setOtp(e.target.value)} name='otp' value={otp} type="text" placeholder='Enter OTP' className='bg-[#eee] rounded px-6 py-4 font-mono border-2 focus:border-[#d4b60f] focus:border-[3px] w-full text-lg placeholder:text-base outline-none'/>
          </form>
        </div>
        <div>
          <Link to={"/captain/riding"}>
            <button onClick={()=>{
              props.setConfirmRidePopup(false);
            }} className='w-full mt-2 bg-green-600 text-white font-semibold p-2 rounded-xl active:scale-95 transition-transform duration-150 ease-in-out'>Confirm</button>
          </Link>
          <button onClick={()=>{
            props.setConfirmRidePopup(false);
          }} className='w-full mt-5 bg-red-600 text-white font-semibold p-2 rounded-xl active:scale-95 transition-transform duration-150 ease-in-out'>Cancel</button>
        </div>

      </div>
    </div>
  )
}

export default ConfirmRidePopup

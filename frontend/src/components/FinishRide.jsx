import React from 'react'
import { Link } from 'react-router-dom'

const FinishRide = (props) => {
  return (
    <div className='w-full'>
        <div className='w-screen h-fit object-center flex justify-center items-center'>
            <img onClick={()=>props.setFinishedRiding(false)} src="/down.png" alt="down" className='size-8' />
        </div>
      <h3 className='my-2 font-bold text-center text-xl'>Finish this Ride</h3>
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
              <h4 className='font-medium text-lg'>Pickup</h4>
              <p className='text-sm text-gray-600'>{props.ride.pickup}</p>
          </div>
        </div>
        <div className="pickup p-2 flex justify-start items-center gap-4 border-b-2 border-gray-300 mb-3">
          <div className='flex justify-center items-center w-5 h-5'>
            <img src="/box.png" className='w-3 h-3' alt="pin" />
          </div>
            <div className='flex flex-col justify-around items-start'>
              <h4 className='font-medium text-lg'>Destination</h4>
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
        <div>
            <button onClick={props.completeRide} className='w-full mt-2 bg-green-600 text-white font-semibold p-2 rounded-xl active:scale-95 transition-transform duration-150 ease-in-out'>Finish Ride</button>
          <p className='text-sm mt-2'>Click on finish ride button if you have completed ride and received payment</p>
        </div>

      </div>
    </div>
  )
}

export default FinishRide

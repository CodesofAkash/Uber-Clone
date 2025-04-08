import React from 'react'
import { Link } from 'react-router-dom'

const WaitingForDriver = (props) => {
  if(props.ride && props.ride.ride && props.ride.fullName && props.ride.vehicle) {
    return (
      <div className='w-full h-full'>
        <div className='justify-between items-center flex w-full h-fit border-b-2 border-gray-300 pb-4 '>
          <div className='font-semibold text-[20px]'> Meet at the pickup point</div>
          <div onClick={()=>props.setDriverFound(false)} className='px-5 py-3 font-bold bg-black text-white text-lg flex flex-col justify-around items-center'><span>Status</span><span>{props.ride.ride.status}</span></div>
        </div>
        <div>
          <div className='flex justify-between items-center'>
            <Link to={"/riding"}> <img src="/car.png" alt="car" className='w-36' /> </Link>
            <div className='flex flex-col items-end justify-start'>
              <p className='text-sm text-gray-600'>{props.ride.fullName?.firstName + " " + props.ride.fullName?.lastName}</p>
              <p className='font-bold'>{props.ride.vehicle.plate}</p>
              <p className='text-sm text-gray-600'>{props.ride.vehicle.color + " " + props.ride.vehicle.type}</p>
              <div className='flex justify-between items-center gap-2'>
                <img src="/star.png" className='w-5' alt="star" />
                <span className='text-sm text-gray-600'>4.9</span>
              </div>
              <p className='text-sm text-gray-600 font-bold'>Otp : {props.ride.ride.otp}</p>
            </div>
          </div>
          <div>
            <div className="destination p-2 flex justify-start items-center gap-4 border-b-2 border-gray-300 mb-3">
              <div className='flex justify-center items-center w-5 h-5'>
                <img src="/pin.png" className='w-5 h-5' alt="pin" />
              </div>
                <div className='flex flex-col justify-around items-start'>
                  <h4 className='font-medium text-lg'>Pickup</h4>
                  <p className='text-sm text-gray-600'>{props.ride.ride.pickup}</p>
              </div>
            </div>
            <div className="pickup p-2 flex justify-start items-center gap-4 border-b-2 border-gray-300 mb-3">
              <div className='flex justify-center items-center w-5 h-5'>
                <img src="/box.png" className='w-3 h-3' alt="pin" />
              </div>
                <div className='flex flex-col justify-around items-start'>
                  <h4 className='font-medium text-lg'>Destination</h4>
                  <p className='text-sm text-gray-600'>{props.ride.ride.destination}</p>
              </div>
            </div>
            <div className="price p-2 flex justify-start items-center gap-4 border-b-2 border-gray-300 mb-3">
              <div className='flex justify-center items-center w-5 h-5'>
                <img src="/layer.png" className='w-5 h-5' alt="pin" />
              </div>
                <div className='flex flex-col justify-around items-start'>
                  <h4 className='font-medium text-lg'>₹ {props.ride.ride.fare}</h4>
                  <p className='text-sm text-gray-600'>Total Fare</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>Loading...</div>
  )
}

export default WaitingForDriver

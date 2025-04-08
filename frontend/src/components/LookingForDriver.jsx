import React, { useEffect, useState } from 'react'

const LookingForDriver = (props) => {

  const [vehicleImg, setVehicleImg] = useState('/car.png');
  useEffect(() => {
    if(props.vehicle) {
      if(props.vehicle === 'car') {
        setVehicleImg('/car.png');
      } else if(props.vehicle === 'moto') {
        setVehicleImg('/bike.png');
      } else {
        setVehicleImg('/auto.png');
      }
    }
  }, [props.vehicle]);

  if(props.ride && props.ride.pickup) {
    return (
      <div className='w-full h-full'>
        <div className='justify-center items-center flex w-full h-fit'>
            <div className='h-1 w-[13%] bg-gray-300'></div>
        </div>
      <h3 className='mt-2 font-medium text-center text-2xl'>Looking for nearby drivers</h3>
      <div className='flex justify-center items-center h-fit w-full my-2'>
        <div className="w-full h-1 rounded-full bg-gradient-to-r from-white via-blue-700 to-white animate-pulse"></div>
      </div>
      <div className='w-full h-fit items-center justify-center flex'>
        <img className='h-28 w-52' src={vehicleImg} alt="vehicle" />
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
      </div>
    </div>
    )
  }
  return (
    <div>Loading...</div>
  )
}

export default LookingForDriver

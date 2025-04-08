import React, { useEffect, useState } from 'react'

const ConfirmRide = (props) => {

  const [vehicle, setVehicle] = useState({vehicleFare: 0, vehicleImg: '/car.png'});
  useEffect(() => {
    if(props.vehicle && props.fare) {
      if(props.vehicle === 'car') {
        setVehicle({vehicleFare: props.fare.fare.car, vehicleImg: '/car.png'});
      } else if(props.vehicle === 'moto') {
        setVehicle({vehicleFare: props.fare.fare.moto, vehicleImg: '/bike.png'});
      } else {
        setVehicle({vehicleFare: props.fare.fare.auto, vehicleImg: '/auto.png'});
      }
    }
  }, [props.vehicle, props.fare]);

  return (
    <div className='w-full h-full'>
      <div className='p-1 bg-gray-100 w-full flex justify-center items-center'><img onClick={()=>props.setConfirmRide(false)} src="/down.png" className='w-6' alt="down" /></div>
      <h3 className='my-2 font-bold text-center text-xl'>Confirm your Ride</h3>
      <div className='w-full h-fit items-center justify-center flex'>
        <img className='h-28 w-52' src={vehicle.vehicleImg} alt="car" />
      </div>
      <div>
        <div className="destination p-2 flex justify-start items-center gap-4 border-b-2 border-gray-300 mb-3">
          <div className='flex justify-center items-center w-5 h-5'>
            <img src="/pin.png" className='w-5 h-5' alt="pin" />
          </div>
            <div className='flex flex-col justify-around items-start'>
              <h4 className='font-medium text-lg'>Pickup</h4>
              <p className='text-sm text-gray-600'>{props.pickup}</p>
          </div>
        </div>
        <div className="pickup p-2 flex justify-start items-center gap-4 border-b-2 border-gray-300 mb-3">
          <div className='flex justify-center items-center w-5 h-5'>
            <img src="/box.png" className='w-3 h-3' alt="pin" />
          </div>
            <div className='flex flex-col justify-around items-start'>
              <h4 className='font-medium text-lg'>Destination</h4>
              <p className='text-sm text-gray-600'>{props.destination}</p>
          </div>
        </div>
        <div className="price p-2 flex justify-start items-center gap-4 border-b-2 border-gray-300 mb-3">
          <div className='flex justify-center items-center w-5 h-5'>
            <img src="/layer.png" className='w-5 h-5' alt="pin" />
          </div>
            <div className='flex flex-col justify-around items-start'>
              <h4 className='font-medium text-lg'>₹ {vehicle.vehicleFare}</h4>
              <p className='text-sm text-gray-600'>Total Fare</p>
          </div>
        </div>
        <button onClick={async ()=>{
          try {
            const rideCreated = await props.createRide(props.vehicle);
            
            if (rideCreated) {
              props.setVehicleFound(true);
              props.setConfirmRide(false);
            }
          } catch (error) {
            console.error('Failed to create ride:', error);
          }
        }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-xl active:scale-95 transition-transform duration-150 ease-in-out'>Confirm</button>
      </div>
    </div>
  )
}

export default ConfirmRide

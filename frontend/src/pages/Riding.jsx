import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking';

const Riding = () => {

  const { socket } = React.useContext(SocketContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [ride, setRide] = useState(location.state?.ride || null);

  useEffect(() => {
    socket.on('ride-completed', (ride) => {
      navigate('/user/home');
      setRide(ride);
    })
  }, [socket, navigate])

  if(ride && ride.fullName && ride.vehicle && ride.ride) {
  return (
    <div className='h-screen'>
      <div className='h-screen w-screen top-0 absolute z-[-1]'>
        <LiveTracking />
      </div>
        <Link to={'/'}><img className='w-28 absolute top-1 left-1 z-10' src="/uber.png" alt="uber" /></Link>
        <Link to='/user/home' className='bg-white h-fit w-fit p-2 rounded-xl flex justify-center items-center absolute top-5 right-3'>
            <img src="/home.png" alt="home" className='w-7' />
        </Link>
        <div className='p-2 w-full h-[60%] absolute bottom-0 z-10 bg-white'>
      <div>
        <div className='flex justify-between items-center'>
          <img src="/car.png" alt="car" className='w-36' />
          <div className='flex flex-col items-end justify-start'>
            <p className='text-sm text-gray-600'>{ride.fullName.firstName + " " + ride.fullName.lastName}</p>
            <p className='font-bold'>{ride.vehicle.plate}</p>
            <p className='text-sm text-gray-600'>{ride.vehicle.color + " " + ride.vehicle.type}</p>
            <div className='flex justify-between items-center gap-2'>
              <img src="/star.png" className='w-5' alt="star" />
              <span className='text-sm text-gray-600'>4.9</span>
            </div>
          </div>
        </div>
        <div>
          <div className="destination p-2 flex justify-start items-center gap-4 border-b-2 border-gray-300 mb-3">
            <div className='flex justify-center items-center w-5 h-5'>
              <img src="/pin.png" className='w-5 h-5' alt="pin" />
            </div>
              <div className='flex flex-col justify-around items-start'>
                <h4 className='font-medium text-lg'>Pickup</h4>
                <p className='text-sm text-gray-600'>{ride.ride.pickup}</p>
            </div>
          </div>
          <div className="pickup p-2 flex justify-start items-center gap-4 border-b-2 border-gray-300 mb-3">
            <div className='flex justify-center items-center w-5 h-5'>
              <img src="/box.png" className='w-3 h-3' alt="pin" />
            </div>
              <div className='flex flex-col justify-around items-start'>
                <h4 className='font-medium text-lg'>Destination</h4>
                <p className='text-sm text-gray-600'>{ride.ride.destination}</p>
            </div>
          </div>
          <div className="price p-2 flex justify-start items-center gap-4 border-b-2 border-gray-300 mb-3">
            <div className='flex justify-center items-center w-5 h-5'>
              <img src="/layer.png" className='w-5 h-5' alt="pin" />
            </div>
              <div className='flex flex-col justify-around items-start'>
                <h4 className='font-medium text-lg'>₹ {ride.ride.fare}</h4>
                <p className='text-sm text-gray-600'>Total Fare</p>
            </div>
          </div>
          <button className='bg-[#10b461] mt-5 flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Make a Payment</button>
        </div>
      </div>
        </div>
    </div>
  )
}
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <img className='w-28' src="/uber.png" alt="uber" />
      <h1 className='text-2xl font-bold'>No ride found</h1>
    </div>
  )
}

export default Riding

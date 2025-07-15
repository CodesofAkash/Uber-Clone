import React, { useState, useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import LiveTracking from '../components/LiveTracking';

const UserHome = () => {
  
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState('');
  const [fare, setFare] = useState('')
  const [vehicle, setVehicle] = useState('');
  const [ride, setRide] = useState(null);
  
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [driverFound, setDriverFound] = useState(false);
  
  const vehiclePanelRef = useRef(null);
  const locationPanelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const confirmRideRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const driverFoundRef = useRef(null);
  const homeRef = useRef(null);
  const logoutRef = useRef(null);

  const navigate = useNavigate();

  const { socket } = React.useContext(SocketContext);
  const { user } = React.useContext(UserDataContext);


  useEffect(() => {
    socket.emit("join", {userType: "user", userId: user._id });
  }, [user._id, socket]);

  useEffect(() => {
    const handleRideAccepted = (ride) => {
      setRide(ride);
      setDriverFound(true);
      setVehicleFound(false);
    };
  
    const handleRideStarted = (ride) => {
      setRide(ride);
      navigate('/riding', { state: { ride }});
    };
  
    socket.on('ride-accepted', handleRideAccepted);
    socket.on('ride-started', handleRideStarted);
  
    return () => {
      socket.off('ride-accepted', handleRideAccepted);
      socket.off('ride-started', handleRideStarted);
    };
  }, [socket, navigate]);
  

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      if(e.target.value.length >2) {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user-token')}`
          }
        });
        setPickupSuggestions(response.data);
      }
    } catch(error) {
      console.error('Error fetching pickup suggestions:', error);
      toast.error('Failed to fetch pickup suggestions');
    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      if(e.target.value.length >2) {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user-token')}`
          }
        });
        setDestinationSuggestions(response.data);
      }
    } catch(error) {
      console.error('Error fetching destination suggestions:', error);
      toast.error('Failed to fetch destination suggestions');
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
  }

  async function createRide(vehicleType) {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
        pickup,
        destination,
        vehicleType
      }, {
        headers : {
          Authorization: `Bearer ${localStorage.getItem('user-token')}`
        }
      });
      setRide(response.data.ride);
      return response.data.ride;
    } catch (error) {
      console.error('Error creating ride:', error);
      if (error.response) {
        const errorMessage = error.response.data.message || 'Failed to create ride';
        toast.error(errorMessage);
      } else {
        toast.error('Failed to create ride. Please try again.');
      }
      throw error;
    }
  }

  useGSAP(()=>{
    if(panelOpen) {
      gsap.to(locationPanelRef.current, {
        height: '70%',
        display: 'flex',
        ease: 'power1.inOut'
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        ease: 'power1.inOut'
      });
      gsap.to(homeRef.current, {
        display: 'none',
        ease: 'bounce.out',
        duration: 0
      }),
      gsap.to(logoutRef.current, {
        display: 'none',
        ease: 'bounce.out',
        duration: 0
      })
    } else {
      gsap.to(locationPanelRef.current, {
        height: '0%',
        display: 'none',
        ease: 'power1.inOut'
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        ease: 'power1.inOut'
      });
      gsap.to(homeRef.current, {
        display: 'block',
        ease: 'back.in',
        duration: 0
      }),
      gsap.to(logoutRef.current, {
        display: 'block',
        ease: 'back.in',
        duration: 0
      })
    }
  }, [panelOpen]);

  useGSAP(()=>{
    if(vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)',
        display: 'flex',
        ease: 'power1.inOut'
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
        display: 'none',
        ease: 'power1.inOut'
      })
    }
  }, [vehiclePanel])

  useGSAP(()=>{
    if(confirmRide) {
      gsap.to(confirmRideRef.current, {
        transform: 'translateY(0)',
        display: 'flex',
        ease: 'power1.inOut'
      });
    } else {
      gsap.to(confirmRideRef.current, {
        transform: 'translateY(100%)',
        display: 'none',
        ease: 'power1.inOut'
      })
    }
  }, [confirmRide])

  useGSAP(()=>{
    if(vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)',
        display: 'flex',
        ease: 'power1.inOut'
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)',
        display: 'none',
        ease: 'power1.inOut'
      })
    }
  }, [vehicleFound])

  useGSAP(()=>{
    if(driverFound) {
      gsap.to(driverFoundRef.current, {
        transform: 'translateY(0)',
        display: 'flex',
        ease: 'power1.inOut'
      });
    } else {
      gsap.to(driverFoundRef.current, {
        transform: 'translateY(100%)',
        display: 'none',
        ease: 'power1.inOut'
      })
    }
  }, [driverFound])

  return (
    <div className='h-screen relative overflow-hidden'>
      <Link to={'/'}><img ref={homeRef} className='w-28 absolute left-1 top-1 z-10' src="/uber.png" alt="uber" /></Link>
      <Link to='/login' className='bg-white h-fit w-fit p-2 rounded-xl flex justify-center items-center absolute z-10 top-5 right-3'>
        <img ref={logoutRef} className='w-7' src="/logout.png" alt="uber" />
      </Link>

      <div onClick={()=>setVehiclePanel(false)} className='h-screen w-screen'>
        <LiveTracking />
      </div>

      <div className='h-screen w-full flex flex-col justify-end absolute top-0'>
        <div className='relative h-[30%] bg-white p-6'>
          <img ref={panelCloseRef} onClick={()=>setPanelOpen(false)} src="/down.png" className='opacity-0 h-8 w-8 absolute top-1 left-1' alt="down" />
          <h4 className='text-2xl font-semibold mb-5'>Find a trip</h4>
          <form className='flex flex-col gap-4' onSubmit={(e)=>submitHandler(e)}>
            <div className='round absolute h-2 w-2 top-[46%] left-[11.1%] border-[2px] rounded-full'></div>
            <div className='line absolute h-12 w-[1px] border-2 top-[52%] left-11 bg-gray-900 rounded-full'></div>
            <div className='box absolute h-2 w-2 top-[78%] left-[11.2%] border-[2px]'></div>
            <input value={pickup} onChange={(e)=>handlePickupChange(e)} onClick={()=> {setPanelOpen(true);setActiveField('pickup')}} className='bg-[#eee] rounded px-12 py-2 border-2 focus:border-[#d4b60f] focus:border-[3px] w-full text-lg placeholder:text-base outline-none'  type="text" name="pickup" placeholder='Add a pick-up location' />
            <input value={destination} onChange={(e)=>handleDestinationChange(e)} onClick={()=> {setPanelOpen(true);setActiveField('destination')}} className='bg-[#eee] rounded px-12 py-2 border-2 focus:border-[#d4b60f] focus:border-[3px] w-full text-lg placeholder:text-base outline-none'  type="text" name="destination" placeholder='Enter a destination' />
          </form>
        </div>
        <div ref={locationPanelRef} className={`h-[0%] px-5 w-screen bg-white hidden flex-col items-start gap-3`}>
          <LocationSearchPanel suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions} setVehiclePanel={setVehiclePanel} setPanelOpen={setPanelOpen} setPickup={setPickup} pickup={pickup} setDestination={setDestination} destination={destination} activeField={activeField} setFare={setFare} />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='bg-white p-4 h-fit w-screen fixed z-10 bottom-0 translate-y-full hidden flex-col justify-center items-start gap-3'>
        <VehiclePanel setVehiclePanel = {setVehiclePanel} setConfirmRide = {setConfirmRide} fare = {fare}  setVehicle = {setVehicle} />
      </div>

      <div ref={confirmRideRef} className='bg-white p-4 h-fit w-screen fixed z-10 bottom-0 translate-y-full hidden flex-col justify-center items-start gap-3'>
        <ConfirmRide setConfirmRide = {setConfirmRide} setVehicleFound={setVehicleFound} vehicle = {vehicle} pickup = {pickup} destination = {destination} fare = {fare} createRide = {createRide} ride = {ride} />
      </div>

      <div ref={vehicleFoundRef} className='bg-white p-4 h-fit w-screen fixed z-10 bottom-0 translate-y-full hidden flex-col justify-center items-start gap-3'>
        <LookingForDriver setVehicleFound = {setVehicleFound} setDriverFound = {setDriverFound} ride = {ride} vehicle = {vehicle} />
      </div>

      <div ref={driverFoundRef} className='bg-white p-4 h-fit w-screen fixed z-10 bottom-0 translate-y-full hidden flex-col justify-center items-start gap-3'>
        <WaitingForDriver setDriverFound = {setDriverFound} ride = {ride} />
      </div>

    </div>
  )
}

export default UserHome

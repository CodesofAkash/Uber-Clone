import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import RidePopup from '../components/RidePopup'
import ConfirmRidePopup from '../components/ConfirmRidePopup'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'

const CaptainHome = () => {

  const [ridePopup, setRidePopup] = useState(false);
  const [confirmRidePopup, setConfirmRidePopup] = useState(false);
  const [ride, setRide] = useState(null);

  const ridePopupRef = useRef();
  const confirmRidePopupRef = useRef();
  const navigate = useNavigate();

    const { socket } = React.useContext(SocketContext);
    const { captain } = React.useContext(CaptainDataContext);
  
    useEffect(() => {
      socket.emit("join", {userType: "captain", userId: captain._id });

      const updateLocation = () => {
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {

            socket.emit("update-location-captain", {
              userId: captain._id,
              location: {
                ltd: position.coords.latitude,
                lng: position.coords.longitude
              }
            });
          });
        }
      }

      const locationInterval = setInterval(() => {updateLocation()}, 1000);
      updateLocation();

      // return () => clearInterval(locationInterval);
      socket.on('new-ride', (data) => {
        setRide(data);
        setRidePopup(true);
      })

    }, [captain._id, socket]);
    

    async function acceptRide() {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/accept`, {
        rideId: ride._id
      }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('captain-token')}`
        }
      });
      setRide(response.data);
      setConfirmRidePopup(true);
      setRidePopup(false);
      }

    async function ignoreRide() {
        setRidePopup(false);
        setRide(null);
    }

    async function confirmRide(otp) {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
        rideId: ride._id,
        otp
      }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('captain-token')}`
        }
      });
      setRide(response.data);
      navigate('/captain/riding', { state : { ride } });
  }

  async function cancelRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/cancel`, {
      rideId: ride._id
    }, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('captain-token')}`
      }
    });
    setRide(response.data);
    setConfirmRidePopup(false);
  }


  useGSAP(() => {
    if(ridePopup) {
      gsap.to(ridePopupRef.current, {
        transform: 'translateY(0)',
        display: 'flex',
        ease: 'power1.inOut'
      })
    } else {
      gsap.to(ridePopupRef.current, {
        transform: 'translateY(100%)',
        display: 'none',
        ease: 'power1.inOut'
      })
    }
  }, [ridePopup]);

  useGSAP(() => {
    if(confirmRidePopup) {
      gsap.to(confirmRidePopupRef.current, {
        transform: 'translateY(0)',
        display: 'flex',
        ease: 'power1.inOut'
      })
    } else {
      gsap.to(confirmRidePopupRef.current, {
        transform: 'translateY(100%)',
        display: 'none',
        ease: 'power1.inOut'
      })
    }
  }, [confirmRidePopup]);

  return (
    <div className='h-screen w-screen'>
      <div className='h-screen w-screen top-0 absolute z-[-1]'>
        <LiveTracking />
      </div>
        <div>
          <Link to={'/'}><img className='w-20 mb-3 mt-2 ml-4 absolute top-1 left-1' src="/uber-driver.svg" alt="uber" /></Link>
          <Link to='/captain/login' className='bg-white h-fit w-fit p-2 rounded-xl flex justify-center items-center absolute top-5 right-3'>
            <img className='w-5' src="/logout.png" alt="uber" />
          </Link>
        </div>
        <div className='w-full h-2/5 flex flex-col justify-start gap-5 absolute bottom-0'>
          <div className='bg-white p-4 h-fit w-screen flex-col justify-center items-start gap-3 absolute bottom-0'>
            <CaptainDetails setRidePopup={setRidePopup} />
          </div>
          <div ref={ridePopupRef} className='bg-white p-4 h-fit w-screen fixed z-10 bottom-0 translate-y-full hidden flex-col justify-center items-start gap-3'>
            <RidePopup setRidePopup={setRidePopup} ride= {ride} acceptRide={acceptRide} ignoreRide = {ignoreRide} />
          </div>
          <div ref={confirmRidePopupRef} className='bg-white p-4 h-screen w-screen fixed z-10 bottom-0 translate-y-full hidden flex-col justify-start items-start gap-3'>
            <ConfirmRidePopup ride = {ride} cancelRide = {cancelRide} confirmRide = {confirmRide} />
          </div>
        </div>
    </div>
  )
}

export default CaptainHome

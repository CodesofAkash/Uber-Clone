import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import RidePopup from '../components/RidePopup'
import ConfirmRidePopup from '../components/ConfirmRidePopup'

const CaptainHome = () => {

  const [ridePopup, setRidePopup] = useState(false);
  const [confirmRidePopup, setConfirmRidePopup] = useState(false);
  const ridePopupRef = useRef();
  const confirmRidePopupRef = useRef();

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
    <div className='h-screen'>
        <img className='h-3/5 w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        <div>
          <Link to={'/'}><img className='w-20 mb-3 mt-2 ml-4 absolute top-1 left-1' src="/uber-driver.svg" alt="uber" /></Link>
          <Link to='/captain/login' className='bg-white h-fit w-fit p-2 rounded-xl flex justify-center items-center absolute top-5 right-3'>
            <img className='w-5' src="/logout.png" alt="uber" />
          </Link>
        </div>
        <div className='w-full h-2/5 flex flex-col justify-start gap-5'>
          <div className='bg-white p-4 h-fit w-screen flex-col justify-center items-start gap-3'>
            <CaptainDetails setRidePopup={setRidePopup}/>
          </div>
          <div ref={ridePopupRef} className='bg-white p-4 h-fit w-screen fixed z-10 bottom-0 translate-y-full hidden flex-col justify-center items-start gap-3'>
            <RidePopup setRidePopup={setRidePopup} setConfirmRidePopup={setConfirmRidePopup}/>
          </div>
          <div ref={confirmRidePopupRef} className='bg-white p-4 h-screen w-screen fixed z-10 bottom-0 translate-y-full hidden flex-col justify-start items-start gap-3'>
            <ConfirmRidePopup setConfirmRidePopup={setConfirmRidePopup}/>
          </div>
        </div>
    </div>
  )
}

export default CaptainHome

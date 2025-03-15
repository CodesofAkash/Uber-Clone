import React, { useState, useRef} from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmedVehicle from '../components/ConfirmRide'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'

const UserHome = () => {
  
  const [panelOpen, setPanelOpen] = useState(false);
  const [locationData, setLocationData] = useState({pickup: '', destination: ''});
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [driverFound, setDriverFound] = useState(false);
  const locationPanelRef = useRef('');
  const panelCloseRef = useRef('');
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef();
  const vehicleFoundRef = useRef();
  const driverFoundRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(locationData);
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
      <img className='w-28 absolute left-5 top-5' src="/uber.png" alt="uber" />

      <div onClick={()=>setVehiclePanel(false)} className='h-screen w-screen'>
        {/* img for temporary use */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>

      <div className='h-screen w-full flex flex-col justify-end absolute top-0'>
        <div className='relative h-[30%] bg-white p-6'>
          <img ref={panelCloseRef} onClick={()=>setPanelOpen(false)} src="/down.png" className='opacity-0 h-8 w-8 absolute top-1 left-1' alt="down" />
          <h4 className='text-2xl font-semibold mb-5'>Find a trip</h4>
          <form className='flex flex-col gap-4' onSubmit={(e)=>submitHandler(e)}>
            <div className='round absolute h-2 w-2 top-[46%] left-[11.1%] border-[2px] rounded-full'></div>
            <div className='line absolute h-12 w-[1px] border-2 top-[52%] left-11 bg-gray-900 rounded-full'></div>
            <div className='box absolute h-2 w-2 top-[78%] left-[11.2%] border-[2px]'></div>
            <input value={locationData.pickup} onChange={(e)=>setLocationData({...locationData, pickup: e.target.value})} onClick={()=>setPanelOpen(true)} className='bg-[#eee] rounded px-12 py-2 border-2 focus:border-[#d4b60f] focus:border-[3px] w-full text-lg placeholder:text-base outline-none'  type="text" name="destination" placeholder='Add a pick-up location' />
            <input value={locationData.destination} onChange={(e)=>setLocationData({...locationData, destination: e.target.value})} onClick={()=>setPanelOpen(true)} className='bg-[#eee] rounded px-12 py-2 border-2 focus:border-[#d4b60f] focus:border-[3px] w-full text-lg placeholder:text-base outline-none'  type="text" name="destination" placeholder='Enter a destination' />
          </form>
        </div>
        <div ref={locationPanelRef} className={`h-[0%] px-5 w-screen bg-white hidden flex-col items-start gap-3`}>
          <LocationSearchPanel setVehiclePanel={setVehiclePanel} setPanelOpen={setPanelOpen} />
        </div>
      </div>

      <div ref={vehiclePanelRef} className='bg-white p-4 h-fit w-screen fixed z-10 bottom-0 translate-y-full hidden flex-col justify-center items-start gap-3'>
        <VehiclePanel setVehiclePanel = {setVehiclePanel} setConfirmRide = {setConfirmRide} />
      </div>

      <div ref={confirmRideRef} className='bg-white p-4 h-fit w-screen fixed z-10 bottom-0 translate-y-full hidden flex-col justify-center items-start gap-3'>
        <ConfirmRide setConfirmRide = {setConfirmRide} setVehicleFound={setVehicleFound} />
      </div>

      <div ref={vehicleFoundRef} className='bg-white p-4 h-fit w-screen fixed z-10 bottom-0 translate-y-full hidden flex-col justify-center items-start gap-3'>
        <LookingForDriver setVehicleFound = {setVehicleFound} setDriverFound = {setDriverFound} />
      </div>

      <div ref={driverFoundRef} className='bg-white p-4 h-fit w-screen fixed z-10 bottom-0 translate-y-full hidden flex-col justify-center items-start gap-3'>
        <WaitingForDriver setDriverFound = {setDriverFound} />
      </div>

    </div>
  )
}

export default UserHome

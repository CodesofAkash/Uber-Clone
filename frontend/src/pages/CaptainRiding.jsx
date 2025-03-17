import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const CaptainRiding = () => {

    const [finishedRiding, setFinishedRiding] = useState(false);
    const finishedRidingRef = useRef();

    useGSAP(()=> {
        if(finishedRiding) {
            gsap.to(finishedRidingRef.current, {
                transform: 'translateY(0)',
                display: 'flex',
                ease: 'power1.inOut'
            });
        } else {
            gsap.to(finishedRidingRef.current, {
                transform: 'translateY(100%)',
                display: 'none',
                ease: 'power1.inOut'
            });
        }
    }, [finishedRiding]);

  return (
    <div className='w-screen h-screen overflow-hidden'>
      <Link to={'/'}><img className='w-28 absolute left-1 top-1 z-10' src="/uber.png" alt="uber" /></Link>
      <Link to='/captain/home' className='bg-white h-fit w-fit p-2 rounded-xl flex justify-center items-center absolute z-10 top-5 right-3'>
        <img className='w-5' src="/home.png" alt="uber" />
      </Link>

      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='bg-yellow-400 p-4 flex flex-col justify-start fixed bottom-0 w-screen'>
        <div className='w-screen h-fit object-center flex justify-center items-center'>
            <img onClick={()=>setFinishedRiding(true)} src="/up.png" alt="down" className='size-5' />
        </div>
        <div className='flex justify-around items-center mt-5'>
            <h4 className='font-semibold text-xl'>4 KM away</h4>
            <button className='w-[50%] bg-green-600 text-white font-semibold p-3 rounded-lg active:scale-95 transition-transform duration-150 ease-in-out'>Complete Ride</button>
        </div>
        </div>
        <div ref={finishedRidingRef} className='bg-white p-4 h-fit w-screen fixed z-10 bottom-0 translate-y-full hidden flex-col justify-start items-start gap-3'>
            <FinishRide setFinishedRiding={setFinishedRiding} />
        </div>
    </div>
  )
}

export default CaptainRiding

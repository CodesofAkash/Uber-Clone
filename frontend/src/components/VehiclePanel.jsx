import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
      <div className='p-1 bg-gray-100 w-full flex justify-center items-center'><img onClick={()=>props.setVehiclePanel(false)} src="/down.png" className='w-6' alt="down" /></div>
        <div className='flex m-2 items-center justify-between p-2 w-[45%] bg-[#eee] rounded-2xl'>
            <img src="/time.png" className='w-4 h-4' alt="clock" />
            <span>Leave Now</span>
            <img src="/down.png" className='w-4 h-4' alt="down" />
        </div>
        <div onClick={()=> {
            props.setConfirmRide(true);
            props.setVehiclePanel(false);
        }}
        className='h-full w-full flex justify-between items-center p-2 active:border-3 rounded-2xl'>
          <img src="/car.png" className='w-20' alt="car" />
          <div className='pl-2 flex flex-col items-center justify-start'>
            <h4 className='leading-5 w-full font-medium flex items-center justify-start gap-[2px]'>UberGo <span className='flex justify-center items-center text-[12px]'><img src="/user.png" className='w-3' alt="" /> 4</span></h4>
            <span className='text-sm leading-5 w-full font-light'>2 mins away . 15:24</span>
            <span className='text-sm leading-5 w-full font-light'>Affordable, compact rides</span>
          </div>
          <span className='h-15 flex justify-center items-baseline'>
            <span className='font-medium'>Rs. 193.20</span>
          </span>
        </div>
        <div onClick={()=> {
            props.setConfirmRide(true);
            props.setVehiclePanel(false);
        }}
        className='h-full w-full flex justify-between items-center p-2 active:border-3 rounded-2xl'>
          <img src="/bike.webp" className='w-20' alt="car" />
          <div className='pl-2 flex flex-col items-center justify-start'>
            <h4 className='leading-5 w-full font-medium flex items-center justify-start gap-[2px]'>Moto <span className='flex justify-center items-center text-[12px]'><img src="/user.png" className='w-3' alt="" /> 1</span></h4>
            <span className='text-sm leading-5 w-full font-light'>3 mins away . 15:24</span>
            <span className='text-sm leading-5 w-full font-light'>Affordable motorcycle rides</span>
          </div>
          <span className='h-15 flex justify-center items-baseline'>
            <span className='font-medium'>Rs. 65.17</span>
          </span>
        </div>
        <div onClick={()=> {
            props.setConfirmRide(true);
            props.setVehiclePanel(false);
        }}
        className='h-full w-full flex justify-between items-center p-2 active:border-3 rounded-2xl'>
          <img src="/auto.png" className='w-20' alt="car" />
          <div className='pl-2 flex flex-col items-center justify-start'>
            <h4 className='leading-5 w-full font-medium flex items-center justify-start gap-[2px]'>UberAuto <span className='flex justify-center items-center text-[12px]'><img src="/user.png" className='w-3' alt="" /> 3</span></h4>
            <span className='text-sm leading-5 w-full font-light'>2 mins away . 15:24</span>
            <span className='text-sm leading-5 w-full font-light'>Affordable, auto rikshaw rides</span>
          </div>
          <span className='h-15 flex justify-center items-baseline'>
            <span className='font-medium'>Rs. 118.21</span>
          </span>
        </div>
    </div>
  )
}

export default VehiclePanel

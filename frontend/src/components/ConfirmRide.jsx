import React from 'react'

const ConfirmRide = (props) => {
  return (
    <div className='w-full h-full'>
      <div className='p-1 bg-gray-100 w-full flex justify-center items-center'><img onClick={()=>props.setConfirmRide(false)} src="/down.png" className='w-6' alt="down" /></div>
      <h3 className='mt-2 font-bold text-center text-xl'>Confirm your Ride</h3>
      <div className='w-full h-fit items-center justify-center flex'>
        <img className='h-28 w-52' src="/car.png" alt="car" />
      </div>
      <div>
        <div className="destination p-2 flex justify-start items-center gap-4 border-b-2 border-gray-300 mb-3">
          <div className='flex justify-center items-center w-5 h-5'>
            <img src="/pin.png" className='w-5 h-5' alt="pin" />
          </div>
            <div className='flex flex-col justify-around items-start'>
              <h4 className='font-medium text-lg'>562/11-A</h4>
              <p className='text-sm text-gray-600'>Kankariya Talab, Ahamdabad</p>
          </div>
        </div>
        <div className="pickup p-2 flex justify-start items-center gap-4 border-b-2 border-gray-300 mb-3">
          <div className='flex justify-center items-center w-5 h-5'>
            <img src="/box.png" className='w-3 h-3' alt="pin" />
          </div>
            <div className='flex flex-col justify-around items-start'>
              <h4 className='font-medium text-lg'>562/11-A</h4>
              <p className='text-sm text-gray-600'>Kankariya Talab, Bhopal</p>
          </div>
        </div>
        <div className="price p-2 flex justify-start items-center gap-4 border-b-2 border-gray-300 mb-3">
          <div className='flex justify-center items-center w-5 h-5'>
            <img src="/layer.png" className='w-5 h-5' alt="pin" />
          </div>
            <div className='flex flex-col justify-around items-start'>
              <h4 className='font-medium text-lg'>₹193.20</h4>
              <p className='text-sm text-gray-600'>Cash Cash</p>
          </div>
        </div>
        <button onClick={()=>{
          props.setVehicleFound(true);
          props.setConfirmRide(false);
        }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-xl active:scale-95 transition-transform duration-150 ease-in-out'>Confirm</button>
      </div>
    </div>
  )
}

export default ConfirmRide

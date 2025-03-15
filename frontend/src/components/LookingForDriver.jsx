import React from 'react'

const LookingForDriver = (props) => {
  return (
    <div className='w-full h-full'>
        <div className='justify-center items-center flex w-full h-fit'>
            <div onClick={()=> {
              props.setVehicleFound(false);
              props.setDriverFound(true);
            }} className='h-1 w-[13%] bg-gray-300'></div>
        </div>
      <h3 className='mt-2 font-medium text-center text-2xl'>Looking for nearby drivers</h3>
      <div className='flex justify-center items-center h-fit w-full mt-2'>
        <div className="w-full h-1 rounded-full bg-gradient-to-r from-white via-blue-700 to-white animate-pulse"></div>
      </div>
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
      </div>
    </div>
  )
}

export default LookingForDriver

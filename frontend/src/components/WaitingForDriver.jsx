import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div className='w-full h-full'>
      <div className='justify-between items-center flex w-full h-fit border-b-2 border-gray-300 pb-4 '>
        <div className='font-semibold text-[20px]'> Meet at the pickup point</div>
        <div onClick={()=>props.setDriverFound(false)} className='px-5 py-3 font-bold bg-black text-white text-xl flex flex-col justify-around items-center'><span>2</span><span>min</span></div>
      </div>
      <div>
        <div className='flex justify-between items-center'>
          <img src="/car.png" alt="car" className='w-36' />
          <div className='flex flex-col items-end justify-start'>
            <p className='text-sm text-gray-600'>Akash Sharma</p>
            <p className='font-bold'>JK06B7655</p>
            <p className='text-sm text-gray-600'>Honda Activa 6G</p>
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
    </div>
  )
}

export default WaitingForDriver

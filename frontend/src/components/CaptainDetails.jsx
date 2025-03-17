import React from 'react'

const CaptainDetails = (props) => {
  return (
    <div className='w-full'>
        <div className='flex justify-between items-center'>
            <div className='flex justify-start gap-2 items-center'>
                <img onClick={()=>props.setRidePopup(true)} src="/people.jpeg" alt="user" className='size-10 rounded-full object-cover' />
              <div>
                <h4 className='font-medium text-lg'>Harsh Patel</h4>
                <p className='font-light text-sm text-gray-600'>Basic Level</p>
              </div>
            </div>
            <div>
              <h4 className='text-xl font-semibold'>Rs.295.20</h4>
              <p className='text-sm text-gray-600'>Earned</p>
            </div>
        </div>
        <div className='flex justify-around items-center bg-yellow-400 mt-5 p-2 rounded-xl'>
        <div className='text-center flex justify-around flex-col items-center'>
            <i className='ri-timer-2-line text-3xl font-extralight'></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
        <div className='text-center flex justify-around flex-col items-center'>
            <i className='ri-speed-up-line text-3xl font-extralight'></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
        <div className='text-center flex justify-around flex-col items-center'>
            <i className='ri-booklet-line text-3xl font-extralight'></i>
            <h5 className='text-lg font-medium'>10.2</h5>
            <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
        </div>
    </div>
  )
}

export default CaptainDetails

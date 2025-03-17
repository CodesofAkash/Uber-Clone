import React from 'react'
import { Link } from 'react-router-dom'

const Riding = () => {
  return (
    <div className='h-screen'>
        <img className='h-[40%] w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        <Link to={'/'}><img className='w-28 absolute top-1 left-1 z-10' src="/uber.png" alt="uber" /></Link>
        <Link to='/user/home' className='bg-white h-fit w-fit p-2 rounded-xl flex justify-center items-center absolute top-5 right-3'>
            <img src="/home.png" alt="home" className='w-7' />
        </Link>
        <div className='p-2 w-full h-[60%]'>
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
          <button className='bg-[#10b461] mt-5 flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Make a Payment</button>
        </div>
      </div>
        </div>
    </div>
  )
}

export default Riding

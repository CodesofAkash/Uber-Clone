import React from 'react'

const Layout = ({ children }) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-600 flex justify-center relative'>
      {/* Decorative elements */}
      <div className='absolute top-0 left-0 w-full h-full opacity-10'>
        <div className='absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full blur-xl'></div>
        <div className='absolute top-32 right-16 w-16 h-16 bg-white rounded-full blur-lg'></div>
        <div className='absolute bottom-20 left-16 w-24 h-24 bg-yellow-300 rounded-full blur-xl'></div>
        <div className='absolute bottom-40 right-10 w-12 h-12 bg-white rounded-full blur-md'></div>
      </div>
      
      <div className='w-full max-w-sm bg-white shadow-2xl relative z-10 border-l border-r border-gray-200'>
        {children}
      </div>
    </div>
  )
}

export default Layout

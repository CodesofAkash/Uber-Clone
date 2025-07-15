import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Layout from './components/Layout'

import Start from './pages/Start'

import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import UserLogout from './pages/UserLogout'
import UserHome from './pages/UserHome'
import Riding from './pages/Riding'
import UserProtectedWrapper from './pages/UserProtectedWrapper'

import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainLogout from './pages/CaptainLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainRiding from './pages/CaptainRiding'
import CaptainProtectedWrapper from './pages//CaptainProtectedWrapper'

const App = () => {

  return (
    <Layout>
      <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      <Routes>
        <Route path='/' element={<Start />} />

        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/user/logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        } />
        <Route path='/user/home' element={
          <UserProtectedWrapper>
            <UserHome />
          </UserProtectedWrapper>
        } />
        <Route path='/riding' element={
          <UserProtectedWrapper >
            <Riding />
          </UserProtectedWrapper>
        } />

        <Route path='/captain/login' element={<CaptainLogin />} />
        <Route path='/captain/signup' element={<CaptainSignup />} />
        <Route path='/captain/logout' element={
          <CaptainProtectedWrapper>
            <CaptainLogout />
          </CaptainProtectedWrapper>
        } />
        <Route path='/captain/home' element={
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        } />
        <Route path='/captain/riding' element={
          <CaptainProtectedWrapper>
            <CaptainRiding />
          </CaptainProtectedWrapper>
        } />

      </Routes>
    </Layout>
  )
}

export default App

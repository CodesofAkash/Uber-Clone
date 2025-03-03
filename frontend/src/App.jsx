import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'

import Start from './pages/Start'

import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import UserLogout from './pages/UserLogout'
import UserHome from './pages/UserHome'
import UserProtectedWrapper from './pages/UserProtectedWrapper'

import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainLogout from './pages/CaptainLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages//CaptainProtectedWrapper'

const App = () => {

  return (
    <div>
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

      </Routes>
    </div>
  )
}

export default App

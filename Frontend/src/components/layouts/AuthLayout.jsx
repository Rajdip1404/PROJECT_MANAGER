import React from 'react';
import authImg from '../../images/authImg.jpeg'


const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
      <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
        <h2 className='text-lg font-medium text-black'>Project Manager</h2>
        {children}
      </div>
      <div className='hidden md:flex w-[40vw] h-screen items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 bg-cover bg-no-repeatbg-center overflow-hidden'>
        
      </div>
    </div>
  )
}

export default AuthLayout
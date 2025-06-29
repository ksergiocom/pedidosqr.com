import CustomFooter from '@/components/CustomFooter'
import React from 'react'

export default function AuthLayout({ children }) {
  return (
    <div className='flex flex-col h-full w-full justify-center items-center p-7 max-w-lg mx-auto'>
      {children}
      <CustomFooter/>
    </div>
  )
}
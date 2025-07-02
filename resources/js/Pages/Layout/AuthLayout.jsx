import CustomFooter from '@/components/CustomFooter'
import React from 'react'

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-lg mx-auto">
      <div className="flex-1 flex flex-col items-center sm:mt-[25vh] p-7">
        {children}
      </div>
      <CustomFooter className="text-center p-4" />
    </div>
  )
}

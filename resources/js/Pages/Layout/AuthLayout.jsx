import React from 'react'

export default function AuthLayout({ children }) {
  return (
    <main className='flex h-full w-full justify-center items-center'>
      <main>{children}</main>
    </main>
  )
}
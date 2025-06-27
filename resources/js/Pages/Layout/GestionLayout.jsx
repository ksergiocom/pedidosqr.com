import React from 'react'

import { Link } from '@inertiajs/react'
import { Sidebar, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import AppSidebar from '@/components/AppSidebar'

export default function GestionLayout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='p-5'>
        <SidebarTrigger className='mb-5' />
        <main>
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}
import React from 'react'

import { Link, usePage } from '@inertiajs/react'
import { Sidebar, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import AppSidebar from '@/components/AppSidebar'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { CircleCheck } from 'lucide-react'

export default function GestionLayout(props) {
 const { flash } = usePage().props

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className='p-5'>
        <SidebarTrigger className='mb-5' />
        {flash.success && <Alert className='mb-7'>
          <CircleCheck></CircleCheck>
          <AlertTitle>
            {flash.success}
          </AlertTitle>
        </Alert>}
        <main>
          {props.children}
        </main>
      </div>
    </SidebarProvider>
  )
}
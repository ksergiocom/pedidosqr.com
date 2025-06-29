import React from 'react'

import { Link, usePage } from '@inertiajs/react'
import { Sidebar, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import AppSidebar from '@/components/AppSidebar'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { CircleCheck } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import AutoBreadcrumb from '@/components/AutoBreadcrumb'
import CustomFooter from '@/components/CustomFooter'

export default function GestionLayout(props) {
  const { flash } = usePage().props;

  return (
    <SidebarProvider className="min-h-screen flex">
      <AppSidebar />
      <div className="flex flex-col flex-1 p-12 py-5">
        {/* Header con Breadcrumb y Trigger */}
        <div className="flex space-x-4 items-center h-6">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          <AutoBreadcrumb />
        </div>

        <Separator className="my-8" />

        {/* Alert (opcional) */}
        {/* {flash.success && (
          <Alert className="mb-7">
            <CircleCheck />
            <AlertTitle>{flash.success}</AlertTitle>
          </Alert>
        )} */}

        {/* Main content */}
        <main className="flex-1 pb-8">
          {props.children}
        </main>

        {/* Footer al final */}
        <CustomFooter/>

      </div>
    </SidebarProvider>
  );
}

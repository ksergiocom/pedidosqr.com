import React, {useEffect} from 'react'

import { Link, usePage } from '@inertiajs/react'
import { Sidebar, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import AppSidebar from '@/components/AppSidebar'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { CircleCheck } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import AutoBreadcrumb from '@/components/AutoBreadcrumb'
import CustomFooter from '@/components/CustomFooter'
import { Toaster } from "@/components/ui/sonner"
import { toast } from 'sonner'

export default function GestionLayout(props) {
  const { flash } = usePage().props;

  // Toast que vienen de los mensajes de ->with() de Laravel (success, error, warning, info)
  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }
    if (flash?.error) {
      toast.error(flash.error);
    }
    if (flash?.warning) {
      toast.warning(flash.warning);
    }
    if (flash?.info) {
      toast(flash.info);
    }
  }, [flash]);

  return (
    <SidebarProvider className=" flex">
      <AppSidebar />
      <div className="min-h-screen flex flex-col flex-1 p-5 sm:px-10 py-5">
        {/* Header con Breadcrumb y Trigger */}
        <div className="flex space-x-4 items-center h-6">
          <SidebarTrigger />
          <Separator orientation="vertical" />
          <AutoBreadcrumb />
        </div>

        <Separator className="my-5" />

         <Toaster />
        

        {/* Main content */}
        <main className="flex-1">
          {props.children}
        </main>

        {/* Footer al final */}
        <CustomFooter className="text-center sm:text-left"/>

      </div>
    </SidebarProvider>
  );
}

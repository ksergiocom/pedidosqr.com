import CustomFooter from '@/components/CustomFooter'
import React, { useEffect } from 'react'
import { Toaster } from "@/components/ui/sonner"
import { toast } from 'sonner'
import { usePage } from '@inertiajs/react'

export default function AuthLayout({ children }) {

  const { flash } = usePage().props;

  // Toast que vienen de los mensajes de ->with() de Laravel (success, error, warning, info)
  useEffect(() => {

    console.log({ flash })

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
      toast.info(flash.info);
    }
  }, [flash]);

  return (
    <div className="flex flex-col min-h-screen w-full max-w-lg mx-auto">
      <div className="flex-1 flex flex-col items-center sm:mt-[25vh] p-7">
      <nav class="text-left w-full mb-3">
        <h3><a class="underline underline-offset-3 text-gray-400 hover:text-gray-900 text-lg" href="/">pedidosqr.com</a></h3>
      </nav>
        {children}
      </div>
      <CustomFooter className="text-center p-4" />
      <Toaster />

    </div>
  )
}

import CustomFooter from '@/components/CustomFooter'
import React, { useEffect } from 'react'
import { Toaster } from "@/components/ui/sonner"
import { toast } from 'sonner'
import { usePage } from '@inertiajs/react'
import logo from '../../../imgs/logo.svg'

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
        <nav className="text-left w-full mb-3">
          <a href="/" className="flex items-center gap-2 p-2">
            <img src={logo} alt="Logo PedidosQR" className="w-6 h-6" />
            <h3 className="text-xl">pedidosqr.com</h3>
          </a>
        </nav>
        {children}
      </div>
      <CustomFooter className="text-center p-4" />
      <Toaster />

    </div>
  )
}

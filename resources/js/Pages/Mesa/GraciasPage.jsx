import React from "react";
import { Link } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatearFechaHora, minutosTranscurridos, calcularTotalPedido } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Title from "@/components/Title";
import CardPedido from "@/components/CardPedido";

export default function GraciasPage({ mesa, pedido }) {
  return (
    <main className="p-7 flex flex-col justify-center text-center items-center min-h-screen 3xl:min-w-3xl">
      <div className="3xl:max-w-2xl flex flex-col">
        <Title className="text-pretty">¡Gracias por realizar tu pedido!</Title>

        <CardPedido pedido={pedido} mesa={mesa} />

        <p className="mt-2 mb-6 text-xs text-muted-foreground ">
          ¿Quieres cambiar algo?<br></br> Puedes{" "}
          <Link className="cursor-pointer hover:text-gray-900 underline underline-offset-4" href={`/${mesa.id}/${pedido.id}/editar`}>
            editar
          </Link>{" "}
          o{" "}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="cursor-pointer hover:text-gray-900 underline underline-offset-4">
                cancelar
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Confirmar cancelación?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cancelar un pedido puede suponer un inconveniente para el negocio, ya que
                  puede causar retrasos y molestias. Por favor, confirma que deseas cancelar
                  tu pedido.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Volver</AlertDialogCancel>
                <AlertDialogAction
                  asChild
                  variant='destructive'
                  className='bg-red-600 hover:bg-red-700'
                >
                  {/* Usamos Link con method delete para enviar la petición */}
                  <Link
                    method="delete"
                    href={`/${mesa.id}/${pedido.id}`}

                  >
                    Confirmar
                  </Link>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>{" "}
          tu pedido.
        </p>
      </div>
    </main>
  );
}

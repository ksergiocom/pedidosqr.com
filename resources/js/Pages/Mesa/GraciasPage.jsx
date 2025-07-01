import React from "react";
import { Link } from "@inertiajs/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatearFechaHora, minutosTranscurridos } from "@/lib/formatear-fecha";
import { calcularTotalPedido } from "@/lib/calcular-pedido";
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

export default function GraciasPage({ mesa, pedido }) {
  return (
    <main className="p-7 flex flex-col justify-center text-center items-center h-full 3xl:min-w-3xl">
      <div className="3xl:max-w-2xl flex flex-col">
        <h1 className="text-3xl font-semibold">¡Gracias por realizar tu pedido!</h1>

        {/* Aviso con links justo debajo del h1 */}
        <p className="xl:mt-2">Tu pedido se ha registrado y pronto vendrán a atenderte</p>

        <Card key={pedido.id} className="my-8 p-2 text-left">
          <CardContent>
            <div className="flex justify-between items-center w-full mb-2 mt-5 text-xs xl:text-base">
              <span>
                {mesa.nombre}
                <Badge
                  className="ml-5 text-xs"
                  variant={minutosTranscurridos(pedido.updated_at) > 5 ? "destructive" : "secondary"}
                >
                  {formatearFechaHora(pedido.updated_at)}h
                </Badge>
              </span>
              <span>{pedido.detalles.length} artículo(s)</span>
            </div>

            <Separator className="mt-4" />

            <div className="flex flex-col gap-3 p-2 mb-5 mt-8">
              {pedido.detalles.map((detalle, idx) => (
                <div
                  key={detalle.id}
                  className={`flex justify-between items-center pb-2 ${
                    idx !== pedido.detalles.length - 1 ? "border-b" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {detalle.articulo.image_url ? (
                      <img
                        src={detalle.articulo.image_url}
                        alt={detalle.articulo.nombre}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-muted text-xs flex items-center justify-center rounded text-muted-foreground">
                        Sin imagen
                      </div>
                    )}
                    <div className="font-medium">
                      {detalle.cantidad} x {detalle.articulo.nombre}
                    </div>
                  </div>

                  <div className="text-right">
                    <div>
                      {detalle.cantidad} × {detalle.articulo.precio}€
                    </div>
                    <div className="font-semibold">
                      {(detalle.cantidad * detalle.articulo.precio).toFixed(2)}€
                    </div>
                  </div>
                </div>
              ))}

              <Separator className="mt-8 mb-2" />
              <div className="flex justify-between flex-1">
                <p className="text-2xl ml-auto font-bold text-right">
                  Total: {calcularTotalPedido(pedido.detalles).toFixed(2)}€
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <p className="mt-2 mb-6 text-sm text-muted-foreground ">
          ¿Quieres cambiar algo? Puedes{" "}
          <Link className="font-bold hover:underline" href={`/${mesa.id}/${pedido.id}/editar`}>
            editar
          </Link>{" "}
          o{" "}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="cursor-pointer font-bold hover:underline">
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

import React from "react";

import GestionLayout from "@/Pages/Layout/GestionLayout";
import { calcularTotalPedido } from "@/lib/calcular-pedido";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatearFechaHora } from "@/lib/formatear-fecha";
import { minutosTranscurridos } from "@/lib/formatear-fecha";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Eye, Trash } from "lucide-react";
import { Link } from "@inertiajs/react";
import Title from "@/components/Title";
import TitleDescription from "@/components/TitleDescription";

const ShowPage = ({ pedido }) => {
  return (
    <div className="flex flex-col">
      <Title>Detalle de pedido</Title>
      <TitleDescription className="mt-5 mb-8">Información adicional de los pedidos. Desde aquí puedes eliminar permanentemente el pedido. No se tendrá en cuenta en las estadísticas</TitleDescription>
      <Card key={pedido.id} className="p-2 text-left">
        <CardContent>
          <div className="flex justify-between items-center w-full mb-2 mt-5 text-xs sm:text-base">
            <span>
              {pedido.mesa.nombre}
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

            <div className="mt-2 md:mt-5 flex flex-col-reverse sm:flex-row gap-5 sm:justify-between w-full">
              
              {/* BLOQUE DE ACCIONES */}
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="flex-1 sm:flex-none"
                  onClick={() => confirmTerminar(pedido.id)}
                >
                  Terminar pedido
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label="Abrir menú de acciones"
                    >
                      <EllipsisVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => confirmDelete(pedido.id)}
                      className="text-destructive"
                    >
                      <Trash className="w-4 h-4 mr-2 text-destructive" />
                      Eliminar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* BLOQUE DE TOTAL */}
              <div className="flex items-center justify-end w-full sm:w-auto">
                <p className="text-2xl font-bold text-center sm:text-right w-full sm:w-auto">
                  Total: {calcularTotalPedido(pedido.detalles).toFixed(2)}€
                </p>
              </div>

            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

ShowPage.layout = (page) => (
  <GestionLayout children={page} title="Gestión de pedidos" />
);

export default ShowPage;

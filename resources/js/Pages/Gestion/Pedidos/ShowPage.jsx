import React from "react";

import GestionLayout from "@/Pages/Layout/GestionLayout";
import {calcularTotalPedido} from "@/lib/calcular-pedido";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatearFechaHora } from "@/lib/formatear-fecha";
import { minutosTranscurridos } from "@/lib/formatear-fecha";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Eye, Trash } from "lucide-react";
import { Link } from "@inertiajs/react";

const ShowPage = ({ pedido }) => {
  return <div className="flex flex-col">
        <h1 className="mt-5 text-4xl font-semibold">Detalle de pedido</h1>
        <Card key={pedido.id} className="my-8 p-2 text-left">
          <CardContent>
            <div className="flex justify-between items-center w-full mb-2 mt-5 text-xs xl:text-base">
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
                      <div className="mt-2 md:mt-8 flex flex-col-reverse gap-5 md:flex-row justify-between flex-1">

                        <div className="flex">
                          <div className="inline-flex rounded-md shadow-sm">
                            <Button
                              variant="outline"
                              className="rounded-l-md rounded-r-none"
                              onClick={() => {
                                // Acción de terminar pedido
                                confirmTerminar(pedido.id);
                              }}
                            >
                              Terminar pedido
                            </Button>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="rounded-r-md rounded-l-none border-l-0"
                                  aria-label="Abrir menú de acciones"
                                >
                                  <EllipsisVertical className="w-5 h-5" />
                                </Button>
                              </DropdownMenuTrigger>

                              <DropdownMenuContent align="end">

                                {/* Más items aquí */}
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



                        </div>
                        <div>
                          <p className="text-2xl font-bold">Total: {calcularTotalPedido(pedido.detalles).toFixed(2)}€</p>
                        </div>
                      </div>
            </div>
          </CardContent>
        </Card>
  </div>
}


ShowPage.layout = (page) => (
  <GestionLayout children={page} title="Gestión de pedidos" />
);

export default ShowPage;

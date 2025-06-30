import React, { useState } from "react";
import { useEcho } from "@laravel/echo-react";
import GestionLayout from "@/Pages/Layout/GestionLayout";
import ConfirmDialog from "@/components/ConfirmDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ban, Check, Cross, Edit, EllipsisVertical, Eye, Trash } from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { calcularTotalPedido } from "@/lib/calcular-pedido";
import { formatearFechaHora, minutosTranscurridos } from "@/lib/formatear-fecha";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function IndexPage({ pedidos: initialPedidos }) {
  // El user hay que sacarlo explicitamente
  const { auth } = usePage().props;

  // Estado local de pedidos, inicializado con los pasados por Inertia
  const [pedidos, setPedidos] = useState(initialPedidos);

  // Estado para confirm dialog de borrado
  const [showConfirmDelete, setshowConfirmDelete] = useState(false);
  const [showConfirmTerminar, setshowConfirmTerminar] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToTerminar, setIdToTerminar] = useState(null);

  // Confirmación de borrado
  const confirmDelete = (id) => {
    setIdToDelete(id);
    setshowConfirmDelete(true);
  };

  const confirmTerminar = (id) => {
    setIdToTerminar(id);
    setshowConfirmTerminar(true);
  };

  const handleDelete = () => {
    if (idToDelete) {
      router.visit(`/gestion/pedidos/${idToDelete}`, { method: "delete" });
    }
  };

  const handleTerminar = () => {
    if (idToTerminar) {
      router.visit(`/gestion/pedidos/${idToTerminar}/completar`, { method: "put" });
    }
  };

  useEcho(
    `user.${auth.user.id}`,
    ".PedidoCreated",
    (data) => {
      const nuevoPedido = data.model;

      setPedidos((prev) => [nuevoPedido, ...prev]);
    }
  );

  return (
    <div className="flex flex-col max-w-3xl">
      <h1 className="text-4xl font-semibold">Listado de pedidos</h1>
      <p className="mt-2 mb-8 text-sm">
        Aquí puedes ver todos los <strong>pedidos realizados</strong> por tus
        clientes, organizados por mesa. Despliega cada uno para ver sus
        detalles. ¡Se actualizan en tiempo real!
      </p>

      {pedidos.length === 0 ? (
        <p className="text-muted-foreground">No hay pedidos registrados.</p>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {pedidos.map((pedido) => (
            <Card key={pedido.id} className="w-3xl my-5 p-2">
              <CardContent>
                <AccordionItem value={pedido.id}>
                  <AccordionTrigger>
                    <div className="flex justify-between w-full pr-4">
                      <span>
                        {pedido.mesa?.nombre}
                        {/* <span className="text-gray-500 text-xs ml-5 font-normal">{formatearFechaHora(pedido.updated_at)}h</span> */}
                        <Badge className='ml-5 text-xs' variant={minutosTranscurridos(pedido.updated_at) > 5 ? "destructive" : "secondary"}>{formatearFechaHora(pedido.updated_at)}h</Badge>
                      </span>
                      <span>
                        {pedido.detalles.length} artículo(s)
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-3 p-2 mb-5 mt-5">
                      {pedido.detalles.map((detalle, idx) => (
                        <div
                          key={detalle.id}
                          className={`flex justify-between items-center pb-2 ${idx !== pedido.detalles.length - 1 ? 'border-b' : ''
                            }`}
                        >
                          {/* Imagen */}
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
                            <div className="font-medium">{detalle.cantidad} x {detalle.articulo.nombre}</div>
                          </div>

                          {/* Precio */}
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

                      <p className="text-muted-foreground text-xs mt-5">*Marcar el pedido como terminado lo oculta en el panel de gestión. Puedes volver a marcarlo como pendiente en el historial de pedidos. Eliminar el pedido lo destruye permanentemente y no se registrarán los datos para análisis.</p>
                      <Separator className='mt-2' />


                      {/* Botón para eliminar */}
                      <div className="mt-8 flex justify-between flex-1">

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
                                <DropdownMenuItem asChild>
                                  <Link href={`/gestion/pedidos/${pedido.id}`}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Ver detalles
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>

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
                  </AccordionContent>
                </AccordionItem>
              </CardContent>
            </Card>
          ))}
        </Accordion>
      )}

      {/* Diálogo de confirmación */}
      <ConfirmDialog
        title="¿Estás seguro?"
        description="Esta acción eliminará el pedido seleccionado. Esta operación no se puede deshacer."
        open={showConfirmDelete}
        onCancel={() => setshowConfirmDelete(false)}
        onConfirm={() => {
          setshowConfirmDelete(false);
          handleDelete();
        }}
      />
      <ConfirmDialog
        title="¿Estás seguro?"
        description="Esta acción marca como terminado el pedido seleccionado."
        open={showConfirmTerminar}
        onCancel={() => setshowConfirmTerminar(false)}
        onConfirm={() => {
          setshowConfirmTerminar(false);
          handleTerminar();
        }}
      />
    </div>
  );
}

IndexPage.layout = (page) => (
  <GestionLayout children={page} title="Gestión de pedidos" />
);

export default IndexPage;

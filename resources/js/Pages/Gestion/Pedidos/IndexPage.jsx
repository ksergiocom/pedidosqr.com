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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { calcularTotalPedido } from "@/lib/calcular-pedido";
import { formatearFechaHora, minutosTranscurridos } from "@/lib/formatear-fecha";

import { Badge } from "@/components/ui/badge";

function IndexPage({ pedidos: initialPedidos }) {
  // El user hay que sacarlo explicitamente
  const { auth } = usePage().props;

  // Estado local de pedidos, inicializado con los pasados por Inertia
  const [pedidos, setPedidos] = useState(initialPedidos);

  // Estado para confirm dialog de borrado
  const [showConfirm, setShowConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  // Confirmación de borrado
  const confirmDelete = (id) => {
    setIdToDelete(id);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    if (idToDelete) {
      router.visit(`/gestion/pedidos/${idToDelete}`, { method: "delete" });
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
      <p className="mt-2 mb-8">
        Aquí puedes ver todos los <strong>pedidos realizados</strong> por tus
        clientes, organizados por mesa. Despliega cada uno para ver sus
        detalles.
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
                    <div className="flex flex-col gap-3 p-2 mb-5">
                      {pedido.detalles.map((detalle) => (
                        <div
                          key={detalle.id}
                          className="flex justify-between items-center border-b pb-2"
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

                      {/* Botón para eliminar */}
                      <div className="mt-8 flex justify-between flex-1">

                        <div className="flex gap-5">
                          <Button variant='outline'>Terminar pedido</Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon">
                                <EllipsisVertical className="w-5 h-5" />
                                {/* <span>Acciones</span> */}
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/gestion/pedidos/${pedido.id}`}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Ver
                                </Link>
                              </DropdownMenuItem>
                              {pedido.estado == 'pendiente' && <DropdownMenuItem asChild>
                                <Link href={`/gestion/pedidos/${pedido.id}/completar`}>
                                  <Check className="w-4 h-4 mr-2" />
                                  Completar
                                </Link>
                              </DropdownMenuItem>}
                              {pedido.estado == 'completado' && <DropdownMenuItem asChild>
                                <Link href={`/gestion/pedidos/${pedido.id}/pendiente`}>
                                  <Ban className="w-4 h-4 mr-2" />
                                  Pendiente
                                </Link>
                              </DropdownMenuItem>}
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
        open={showConfirm}
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          handleDelete();
        }}
      />
    </div>
  );
}

IndexPage.layout = (page) => (
  <GestionLayout children={page} title="Gestión de pedidos" />
);

export default IndexPage;

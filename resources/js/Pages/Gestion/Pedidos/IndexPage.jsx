import React, { useState, useMemo } from "react";
import { useEcho } from "@laravel/echo-react";
import GestionLayout from "@/Pages/Layout/GestionLayout";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ConfirmDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ban, Check, Cross, Edit, EllipsisVertical, Eye, ImageOff, Radio, RadioTower, Signal, Trash } from "lucide-react";
import { Link, router, usePage } from "@inertiajs/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import { calcularTotalPedido, formatearFechaHora, minutosTranscurridos } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Title from "@/components/Title";
import TitleDescription from "@/components/TitleDescription";

function IndexPage({ pedidos: initialPedidos }) {
  // El user hay que sacarlo explicitamente
  const { auth } = usePage().props;

  const [erroresDeImagen, setErroresDeImagen] = useState({});

  // Estado local de pedidos, inicializado con los pasados por Inertia
  const [pedidos, setPedidos] = useState(initialPedidos);

  // Estado para confirm dialog de borrado
  const [showConfirmDelete, setshowConfirmDelete] = useState(false);
  const [showConfirmTerminar, setshowConfirmTerminar] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToTerminar, setIdToTerminar] = useState(null);
  

  // ----- Confirmaciones -----------------------------------------------------

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

  // ----- Sockets ------------------------------------------------------------

  useEcho(
    `user.${auth.user.id}`,
    ".PedidoCreated",
    (data) => {
      const nuevoPedido = data.model;

      setPedidos((prev) => [nuevoPedido, ...prev]);
      console.log('Created')

      toast.success("¡Nuevo pedido creado!");  // <-- Aquí el toast
    }
  );

  // Para los otros eventos que quieras escuchar, ejemplo PedidoActualizado:

  useEcho(
    `user.${auth.user.id}`,
    ".PedidoUpdated",
    (data) => {
      const pedidoActualizado = data.model;

      setPedidos((prev) =>
        prev.map((p) => (p.id === pedidoActualizado.id ? pedidoActualizado : p))
      );
      console.log('Updated')

      toast.warning(`¡Pedido actualizado!`);
    }
  );

  // Para PedidoCancelado:

  useEcho(
    `user.${auth.user.id}`,
    ".PedidoDeleted",
    (data) => {
      const { pedidoId } = data;

      setPedidos((prev) => prev.filter((p) => p.id !== pedidoId));
      console.log('Deleted')

      toast.error(`¡Pedido eliminado!`);
    }
  );

  // ----- Render -------------------------------------------------------------

  return (
    <div className="flex flex-col max-w-3xl">
      <Title className='flex gap-3 items-center'><RadioTower className="animate-pulse"/> Listado de pedidos </Title>
      <TitleDescription className="mt-2 sm:mt-5 mb-3">
        Marcar el pedido como terminado lo oculta en el panel de gestión. Puedes volver a marcarlo como pendiente en el historial de pedidos. Eliminar el pedido lo destruye permanentemente y no se registrarán los datos para análisis
      </TitleDescription>

      {pedidos.length === 0 ? (
        <p className="text-lg opacity-30 tracking-tighter mt-5">No hay pedidos registrados</p>

      ) : (
        <Accordion type="single" collapsible className="w-full">
          {pedidos.map((pedido) => {
            // Memo para total de objetos
            const totalObjetos = pedido.detalles.reduce((acc, detalle) => acc + detalle.cantidad, 0);

            return (
              <Card key={pedido.id} className="my-5 p-0 sm:p-2">
                <CardContent>
                  <AccordionItem value={pedido.id}>
                    <AccordionTrigger>
                      <div className="flex gap-5 flex-row text-xs sm:text-base justify-between w-full">
                        <span>
                          {pedido.codigo?.nombre}
                          <Badge
                            className="ml-5 text-xs"
                            variant={minutosTranscurridos(pedido.updated_at) > 5 ? "destructive" : "secondary"}
                          >
                            {formatearFechaHora(pedido.updated_at)}h
                          </Badge>
                        </span>
                        <span className="font-semibold hidden sm:inline">
                          {totalObjetos} <span className="font-normal text-xs sm:text-sm"> artículo(s)</span>
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-0">
                      <Separator className="mt-4" />

                      <div className="flex flex-col gap-3 p-2 mb-5 mt-7">
                        {pedido.detalles.map((detalle, idx) => (
                          <div
                            key={detalle.id}
                            className={`flex justify-between items-center pb-2 ${idx !== pedido.detalles.length - 1 ? "border-b" : ""
                              }`}
                          >
                            <div className="flex items-center gap-3">
                              {detalle.articulo.image_url && !erroresDeImagen[detalle.articulo.id] ? (
  <img
    src={detalle.articulo.image_url}
    alt={detalle.articulo.nombre}
    className="w-12 h-12 object-cover rounded"
    onError={() =>
      setErroresDeImagen((prev) => ({
        ...prev,
        [detalle.articulo.id]: true,
      }))
    }
  />
) : (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
    <ImageOff className="w-12 h-12 text-white opacity-80" />
  </div>
)}
                              <div className="text-xs sm:text-base font-medium">
                                {detalle.cantidad} x {detalle.articulo.nombre}
                              </div>
                            </div>

                            <div className="text-right text-xs sm:text-base">
                              <div>
                                {detalle.cantidad} × {detalle.articulo.precio}€
                              </div>
                              <div className="font-semibold">
                                {(detalle.cantidad * detalle.articulo.precio).toFixed(2)}€
                              </div>
                            </div>
                          </div>
                        ))}

                      </div>

                      {/* Aquí abajo pones los botones y dropdowns */}
                      <div
                        className="
                    mt-2 md:mt-5 mb-5
                    flex flex-col-reverse sm:flex-row
                    gap-5 sm:justify-between
                    w-full
                  "
                      >
                        <div className="flex-1 sm:flex-none flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1 sm:flex-none"
                            onClick={() => confirmTerminar(pedido.id)}
                          >
                            Terminar pedido
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="icon" aria-label="Abrir menú de acciones">
                                <EllipsisVertical className="w-5 h-5" />
                              </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                              <DropdownMenuItem  disabled asChild>
                                <Link href={`/gestion/pedidos/${pedido.id}`}>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Ver detalles
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
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

                        <div className="flex-1 sm:flex-none flex items-center justify-end">
                          <p className="text-2xl font-bold text-center sm:text-right w-full sm:w-auto">
                            Total: {calcularTotalPedido(pedido.detalles).toFixed(2)}€
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </CardContent>
              </Card>
            );
          })}

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

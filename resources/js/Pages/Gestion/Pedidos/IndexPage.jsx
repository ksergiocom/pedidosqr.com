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
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { router, usePage } from "@inertiajs/react";

// --- Auxiliares -----------------------------------------

function formatearFecha(fechaISO) {
  const date = new Date(fechaISO);

  const horas = String(date.getHours()).padStart(2, '0');
  const minutos = String(date.getMinutes()).padStart(2, '0');
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0'); // enero = 0
  const año = String(date.getFullYear()).slice(-2); // últimos 2 dígitos

  // Solo hora
  return `${horas}:${minutos} `;
  // return `${horas}:${minutos} ${dia}-${mes}-${año}`;
}

function calcularTotalPedido(detalles) {
  return detalles.reduce(
    (acc, detalle) => acc + detalle.cantidad * detalle.articulo.precio,
    0
  );
}

// ----- Componente ---------------------------------------

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
    <div className="flex flex-col">
      <h1 className="text-4xl font-semibold">Listado de pedidos</h1>
      <p className="mt-2">
        Aquí puedes ver todos los <strong>pedidos realizados</strong> por tus
        clientes, organizados por mesa. Despliega cada uno para ver sus
        detalles.
      </p>

      <section className="w-3xl mt-8">
        {pedidos.length === 0 ? (
          <p className="text-muted-foreground">No hay pedidos registrados.</p>
        ) : (
          <Accordion type="single" collapsible className="w-full">
            {pedidos.map((pedido) => (
              <AccordionItem key={pedido.id} value={pedido.id}>
                <AccordionTrigger>
                  <div className="flex justify-between w-full pr-4">
                    <span>
                      {pedido.mesa?.nombre} <span className="text-gray-500 text-xs ml-5 font-normal">{formatearFecha(pedido.updated_at)}h</span>
                    </span>
                    <span>{pedido.detalles.length} artículo(s)</span>
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
                    <div className="mt-4 flex justify-between">
                      <div>
                        <p className="text-2xl font-bold">Total pedido: {calcularTotalPedido(pedido.detalles).toFixed(2)}€</p>
                      </div>
                      <Button
                        onClick={() => confirmDelete(pedido.id)}
                        variant="destructive"
                        size="sm"
                      >
                        <Trash className="w-4 h-4 mr-2" />
                        Eliminar pedido
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </section>

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

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
    <div className="flex flex-col gap-7">
      <h1>Listado de pedidos</h1>
      <p>
        Aquí puedes ver todos los <strong>pedidos realizados</strong> por tus
        clientes, organizados por mesa. Despliega cada uno para ver sus
        detalles.
      </p>

      <section className="w-3xl">
      {pedidos.length === 0 ? (
        <p className="text-muted-foreground">No hay pedidos registrados.</p>
      ) : (
        <Accordion type="single" collapsible className="w-full">
          {pedidos.map((pedido) => (
            <AccordionItem key={pedido.id} value={pedido.id}>
              <AccordionTrigger>
                <div className="flex justify-between w-full pr-4">
                  <span>
                    Pedido {pedido.id.slice(24, 32)} — {pedido.mesa?.nombre}
                  </span>
                  <span>{pedido.detalles.length} artículo(s)</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-3 p-2">
                  {pedido.detalles.map((detalle) => (
                    <div
                      key={detalle.id}
                      className="flex justify-between border-b pb-2"
                    >
                      <div>
                        <div className="font-medium">
                          {detalle.articulo.nombre}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {detalle.articulo.descripcion || "Sin descripción"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div>
                          {detalle.cantidad} × {detalle.articulo.precio}€
                        </div>
                        <div className="font-semibold">
                          {(
                            detalle.cantidad * detalle.articulo.precio
                          ).toFixed(2)}
                          €
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Botón para eliminar */}
                  <div className="mt-4 flex justify-end">
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

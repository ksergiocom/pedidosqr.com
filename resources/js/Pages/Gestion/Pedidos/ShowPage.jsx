import React from "react";

import GestionLayout from "@/Pages/Layout/GestionLayout";
import {calcularTotalPedido} from "@/lib/calcular-pedido";
import {formatearFechaCompleto} from "@/lib/formatear-fecha";

const ShowPage = ({ pedido }) => {
  return <div className="w-3xl flex flex-col">
    <h1 className="text-4xl mt-5 font-semibold">Detalle pedido</h1>
    <h2 className=" text-xl">{pedido.id}</h2>
    <p className="mt-2">Detalles del pedido realizado lorem ipsum etc etc etc</p>
    <p>Estado: {pedido.estado}</p>
    <p>Mesa: {pedido.mesa.nombre}</p>
    <p>Fecha: {formatearFechaCompleto(pedido.updated_at)}</p>
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
            <div className="font-medium">
              {detalle.cantidad} x {detalle.articulo.nombre}
            </div>
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
    </div>
      <p className="text-2xl font-bold mt-8">Total pedido: {calcularTotalPedido(pedido.detalles).toFixed(2)}€</p>
  </div>
}


ShowPage.layout = (page) => (
  <GestionLayout children={page} title="Gestión de pedidos" />
);

export default ShowPage;

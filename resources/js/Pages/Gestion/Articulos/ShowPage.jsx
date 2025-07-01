import React from "react";

import GestionLayout from "@/Pages/Layout/GestionLayout";

const ShowPage = (props) => {
    return <div className="flex flex-col w-xl">
        <h1 className="text-4xl font-semibold">Detalles del artículo</h1>
        <p className="mt-2">Pendiente de implementar, pero aquí iría una especie de historial. Alguna gŕafica divertida para ver cuanto se ha venidod respecto a otros productos, etc.</p>
        <h2 className="text-3xl font-semibold">{props.articulo.nombre}</h2>
        <p className="text-lg">Precio: {props.articulo.precio}€</p>
        <ul>
            <li>Pendiente agregar Botones options a la derecha arriba</li>
            <li>Estadisticas de vendidos por mes+año</li>
            <li>Estadisticas de vendidos en cada QR</li>
        </ul>
        {/* <h2 className="text-3xl font-semibold">Listado ultimos pedidos</h2>
        <ul>
            {props.ultimosPedidos.map(pedido => (
                <li>{pedido.id}</li>
            ))}
        </ul> */}
    </div>
}

ShowPage.layout = page => <GestionLayout children={page} title="Welcome" />;

export default ShowPage;
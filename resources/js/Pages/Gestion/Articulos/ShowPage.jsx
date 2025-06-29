import React from "react";

import GestionLayout from "@/Pages/Layout/GestionLayout";

const ShowPage = (props) => {
    return <div className="flex flex-col w-xl">
        <h1 className="text-4xl font-semibold">Detalles del artículo</h1>
        <p className="mt-2">Pendiente de implementar, pero aquí iría una especie de historial. Alguna gŕafica divertida para ver cuanto se ha venidod respecto a otros productos, etc.</p>
    </div>
}

ShowPage.layout = page => <GestionLayout children={page} title="Welcome" />;

export default ShowPage;
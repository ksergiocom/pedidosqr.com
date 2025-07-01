import React from "react";
import GestionLayout from "../Layout/GestionLayout";

const AnalsisPage = () => {
    return <div className="flex flex-col">
            <h1 className="text-4xl font-semibold">Pagina de análisis "pendiente"</h1>
            <p>De algún lado tendré que sacar el dinero.</p>
        </div>
};

AnalsisPage.layout = (page) => (
    <GestionLayout title="Análisis">{page}</GestionLayout>
);

export default AnalsisPage;

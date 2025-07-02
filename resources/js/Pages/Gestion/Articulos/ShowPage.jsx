import React from "react";

import GestionLayout from "@/Pages/Layout/GestionLayout";
import Title from "@/components/Title";
import TitleDescription from "@/components/TitleDescription";

const ShowPage = (props) => {
    return <div className="flex flex-col max-w-xl">
        <Title>{props.articulo.nombre} ¡PENDIENTE!</Title>
        <TitleDescription className='mt-2'>Aquí irán estadisticas de ventas por mesa/año y distribución de por que QR se han vendido más.</TitleDescription>
        <TitleDescription className='mt-2'>¡PENDIENTE! Está pendiente crear un seeder con datos para mostrar las estadísticas.</TitleDescription>
    </div>
}

ShowPage.layout = page => <GestionLayout children={page} title="Welcome" />;

export default ShowPage;
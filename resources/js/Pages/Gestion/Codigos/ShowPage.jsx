import React from "react";

import GestionLayout from "../../Layout/GestionLayout";
import { QRCodeSVG } from "qrcode.react";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import Title from "@/components/Title";
import TitleDescription from "@/components/TitleDescription";

const QrPage = (props) => {

    const baseUrl = usePage().props.appUrl

    return <div className="flex flex-col max-w-3xl">
        <Title>Detalle de codigo ¡PENDIENTE!</Title>
        <TitleDescription className="mt-2">Aquí puedes ver el historial de tu codigo y ver su código QR. Si lo deseas puedes verlo en versión para imprimir dando click aquí.</TitleDescription>
        <QRCodeSVG size={256} className="mt-8" value={`${baseUrl}/${props.codigo.id}`}></QRCodeSVG>
        <p className="mt-8">Está pendiente implementar un historial de los pedidos de cada codigo.</p>
        <h2 className="text-3xl font-semibold">Listado ultimos pedidos</h2>
        <ul>
            {props.ultimosPedidos.map(pedido => (
                <li>
                    <Link className="text-blue-500 hover:text-blue-600 hover:underline" href={`/gestion/pedidos/${pedido.id}`}>{pedido.id}</Link> - {pedido.total}€
                </li>
            ))}
        </ul>
    </div>
}

QrPage.layout = page => <GestionLayout children={page} title="Welcome" />

export default QrPage
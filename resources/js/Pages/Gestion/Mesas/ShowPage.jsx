import React from "react";

import GestionLayout from "../../Layout/GestionLayout";
import { QRCodeSVG } from "qrcode.react";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";

const baseUrl = import.meta.env.VITE_APP_URL;

const QrPage = (props) => {
    return <div className="flex flex-col max-w-3xl">
        <h1 className="text-4xl font-semibold">Detalle de mesa</h1>
        <p className="mt-2">Aquí puedes ver el historial de tu mesa y ver su código QR. Si lo deseas puedes verlo en versión para imprimir dando click aquí.</p>
        <QRCodeSVG size={256} className="mt-8" value={`${baseUrl}/${props.mesa.id}`}></QRCodeSVG>
        <p className="mt-8">Está pendiente implementar un historial de los pedidos de cada mesa.</p>
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
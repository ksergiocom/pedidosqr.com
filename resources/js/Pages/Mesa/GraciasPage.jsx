import React from "react";

import { Link } from "@inertiajs/react";

export default function GraciasPage({mesa, pedido}){
    return <main className="grid justify-center text-center items-center h-full">
        <div className="w-md flex flex-col gap-5">
            <h1>¡Gracias por realizar tu pedido!</h1>
            <p>Tu pedido se ha registrado y pronto vendrán a atenderte. Sí deseas editar algo de tu pedido haz click <Link className="font-bold hover:underline" href={`/${mesa.id}/${pedido.id}/editar`}>aquí</Link></p>
            <p>Me he equivocado quiero <Link method="delete" className="font-bold hover:underline" href={`/${mesa.id}/${pedido.id}`}>cancelarlo</Link></p>
        </div>
    </main>
}
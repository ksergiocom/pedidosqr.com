import React from "react";

import GestionLayout from "../Layout/GestionLayout";

function PedidosPage(props){
    
    return <>
        <h1>Pagina de pedidos</h1>
        <p>{JSON.stringify(props)}</p>
    </>
}

PedidosPage.layout = page => <GestionLayout children={page} title="Welcome" />


export default PedidosPage
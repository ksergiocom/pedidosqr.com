import React from "react";

import GestionLayout from "../Layout/GestionLayout";

function PedidosPage(props){
    
    return <>
        <h1>Pagina de pedidos</h1>
        <pre>{JSON.stringify(props)}</pre>
    </>
}

PedidosPage.layout = page => <GestionLayout children={page} title="Welcome" />


export default PedidosPage
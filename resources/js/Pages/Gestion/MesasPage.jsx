import React from "react";

import GestionLayout from "../Layout/GestionLayout";


function MesasPage(){
    return (
        <h1>Mesas de pedidos</h1>
    )
}

MesasPage.layout = page => <GestionLayout children={page} title="Welcome" />


export default MesasPage;
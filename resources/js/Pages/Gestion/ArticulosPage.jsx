import React from "react";

import GestionLayout from "../Layout/GestionLayout";

function ArticulosPage(){
    return (
        <h1>Articulos de pedidos</h1>
    )
}

ArticulosPage.layout = page => <GestionLayout children={page} title="Welcome" />


export default ArticulosPage;
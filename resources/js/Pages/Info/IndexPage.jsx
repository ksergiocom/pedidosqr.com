import React from 'react'

import GestionLayout from '../Layout/GestionLayout';

const IndexPage = () => {
    return (
        <h1>Pagina de info de gestión</h1>
    )
}


IndexPage.layout = page => <GestionLayout children={page} title="Welcome" />;

export default IndexPage;

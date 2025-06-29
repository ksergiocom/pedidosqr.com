import React from 'react'

import GestionLayout from '../Layout/GestionLayout';

const AboutPage = () => {
    return (
        <h1>Pagina COntacto</h1>
    )
}


AboutPage.layout = page => <GestionLayout children={page} title="Welcome" />;

export default AboutPage;

import React from "react"
import { Link } from '@inertiajs/react'


export default function LoginPage(){
    return <>
        <h1>Login Page</h1>
        <p>Pagina de auth login</p>
        <Link href="/auth/registrar">Ir a Registrar</Link>
    </>
}
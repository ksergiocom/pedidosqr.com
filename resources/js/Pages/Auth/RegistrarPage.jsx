import React from "react"
import { Link } from '@inertiajs/react'

export default function LoginPage(){
    return <>
        <h1>Registrar Page</h1>
        <p>Pagina de auth registro</p>
        <Link href="/auth/login">Ir a login</Link>
    </>
}
import React from 'react'

import { Link } from '@inertiajs/react'

export default function GestionLayout({ children }) {
  return (
    <main>
      <header>
        <Link href="/gestion/pedidos">Pedidos</Link>
        <Link href="/gestion/articulos">Articulos</Link>
        <Link href="/gestion/mesas">Mesas</Link>
        <Link href="/auth/logout" method='post'>Cerrar sesión</Link>
      </header>
      <main>{children}</main>
    </main>
  )
}
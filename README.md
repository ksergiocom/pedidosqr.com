## Laravel + React + WebSockets

Proyecto SaaS para mandar pedidos por web sockets

<table>
  <tr>
    <td><img src="preview1.png" width="100%"/></td>
    <td><img src="preview2.png" width="100%"/></td>
  </tr>
</table>

## En curso

-> Deploy, estoy cansado jefe

-> Detalle mesa salen los utimos 5 pedidos de esa mesa y estadisticas
-> Detalle de pedido salen las estadisticas
-> Agregar mas de una foto a un articulo
-> Comprimir fotos subidas y resize

- Estilizar
    -> Crear pagina perfil de usuario
    -> Crear página facturación
    -> Mesas
        -> Acordeon
            -> Ver pedidos en curso de cada mesa
            -> Poder eliminarlos desde aquí también
            -> Modificar botones para estar abajo como los otros
            -> Si clico en mesa me lleva a su descripcion donde tengo la opcion de imprimir QR y ver pedidos más comodcamente


    -> Crear animación en la página de espera del usuario en la mesa
    -> Transiciones entre vistas
    -> En detalles de cada cosa agregar los 3 botones de opcoines para eliminar o editar
    -> Ampliar detalle mesa y detalle articulos y detalle pedido (primero agregar estado a pedido)
## Todo

-> AGregar Filtrados y Ordenaciones
-> Terminar de Hacer estilos
-> Borrado de foto no se hace!
- Ajustar tiempo de espera para alerta en rojo en PERFIL
- Seguridad; solo el pedido en mesa puede cancelaro o editarlo. <- Manejar con tokens en cada petición!
- Reestructurar carpetas y archivos
- Logger
- ON CASCADE en detalles etc
- Login social
- Gates y Policies para modelos
- Agregar Zippy para enlazar rutas backend con forntend
- Head ReactInertia titles y demás!
- Crear landing page, about, etc a parte. El dashboard funciona con inetia (separar las dos partes en el código)
- Pasarela de pago
- LOcalstorage para el cliente de mesa
- Crear estilo consistente
- Agergar estados al pedido
- Agregar historial
- Crear landing page
- En el historial de pedidos se debe de poder deshacer un pedido completado a estado pendiente
- El badge de pedidos del tiempo se actualiza de color al entrar nuevos?
- En el perfil de usuroi activar/desactivar toast de nuevo pedido entrante (preferencias)
- FUncoinan los eventos cuando se actualizan o se borran?
- Link de recuperacion email
- Mails de avisos
- Agregar errores 404 y 401 y otros
- Renombrar todo <--
- Estructurar carpetas mejor <--
- Componentes para uniformidad <--
- Agregar estado de pedido actualizado! que se vea reflejado en Gesiton/pedidos quizas Eventos y avisos y ordenar por el actualizado ultimo!
- Cambiar de menus <-- 
- Cambiar URLS uids por los nombres unicos de cada mesa / articulo
- Servidor de mail PRopio y mandar correos!

## ¿Que necesito?

1. php artisan serve <- Servir app
2. php artisan rever:start <- Servidor WebSockets
3. php artisan queue:work  <- Despachar los eventos con un worker (se puede cambiar a sync para dev)
4. php artisan storage:link <- Para servir las imagenes subidas
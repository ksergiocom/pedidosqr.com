## Laravel + React + WebSockets

Proyecto para mandar comandas por web sockets

![preview](preview.png)

## En curso
- Agregar sooner

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

## ¿Que necesito?

1. php artisan serve <- Servir app
2. php artisan rever:start <- Servidor WebSockets
3. php artisan queue:work  <- Despachar los eventos con un worker (se puede cambiar a sync para dev)
4. php artisan storage:link <- Para servir las imagenes subidas
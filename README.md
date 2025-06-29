# Laravel + React + WebSockets

Proyecto para mandar comandas por web sockets

## En curso
- Cerrar sesión sidebar
- Agergar estados al pedido
- En el lado de las mesas debe salir finalizado pedido en curso y dar la opcion de volver atrás para editarlo.

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
- Subir imagenes y mostrar imagenes

## ¿Que necesito?

1. php artisan serve <- Servir app
2. php artisan rever:start <- Servidor WebSockets
3. php artisan queue:work  <- Despachar los eventos con un worker (se puede cambiar a sync para dev)
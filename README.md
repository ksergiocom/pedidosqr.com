# Laravel + React + WebSockets

Proyecto para mandar comandas por web sockets

## En curso
- InertiaJS
- shadcn

## Todo

- Proteger rutas
- Logger
- ON CASCADE en detalles etc
- Login social
- Gates y Policies para modelos
- Agregar Zippy para enlazar rutas backend con forntend
- Head ReactInertia titles y demás!
- Crear landing page, about, etc a parte. El dashboard funciona con inetia (separar las dos partes en el código)

## ¿Que necesito?

1. php artisan serve <- Servir app
2. php artisan rever:start <- Servidor WebSockets
3. php artisan queue:work  <- Despachar los eventos con un worker (se puede cambiar a sync para dev)
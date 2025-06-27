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

## ¿Que necesito?

1. php artisan serve <- Servir app
2. php artisan rever:start <- Servidor WebSockets
3. php artisan queue:work  <- Despachar los eventos con un worker (se puede cambiar a sync para dev)
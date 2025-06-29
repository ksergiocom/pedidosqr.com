# Para Juan y Victor

Si me tocais el código sin permiso (sin explicarme que coño haceis) os reviento la puta cara.

No me chatgpteis todo sin cabeza por favor.

-------


>## Laravel + React + WebSockets

Proyecto para mandar comandas por web sockets

## En curso
- Estilizar
    -> Crear un header para gestion para poder navegar a la landing page y display del nombre
    -> Crear pagina perfil de usuario
    -> Crear página facturación
    -> Mesas
        -> Acordeon
            -> Ver pedidos en curso de cada mesa
            -> Poder eliminarlos desde aquí también
            -> Modificar botones para estar abajo como los otros
            -> Si clico en mesa me lleva a su descripcion donde tengo la opcion de imprimir QR y ver pedidos más comodcamente
    
    -> Arituclos
        -> Foto derecha / Placeholder sin foto
        -> Descripcion y botones separados atotalmente (botones al final del todo derecha)
        -> Sin descrpcion debe ser un texto en el centro muted
        -> Create y Edit Page separator y estilizar bonito

    -> Pedidos
        -> Agregar foto y respetar proporciones de Mesas y Articulos

    -> Auth formularios deben estar los mensajes con opacidad 0 para no hacer layout shift

    -> Crear animación en la página de espera del usuario en la mesa
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
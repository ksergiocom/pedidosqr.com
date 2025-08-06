# Laravel + React + WebSockets

Proyecto SaaS para mandar pedidos por WebSockets.

<table>
  <tr>
    <td><img src="preview1.png" width="100%" alt="Vista previa 1"/></td>
    <td><img src="preview2.png" width="100%" alt="Vista previa 2"/></td>
  </tr>
</table>

---

## ¿Cómo desplegar sin herramientas? *(a pelo)*

### Requisitos básicos

Laravel requiere algunas extensiones y versiones mínimas de PHP:

- PHP >= 8.2
- Ctype PHP Extension
- cURL PHP Extension
- DOM PHP Extension
- Fileinfo PHP Extension
- Filter PHP Extension
- Hash PHP Extension
- Mbstring PHP Extension
- OpenSSL PHP Extension
- PCRE PHP Extension
- PDO PHP Extension
- Session PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension

Además, se necesita un driver de base de datos:  
`SQLite`, `MySQL` o `PostgreSQL`, según tu entorno de producción.

Para mejorar la gestión del event loop y despacho de eventos, instala:  
```bash
pecl install uv
```

Revisa la documentación de [Laravel Reverb](https://laravel-reverb.com) para aumentar la cantidad de conexiones permitidas en Nginx.

---

### Ajustes con variables de entorno

Configura tus variables de entorno adecuadamente. Ejemplo para usar puerto 443 con Reverb y desactivar debug:

```env
APP_DEBUG=false
APP_URL=https://midominio.com

REVERB_APP_ID=tu_app_id
REVERB_APP_KEY=tu_app_key
REVERB_APP_SECRET=tu_app_secret
REVERB_HOST=midominio.com
REVERB_PORT=443
REVERB_SCHEME=https
```

---

### Instalaciones y configuraciones básicas

Ejecuta estos comandos para preparar el proyecto y levantar los servicios:

```bash
composer install
npm run build
php artisan optimize
php artisan rever:start
php artisan queue:work
php artisan storage:link
```

---

### Configuración de systemd para servicios Reverb y queue worker

Crea los siguientes archivos para asegurar que los servicios corran siempre:

#### `/etc/systemd/system/reverb.service`

```ini
[Unit]
Description=Laravel Reverb WebSocket Server
After=network.target

[Service]
User=www-data
WorkingDirectory=/ruta/al/proyecto/
ExecStart=/usr/bin/php /ruta/al/proyecto//artisan rever:start
Restart=always
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

#### `/etc/systemd/system/queue-worker.service`

```ini
[Unit]
Description=Laravel Queue Worker
After=network.target

[Service]
User=www-data
WorkingDirectory=/ruta/al/proyecto/
ExecStart=/usr/bin/php /ruta/al/proyecto//artisan queue:work --sleep=3 --tries=3
Restart=always
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

Luego habilita y levanta los servicios:

```bash
sudo systemctl daemon-reload
sudo systemctl enable reverb.service
sudo systemctl start reverb.service

sudo systemctl enable queue-worker.service
sudo systemctl start queue-worker.service
```

---

### Configuración de Nginx

Aquí tienes un ejemplo básico para servir Laravel y proxy para WebSockets en Reverb:

```nginx
server {
    server_name midominio.com;

    root /ruta/al/proyecto//public;

    index index.php index.html index.htm;

    # Servir archivos estáticos directamente desde public
    location /build/ {
        try_files $uri $uri/ =404;
    }

    location / {
        # Para Laravel (PHP)
        try_files $uri $uri/ /index.php?$query_string;
    }

    # Proxy para WebSockets u otras apps que corran en 127.0.0.1:8080
    location /app {
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_pass http://127.0.0.1:8080/app;
        proxy_read_timeout 86400;
        proxy_send_timeout 86400;
    }

    # PHP-FPM
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
        fastcgi_hide_header X-Powered-By;
    }

    listen 80;
}
```

---

## Estado actual y tareas pendientes

### En proceso

- Agregar Correo dominio
- Agregar Ads
- Limitar las descripciones y el total de fotos que puede subir un usuario.
- Solo se puede editar en el codigo por la misma persona (guardar en localhsot y un token)
- Accordions, quitar los outlined o rings, no s que es
- Al hacer edit del pedido desde el movil me esta dando un error 403. Cuidado!
- Animaciones entrada y salida de pedidos (y otros recursos)
- View Transition entr distintas paginas
- Crear seeders con tamaño
 
### Fix errores tontos

1. `confirmDelete is not defined` (Detalle pedido botón eliminar)  
2. Quitar `console.log` en eventos
3. Falta favicon

### En desarrollo

- Capar el máximo de imagenes que se pueden subir/mesas crear/ Qr crear
- Detalle mesa: mostrar últimos 5 pedidos y estadísticas  
- Detalle pedido: mostrar estadísticas  
- Añadir varias fotos a un artículo  
- Comprimir y redimensionar fotos subidas  
- Crear página perfil de usuario  
- Crear página facturación  
- Mejorar gestión y visualización de mesas y pedidos  
- Animación en página de espera usuario mesa  
- Mejorar transiciones entre vistas  
- Botones para eliminar/editar en detalles  
- Filtrados y ordenaciones  
- Ajustar tiempo espera para alertas en perfil  
- Seguridad: solo pedido en mesa puede modificar o cancelar (tokens en peticiones)  
- Reestructurar carpetas y archivos  
- Ocultar CON que se ha hecho
- Logger y gestión de errores 404, 401, etc.  
- Login social  
- Uso de Gates y Policies para modelos  
- Añadir Zippy para rutas backend/frontend  
- Pasarela de pago  
- LocalStorage para cliente de mesa  
- Crear estilos consistentes  
- Estados a pedidos y notificaciones en tiempo real  
- Mejorar URLs y renombrar recursos  
- Servidor de correo propio y notificaciones por mail  
- Docker para despliegue
- Crear unos seeders con imagenes y muchos pedidos historial para ver estadisticas.
- Extraer componente CardPedido para reutilizar
- No permitir subida de archivos raros en fotos.
- No permitir subir igamenes demasiado pesadas
- Corregir textos erratas y dejarlo formal.


---

## ¿Qué necesito para desarrollar y correr?

1. Servir la app Laravel:  
   ```bash
   php artisan serve
   ```
2. Levantar servidor WebSockets (Reverb):  
   ```bash
   php artisan rever:start
   ```
3. Levantar worker para la cola de eventos:  
   ```bash
   php artisan queue:work
   ```
4. Crear enlace simbólico para servir imágenes:  
   ```bash
   php artisan storage:link
   ```

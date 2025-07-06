<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Restablecer contraseña</title>
</head>
<body style="font-family: sans-serif; background-color: #f8fafc; padding: 2rem; color: #111;">
    <h1>¡Hola!</h1>

    <p>Recibimos tu solicitud para restablecer la contraseña.</p>

    <p>
        <a href="{{ $url }}" style="display: inline-block; padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px;">
            Restablecer contraseña
        </a>
    </p>

    <p>Si no solicitaste esto, puedes ignorar este correo.</p>

    <p>Gracias,<br>El equipo de {{ config('app.name') }}</p>
</body>
</html>

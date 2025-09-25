<!DOCTYPE html>
<html lang="es" class="scroll-smooth">

<head>
    <meta charset="UTF-8">
    <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}">
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>pedidosqr.com</title>
    @vite('resources/css/style.css')
</head>

<body class="scroll-smooth p-5 max-w-sm mx-auto">
    <header class="">
        <h3 class="text-xl flex gap-2 tracking-tighter font-semibold items-center"><img class="h-6"
                src="{{ asset('/favicon.svg') }}">Pedidos QR
        </h3>
    </header>
    <main class="">
        @yield('main')
    </main>
</body>

</html>
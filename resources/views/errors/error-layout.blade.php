<!DOCTYPE html>
<html lang="es" class="h-full w-full">

<head>
  <meta charset="UTF-8">
  <link rel="icon" type="image/svg+xml" href="{{ asset('favicon.svg') }}">
  <link rel="icon" type="image/x-icon" href="{{ asset('favicon.ico') }}">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>pedidosqr.com</title>
  @vite('resources/css/style.css')
</head>

<body class="flex h-full w-full items-center justify-center p-5">
  <!-- <header class="">
        <a href="/"><h3 class="text-xl flex gap-2 tracking-tighter font-semibold items-center"><img class="h-6"
                src="{{ asset('/favicon.svg') }}">Pedidos QR
        </h3></a>
    </header>
     -->
  <div class="text-center">
    <a href="/">
      <h3 class="text-xl flex gap-2 tracking-tighter items-center justify-center mb-10"><img class="h-6"
          src="{{ asset('/favicon.svg') }}">Pedidos QR
      </h3>
    </a>
    <h1 class="text-7xl font-extrabold">
      @yield('code', '500')
    </h1>
    <p class="text-4xl tracking-wide my-7">
      @yield('error-message', '¡Algo ha salido mal!')
    </p>
    <a href="{{ route('home') }}" class="underline">&larr; volver</a>
  </div>
</body>

</html>
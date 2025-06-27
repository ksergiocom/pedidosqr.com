<!DOCTYPE html>
<html lang="en" class="h-full bg-white">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite('resources/css/app.css')
    @stack('styles')
    <title>LaravelSocketQR</title>
</head>

<body class="h-full">
    @auth
        <header class="p-5 flex justify-between border-b border-gray-200 text-md tracking-tight">
            <nav class="flex gap-7 ">
                <a class="{{ request()->is('gestion/pedidos') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900' }}"
                    href="{{ route('gestion.pedidos.index') }}">Pedidos</a>
                <a class="{{ request()->is('gestion/articulos') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900' }}"
                    href="{{ route('gestion.articulos.index') }}">Artículos</a>
                <a class="{{ request()->is('gestion/mesas') ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900' }}"
                    href="{{ route('gestion.mesas.index') }}">Mesas</a>
            </nav>
            <form method="POST" action="{{ route('auth.logout') }}">
                @csrf
                <input class="font-semibold cursor-pointer text-gray-500 hover:text-gray-900" type="submit" value="Cerrar sesión" />
            </form>
        </header>

    @endauth
    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif
    <main class="h-full">
        @yield('main')
    </main>

    <script>
        window.userId = "{{ auth()->check() ? auth()->id() : 'null' }}";
    </script>
    @vite('resources/js/app.js')
    @stack('scripts')
</body>

</html>
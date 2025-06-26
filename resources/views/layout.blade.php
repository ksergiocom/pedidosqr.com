<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LaravelSocketQR</title>
</head>
<body>
    <header>
        <h3>MiApp</h3>
        <nav>
            <ul>
                <li><a href="{{ route('home') }}">Inicio</a></li>
                @guest
                    <li><a href="{{ route('auth.login') }}">Login</a></li>
                    <li><a href="{{ route('auth.registrar') }}">Registrar</a></li>
                @endguest
                @auth
                    <li><a href="{{ route('gestion.mesas.index') }}">Mesas</a></li>
                    <li><a href="{{ route('gestion.articulos.index') }}">Artículos</a></li>
                    <li><a href="{{ route('gestion.pedidos.index') }}">Pedidos</a></li>
                    <form method="POST" action="{{ route('auth.logout') }}">
                        @csrf 
                        <input type="submit" value="logout"/>
                    </form>
                @endauth
            </ul>
        </nav>
        <h5>
            {{ auth()->user()->email ?? 'anónimo'}}
        </h5>
    </header>
    @if (session('success'))
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    @endif
    <main>
        @yield('main')
    </main>
</body>
</html>
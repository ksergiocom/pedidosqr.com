@extends('layout')

@section('main')

    <div class="p-5 mt-10 relative w-full rounded-2xl overflow-hidden h-fit bg-black">
        <h1 class="relative text-6xl text-balance font-semibold tracking-wide text-white absolute z-10">Gestiona tus pedidos
            en tiempo real</h1>
        <img class="w-full rounded-2xl absolute inset-0 opacity-30" src="{{ asset('/imgs/hero1.webp') }}" alt="Hero">
    </div>

    <a class="block bg-black text-white p-3 px-4 rounded-2xl text-center mx-auto mt-10" href="/gestion">Empieza ahora &rsaquo;</a>
    <a class="block border p-2 px-4 rounded-2xl text-center mx-auto mt-5" href="#contacto">Contactar &rsaquo;</a>

    <p class="mt-14">Puedes administrar tus pedidos en tiempo real, desde tu smartphone, tablet u ordenador.
    </p>
    <p class="mt-2">Genera códigos QR para cada uno de tus puntos de venta y tener un control de donde
        provienen los pedidos.</p>


    <div class="mt-15 relative rounded-2xl overflow-hidden bg-black p-5 pb-10">
        <h2 class="text-5xl relative font-semibold z-10 text-white mb-5">¿Como funciona?</h2>
        <ol class="list-decimal mt-2 list-inside space-y-3 relative z-10 text-white">
            <li>Crea tus puntos de venta con QR personalizados</li>
            <li>Agrega tus artículos, imagen y descripción</li>
            <li>Accede a tus pedidos en tiempo real</li>
        </ol>
        <img class="absolute inset-0 h-full w-full object-cover opacity-30" src="{{ asset('/imgs/hero2.webp') }}"
            alt="Hero">
    </div>

    <h2 class="mt-15 text-4xl">Acerca de <span class="tracking-wider font-extrabold">pedidosqr.com</span>
    </h2>

    <p class="mt-5">Es una herramienta para ayudarte a gestionar los pedidos de tu negocio en tiempo real.</p>
    <p class="mt-5">Puedes consultar los terminos y condiciones del servicio <a href="/terminos" class="underline">aquí</a>.</p>

    <div class="mt-16 max-w-lg mx-auto bg-white" id="contacto">
        <h2 class="text-2xl font-bold mb-4">Contacto</h2>
        @if(session('success'))
            <div class="mb-4 p-3 bg-green-100 text-green-800 rounded">
                {{ session('success') }}
            </div>
        @endif
        @if($errors->has('error'))
            <div class="mb-4 p-3 bg-red-100 text-red-800 rounded">
                {{ $errors->first('error') }}
            </div>
        @endif
        <form method="POST" action="{{ route('contacto.enviar') }}" class="space-y-5">
            @csrf
            <div>
                <label for="email" class="block font-medium mb-1">Correo electrónico <span class="text-red-500">*</span></label>
                <input type="email" id="email" name="email" placeholder="ejemplo@correo.com" required class="w-full border rounded p-2" value="{{ old('email') }}">
                @error('email')
                    <div class="text-red-500 text-sm mt-1">{{ $message }}</div>
                @enderror
            </div>
            <div>
                <label for="nombre" class="block font-medium mb-1">Nombre</label>
                <input type="text" id="nombre" name="nombre" class="w-full border rounded p-2" placeholder="(Opcional)" value="{{ old('nombre') }}">
                @error('nombre')
                    <div class="text-red-500 text-sm mt-1">{{ $message }}</div>
                @enderror
            </div>
            <div>
                <label for="telefono" class="block font-medium mb-1">Teléfono</label>
                <input type="text" id="telefono" name="telefono" class="w-full border rounded p-2" placeholder="(Opcional)" value="{{ old('telefono') }}">
                @error('telefono')
                    <div class="text-red-500 text-sm mt-1">{{ $message }}</div>
                @enderror
            </div>
            <div>
                <label for="descripcion" class="block font-medium mb-1">Descripción <span class="text-red-500">*</span></label>
                <textarea id="descripcion" name="descripcion" required rows="4" class="w-full border rounded p-2">{{ old('descripcion') }}</textarea>
                @error('descripcion')
                    <div class="text-red-500 text-sm mt-1">{{ $message }}</div>
                @enderror
            </div>
            <button type="submit" class="mt-3 w-full bg-black text-white py-2 rounded-2xl font-semibold hover:bg-gray-900 transition">Enviar mensaje</button>
        </form>
    </div>

    <div class="mt-10"></div>
    <footer class="w-full text-center mt-10 bg-white flex flex-col items-center gap-2">
        <span>Contactar: <a href="mailto:info@pedidosqr.com" class="underline">info@pedidosqr.com</a></span>
        <p class="text-sm opacity-50">Hecho por:  <a href="https://www.ksergio.com" class="underline">www.ksergio.com</a></p>
    </footer>

    @if(session('scroll_to_contact') || $errors->any())
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const contactoSection = document.getElementById('contacto');
            if (contactoSection) {
                contactoSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    </script>
    @endif

@endsection
@extends('layout')

@section('main')
    <h1>Gestión mesas</h1>
    <h3>Listado de mesas disponibles</h3>
    <ul class="grid-mesas">
        @foreach ($mesas as $mesa)
            <li class="grid-item">
            {{ $mesa->nombre }}

            <form action="{{ route('gestion.mesas.eliminar', $mesa) }}" method="POST" style="display:inline">
                @csrf
                @method('DELETE')
                <button type="submit" onclick="return confirm('¿Estás seguro que quieres eliminar esta mesa?')">
                    Eliminar
                </button>
            </form>
            <button
                    class="btn-generate-qr"
                    data-content="{{ $mesa->id }}"
                    style="margin-left: 0.5em;"
                >
                    Ver QR
                </button>
        </li>
        @endforeach
    </ul>
    <hr>
    <h3>Agregar nueva mesa</h3>
    <form action="{{ route('gestion.mesas.crear') }}" method="POST">
        @csrf
        <input type="text" name="nombre" value="{{ old('nombre') }}">
        @error('nombre')
            <div class="text-danger">{{ $message }}</div>
        @enderror
        <input type="submit" value="Crear">
    </form>

@endsection

@push('scripts')
    @vite('resources/js/qr.js')
@endpush